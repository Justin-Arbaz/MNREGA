import { RequestHandler } from "express";

// In-memory cache with TTL
interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Mock MGNREGA data - in production, this would come from data.gov.in API
function generateMockMGNREGAData(state: string, district: string) {
  const seed = (state + district).charCodeAt(0);
  const baseWorkers = 50000 + (seed * 1000) % 100000;

  return {
    state,
    district,
    lastUpdated: new Date().toISOString(),
    thisMonth: {
      workersEmployed: Math.floor(baseWorkers * (0.8 + Math.random() * 0.4)),
      householdsEmployed: Math.floor(baseWorkers * 0.6 * (0.8 + Math.random() * 0.4)),
      totalWagesPaid: Math.floor(baseWorkers * (0.8 + Math.random() * 0.4) * 500),
      personDaysGenerated: Math.floor(baseWorkers * (0.8 + Math.random() * 0.4) * 25),
    },
    lastMonth: {
      workersEmployed: Math.floor(baseWorkers * (0.7 + Math.random() * 0.3)),
      householdsEmployed: Math.floor(baseWorkers * 0.6 * (0.7 + Math.random() * 0.3)),
      totalWagesPaid: Math.floor(baseWorkers * (0.7 + Math.random() * 0.3) * 500),
      personDaysGenerated: Math.floor(baseWorkers * (0.7 + Math.random() * 0.3) * 25),
    },
    ytdMetrics: {
      totalWorkers: Math.floor(baseWorkers * 6),
      totalWagesPaid: Math.floor(baseWorkers * 6 * 500),
      totalPersonDays: Math.floor(baseWorkers * 6 * 25),
    },
  };
}

// Fetch data from external API with fallback to cache
async function fetchDistrictData(state: string, district: string) {
  const cacheKey = `${state}:${district}`;
  const cachedEntry = cache.get(cacheKey);

  // Return cached data if still valid
  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
    return {
      data: cachedEntry.data,
      source: "cache",
      age: Date.now() - cachedEntry.timestamp,
    };
  }

  try {
    // In production, fetch from data.gov.in API here
    // const response = await fetch(`https://api.data.gov.in/resource/...?state=${state}&district=${district}`);
    // const data = await response.json();
    
    // For now, use mock data
    const data = generateMockMGNREGAData(state, district);

    // Cache the data
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return {
      data,
      source: "fresh",
      age: 0,
    };
  } catch (error) {
    // If API fails, try to return stale cache
    if (cachedEntry) {
      return {
        data: cachedEntry.data,
        source: "stale-cache",
        age: Date.now() - cachedEntry.timestamp,
        error: "API unavailable, returning cached data",
      };
    }

    // If no cache available, return error
    throw new Error("Failed to fetch MGNREGA data and no cache available");
  }
}

export const handleMGNREGAData: RequestHandler = async (req, res) => {
  const { state, district } = req.query;

  if (!state || !district || typeof state !== "string" || typeof district !== "string") {
    return res.status(400).json({
      error: "Missing required parameters: state and district",
    });
  }

  try {
    const result = await fetchDistrictData(state, district);
    
    res.json({
      success: true,
      ...result,
      cacheStatus: {
        size: cache.size,
        ttl: CACHE_TTL / (60 * 60 * 1000), // TTL in hours
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Health check endpoint
export const handleCacheHealth: RequestHandler = (_req, res) => {
  res.json({
    status: "healthy",
    cacheSize: cache.size,
    cacheTTL: CACHE_TTL / (60 * 60 * 1000),
    timestamp: new Date().toISOString(),
  });
};

// Clear cache endpoint (admin only in production)
export const handleClearCache: RequestHandler = (_req, res) => {
  const size = cache.size;
  cache.clear();
  res.json({
    success: true,
    message: `Cleared ${size} cache entries`,
  });
};
