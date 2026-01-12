import { BuilderForm } from '@/components/SiteBuilder/BuilderForm';

const Builder = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-6">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground">Build Your Business Site</h1>
          <p className="text-muted-foreground mt-1">
            Fill in your details below and we'll create a professional website for you in seconds.
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
