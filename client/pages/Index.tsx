import { useNavigate } from "react-router-dom";
import {
  MapPin,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
  Zap,
  BarChart3,
  Target,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-bold text-lg text-foreground">MGNREGA</div>
          </div>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate("/district")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              District Data
            </button>
            <button
              onClick={() => navigate("/district")}
              className="btn-primary text-sm"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Government of India Initiative
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Know Your District's Progress
              </h1>

              <p className="text-lg text-muted-foreground">
                MGNREGA - The Mahatma Gandhi National Rural Employment Guarantee
                Act - gives you the right to work. See how your district is
                performing and what it means for your village.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">
                    Select your district and see real data
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">
                    Understand trends and progress over time
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">
                    Simple charts designed for everyone
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/district")}
                className="btn-primary inline-flex items-center gap-2 group mt-8"
              >
                Select Your District
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-3xl p-8 space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10 text-primary" />
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded-full w-3/4 mx-auto" />
                    <div className="h-3 bg-muted rounded-full w-5/6 mx-auto" />
                    <div className="h-3 bg-muted rounded-full w-2/3 mx-auto" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/5 rounded-xl p-4">
                      <div className="text-2xl font-bold text-primary">
                        12.15 Cr
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Workers in 2025
                      </div>
                    </div>
                    <div className="bg-secondary/5 rounded-xl p-4">
                      <div className="text-2xl font-bold text-secondary">
                        32 States
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Across India
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is MGNREGA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What is MGNREGA?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A government program that guarantees work and income for rural
              families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-base hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                100 Days Work
              </h3>
              <p className="text-muted-foreground">
                Every rural family is guaranteed at least 100 days of paid work
                per financial year under this scheme.
              </p>
            </div>

            <div className="card-base hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Minimum Wages
              </h3>
              <p className="text-muted-foreground">
                Workers are paid the statutory minimum wage set by the
                government, ensuring fair compensation for their labor.
              </p>
            </div>

            <div className="card-base hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Rural Development
              </h3>
              <p className="text-muted-foreground">
                Work on community projects like roads, water systems, and
                agriculture infrastructure that benefit everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Check Your District Data Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Check Your District?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding your district's performance helps you know your
              rights and hold leaders accountable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Know How Many People Got Work
                  </h3>
                  <p className="text-muted-foreground">
                    See how many households and workers in your district
                    participated in MGNREGA this month and this year.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Track Progress Over Time
                  </h3>
                  <p className="text-muted-foreground">
                    Compare this month with last month and last year. See if
                    the program is growing or declining.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Compare with Other Districts
                  </h3>
                  <p className="text-muted-foreground">
                    See how your district is doing compared to neighbors. Is it
                    better or worse?
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Understand What the Numbers Mean
                  </h3>
                  <p className="text-muted-foreground">
                    We explain each number in simple language. No need to
                    understand government reports.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ask Questions and Demand Answers
                  </h3>
                  <p className="text-muted-foreground">
                    When you know the facts, you can ask your local government
                    why they need to do better.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Access Without Internet Always
                  </h3>
                  <p className="text-muted-foreground">
                    We save data so you can view your district's information
                    even when internet is slow or unavailable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Know Your District?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Select your state and district to see the latest MGNREGA data and
            understand how the program is serving your community.
          </p>
          <button
            onClick={() => navigate("/district")}
            className="btn-primary inline-flex items-center gap-2 group text-lg py-4 px-8"
          >
            Start Exploring
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="font-bold text-foreground">MGNREGA</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Understanding government welfare programs for rural India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button className="hover:text-primary transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/district")}
                    className="hover:text-primary transition-colors"
                  >
                    District Data
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Official Data Source
                  </a>
                </li>
                <li>
                  <a
                    href="https://nrega.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    NREGA Official
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Data</h4>
              <p className="text-sm text-muted-foreground">
                Data sourced from Government of India's Open Data Portal.
                Updated regularly.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2025 MGNREGA District Dashboard. Built to empower Indian
              citizens with government data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
