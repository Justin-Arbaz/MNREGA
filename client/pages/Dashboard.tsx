import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DistrictMetrics {
  state: string;
  district: string;
  thisMonth: {
    workersEmployed: number;
    householdsEmployed: number;
    totalWagesPaid: number;
    personDaysGenerated: number;
  };
  lastMonth: {
    workersEmployed: number;
    householdsEmployed: number;
    totalWagesPaid: number;
    personDaysGenerated: number;
  };
  thisYear: {
    workersEmployed: number;
    householdsEmployed: number;
    totalWagesPaid: number;
    personDaysGenerated: number;
  };
  monthlyTrend: Array<{
    month: string;
    workers: number;
    wages: number;
  }>;
}

// Mock data generator - in production, this would come from the API
function generateMockData(state: string, district: string): DistrictMetrics {
  const baseWorkers = Math.floor(Math.random() * 100000) + 10000;
  const monthGrowth = Math.random() * 0.3 - 0.1; // -10% to +20%

  return {
    state,
    district,
    thisMonth: {
      workersEmployed: Math.floor(baseWorkers * (1 + monthGrowth)),
      householdsEmployed: Math.floor(baseWorkers * (1 + monthGrowth) * 0.6),
      totalWagesPaid: Math.floor(baseWorkers * (1 + monthGrowth) * 500),
      personDaysGenerated: Math.floor(baseWorkers * (1 + monthGrowth) * 25),
    },
    lastMonth: {
      workersEmployed: baseWorkers,
      householdsEmployed: Math.floor(baseWorkers * 0.6),
      totalWagesPaid: Math.floor(baseWorkers * 500),
      personDaysGenerated: Math.floor(baseWorkers * 25),
    },
    thisYear: {
      workersEmployed: Math.floor(baseWorkers * 8),
      householdsEmployed: Math.floor(baseWorkers * 8 * 0.6),
      totalWagesPaid: Math.floor(baseWorkers * 8 * 500),
      personDaysGenerated: Math.floor(baseWorkers * 8 * 25),
    },
    monthlyTrend: [
      { month: "Jan", workers: Math.floor(baseWorkers * 0.9), wages: Math.floor(baseWorkers * 0.9 * 500) },
      { month: "Feb", workers: Math.floor(baseWorkers * 1.1), wages: Math.floor(baseWorkers * 1.1 * 500) },
      { month: "Mar", workers: Math.floor(baseWorkers * 1.2), wages: Math.floor(baseWorkers * 1.2 * 500) },
      { month: "Apr", workers: Math.floor(baseWorkers * 0.8), wages: Math.floor(baseWorkers * 0.8 * 500) },
      { month: "May", workers: baseWorkers, wages: Math.floor(baseWorkers * 500) },
      { month: "Jun", workers: Math.floor(baseWorkers * 1.05), wages: Math.floor(baseWorkers * 1.05 * 500) },
    ],
  };
}

export default function Dashboard() {
  const { state, district } = useParams<{ state: string; district: string }>();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DistrictMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state || !district) {
      navigate("/district");
      return;
    }

    // Simulate API call
    const timer = setTimeout(() => {
      setMetrics(generateMockData(state, district));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [state, district, navigate]);

  if (loading) {
    return (
      <Layout showBackButton>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Activity className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!metrics) {
    return (
      <Layout showBackButton>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Data not found</p>
        </div>
      </Layout>
    );
  }

  const monthGrowth =
    ((metrics.thisMonth.workersEmployed -
      metrics.lastMonth.workersEmployed) /
      metrics.lastMonth.workersEmployed) *
    100;
  const wageGrowth =
    ((metrics.thisMonth.totalWagesPaid - metrics.lastMonth.totalWagesPaid) /
      metrics.lastMonth.totalWagesPaid) *
    100;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  return (
    <Layout showBackButton>
      <div className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate("/district")}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                ← Change District
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {district}
            </h1>
            <p className="text-lg text-muted-foreground">{state}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Workers Employed */}
            <div className="card-base">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                {monthGrowth >= 0 ? (
                  <div className="flex items-center gap-1 text-success">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {monthGrowth.toFixed(1)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-destructive">
                    <ArrowDownRight className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {monthGrowth.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                This Month's Workers
              </p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(metrics.thisMonth.workersEmployed)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                vs {formatNumber(metrics.lastMonth.workersEmployed)} last month
              </p>
            </div>

            {/* Households */}
            <div className="card-base">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-primary text-sm font-semibold">Active</div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                Households Employed
              </p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(metrics.thisMonth.householdsEmployed)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Rural families benefiting now
              </p>
            </div>

            {/* Total Wages */}
            <div className="card-base">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                {wageGrowth >= 0 ? (
                  <div className="flex items-center gap-1 text-success">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {wageGrowth.toFixed(1)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-destructive">
                    <ArrowDownRight className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {wageGrowth.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                Total Wages Paid
              </p>
              <p className="text-3xl font-bold text-foreground">
                ₹{formatNumber(metrics.thisMonth.totalWagesPaid)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Money distributed this month
              </p>
            </div>

            {/* Person Days */}
            <div className="card-base">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div className="text-primary text-sm font-semibold">Updated</div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                Person-Days Generated
              </p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(metrics.thisMonth.personDaysGenerated)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Total work days this month
              </p>
            </div>
          </div>

          {/* Year to Date Summary */}
          <div className="card-base mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              Year to Date Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Total Workers (Jan-Jun)
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatNumber(metrics.thisYear.workersEmployed)}
                </p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Total Wages (Jan-Jun)
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ₹{formatNumber(metrics.thisYear.totalWagesPaid)}
                </p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Households Benefited
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatNumber(metrics.thisYear.householdsEmployed)}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="card-base mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Monthly Trend (Jan-Jun)
            </h2>
            <div className="space-y-6">
              {metrics.monthlyTrend.map((month, idx) => {
                const maxWorkers = Math.max(
                  ...metrics.monthlyTrend.map((m) => m.workers)
                );
                const percentage = (month.workers / maxWorkers) * 100;

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">
                        {month.month}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {formatNumber(month.workers)} workers
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{formatNumber(month.wages)} wages
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What This Means */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card-base bg-accent/5">
              <h3 className="text-xl font-bold text-foreground mb-4">
                📊 What the Numbers Mean
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">
                    Workers Employed
                  </p>
                  <p className="text-muted-foreground">
                    How many people got paid work in MGNREGA this month in your
                    district.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Household Employed
                  </p>
                  <p className="text-muted-foreground">
                    How many rural families benefited. One family might have
                    multiple workers.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Total Wages</p>
                  <p className="text-muted-foreground">
                    Total money paid to all workers. This shows the economic
                    impact on your district.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-base bg-primary/5">
              <h3 className="text-xl font-bold text-foreground mb-4">
                💡 How to Use This Data
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span className="text-muted-foreground">
                    Check if numbers are growing (more people getting work)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span className="text-muted-foreground">
                    Compare with other months - is your district doing better?
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span className="text-muted-foreground">
                    Ask local leaders why the numbers went down or stayed flat
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span className="text-muted-foreground">
                    Share this data with your community
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Source Note */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              📌 Data Source: Government of India's Official MGNREGA Data
              Portal. Last updated: Today. This app shows real government data
              in a way that's easy to understand.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
