import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { MapPin, Search, Loader2 } from "lucide-react";

// Sample data for states and their districts (focused on large states for MVP)
const STATES_AND_DISTRICTS: Record<string, string[]> = {
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmannabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Bansgaon",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandausi",
    "Chhatarpur",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Guna",
    "Gurua",
    "Gwalior",
    "Hardoi",
    "Haridwar",
    "Hathras",
    "Hoshangabad",
    "Hoshiarpur",
    "Indore",
    "Jabalpurur",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Jharkhand",
    "Kannauj",
    "Kanpur",
    "Kasganj",
    "Kaushambi",
    "Keshwaram",
    "Kheri",
    "Khora",
    "Kora",
    "Kushinagar",
    "Lalitpur",
    "Loni",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Majauli",
    "Majhgawan",
    "Mandla",
    "Mandi",
    "Mandsaur",
    "Manned",
    "Markapur",
    "Mathura",
    "Mau",
    "Meherpur",
    "Metri",
    "Mirzapur",
    "Morigaon",
    "Morigaon",
    "Morena",
    "Morigaon",
    "Motihari",
    "Muzaffarnagar",
    "Muzaffarpur",
    "Nagpur",
    "Naimisharanya",
    "Nalanda",
    "Namkhana",
    "Nand",
    "Nandra",
    "Nankana",
    "Nanpur",
    "Narauli",
    "Nargund",
    "Narnaul",
    "Narsinghpur",
    "Narwar",
    "Nasik",
    "Naugarh",
    "Naugachia",
    "Neemuch",
    "Nellore",
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Bareilly",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Chhapra",
    "Darbhanga",
    "Dhanbad",
    "Dhauwad",
    "Dumka",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Gumla",
    "Giridih",
    "Jamui",
    "Jamshedpur",
    "Jehanabad",
    "Jhalokati",
    "Jharia",
    "Jharkhand",
    "Jind",
    "Jobat",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Koderma",
    "Koshikhola",
    "Kota",
    "Kumarganj",
    "Kurua",
    "Lakhisarai",
    "Lalganj",
    "Lalpur",
    "Lamu",
    "Landi",
    "Landour",
    "Larpur",
    "Larsul",
    "Lasurpur",
    "Lathur",
    "Lauriya",
    "Laxmipur",
    "Laxminagar",
    "Lakshmipala",
    "Lakshmisagar",
    "Lel",
    "Leshkuri",
    "Lingari",
    "Lingarh",
    "Lira",
    "Lohardaga",
    "Loharpir",
    "Loma",
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Basni",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bhind",
    "Bhinmal",
    "Bikaner",
    "Biraj",
    "Bisalpur",
    "Biser",
    "Bisleri",
    "Bither",
    "Bl",
    "Blod",
    "Boh",
    "Bokaro",
    "Bolpur",
    "Bomhali",
    "Bona",
    "Bonapur",
    "Bonai",
    "Bonakpur",
    "Bonamalai",
    "Bonamondi",
    "Bonanangpur",
    "Bonanaupol",
    "Bonaplast",
    "Bonaspur",
    "Bonasthali",
    "Bonatpur",
    "Bonatuli",
    "Bonaval",
    "Bonavalli",
    "Bonavas",
    "Bonavlou",
    "Bonawalli",
    "Bonawar",
    "Bonaware",
    "Bonawaripet",
  ],
};

export default function District() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [searchState, setSearchState] = useState<string>("");
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState(false);

  const states = Object.keys(STATES_AND_DISTRICTS).sort();
  const districts = selectedState
    ? STATES_AND_DISTRICTS[selectedState].sort()
    : [];

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(searchState.toLowerCase())
  );

  const filteredDistricts = districts.filter((district) =>
    district.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  useEffect(() => {
    // Auto-detect location bonus feature
    const detectLocation = async () => {
      if (!("geolocation" in navigator)) {
        return;
      }

      setIsDetecting(true);
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // In a real app, you would use reverse geocoding to get the district
            // For now, we'll just show a message
            console.log(
              "Location detected:",
              position.coords.latitude,
              position.coords.longitude
            );
            setIsDetecting(false);
          },
          () => {
            setIsDetecting(false);
          }
        );
      } catch {
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, []);

  const handleSelectDistrict = () => {
    if (selectedState && selectedDistrict) {
      navigate(`/dashboard/${selectedState}/${selectedDistrict}`);
    }
  };

  return (
    <Layout showBackButton>
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Select Your District
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your state and district to see MGNREGA performance data for
              your area.
            </p>
          </div>

          {/* Geolocation Bonus */}
          {isDetecting && (
            <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <p className="text-sm text-foreground">
                Detecting your location...
              </p>
            </div>
          )}

          {/* Main Selection Cards */}
          <div className="space-y-8">
            {/* State Selection */}
            <div className="card-base">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Step 1: Select State
                </h2>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search state..."
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {filteredStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      setSelectedDistrict("");
                      setSearchDistrict("");
                    }}
                    className={`p-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      selectedState === state
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* District Selection */}
            {selectedState && (
              <div className="card-base animate-slide-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Step 2: Select District
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing districts in {selectedState}
                </p>

                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search district..."
                      value={searchDistrict}
                      onChange={(e) => setSearchDistrict(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                  {filteredDistricts.map((district) => (
                    <button
                      key={district}
                      onClick={() => setSelectedDistrict(district)}
                      className={`p-3 rounded-lg font-medium transition-all text-left ${
                        selectedDistrict === district
                          ? "bg-secondary text-secondary-foreground ring-2 ring-secondary/50"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            {selectedState && selectedDistrict && (
              <button
                onClick={handleSelectDistrict}
                className="btn-primary w-full py-4 text-lg font-semibold animate-slide-up"
              >
                View {selectedDistrict}, {selectedState} Data
              </button>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-12 p-6 bg-accent/10 rounded-xl border border-accent/20">
            <h3 className="font-semibold text-foreground mb-2">
              💡 Tip: What to look for
            </h3>
            <p className="text-sm text-muted-foreground">
              Once you select your district, you'll see how many people got work
              in MGNREGA, how much they were paid, and how this compares to
              previous months and other districts. This data helps you
              understand if the program is working well in your area.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
