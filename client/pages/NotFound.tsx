import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved or removed.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="btn-primary w-full"
            >
              Go to Home
            </button>
            <button
              onClick={() => navigate("/district")}
              className="btn-secondary w-full"
            >
              View District Data
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
