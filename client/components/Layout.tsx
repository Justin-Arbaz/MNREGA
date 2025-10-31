import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

export function Layout({ children, showBackButton = false }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="font-bold text-lg text-foreground">MGNREGA</div>
            </button>
          </div>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => navigate("/district")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <span className="hidden sm:inline">District Data</span>
              <span className="sm:hidden">Data</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-primary transition-colors"
                  >
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
              <h4 className="font-semibold text-foreground mb-3">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Official Data
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
              <h4 className="font-semibold text-foreground mb-3">Learn More</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Mahatma_Gandhi_National_Rural_Employment_Guarantee_Act"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    About MGNREGA
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Data Info</h4>
              <p className="text-xs text-muted-foreground">
                Real-time data from Government of India's Open Data Portal.
                Updated regularly for accuracy.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>
              © 2025 MGNREGA District Dashboard. Empowering Indian citizens
              with government data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
