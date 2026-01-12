import { Link } from 'react-router-dom';
import { BuilderForm } from '@/components/SiteBuilder/BuilderForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Builder = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-6">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/create">
            <Button variant="ghost" size="lg" className="mb-4 text-base px-6 py-6 h-auto">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Build Your Business Site</h1>
          <p className="text-muted-foreground mt-1">
            Fill in your details below and we'll create a professional website for you.
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <BuilderForm />
      </main>
    </div>
  );
};

export default Builder;
