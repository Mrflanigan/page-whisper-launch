import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Phone, Clock, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { themes, SiteTheme } from '@/lib/themes';

const Site = () => {
  const { id } = useParams<{ id: string }>();

  const { data: site, isLoading, error } = useQuery({
    queryKey: ['site', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_sites')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Site Not Found</h1>
          <p className="text-muted-foreground">This site doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const theme = themes[site.theme as SiteTheme] || themes.modern;

  return (
    <div
      className="min-h-screen"
      style={{
        '--theme-primary': theme.colors.primary,
        '--theme-accent': theme.colors.accent,
        '--theme-background': theme.colors.background,
        '--theme-foreground': theme.colors.foreground,
        '--theme-card': theme.colors.card,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col"
        style={{ backgroundColor: `hsl(${theme.colors.background})` }}
      >
        {/* Background Image */}
        {site.hero_image_url ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${site.hero_image_url})` }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `hsl(${theme.colors.foreground} / 0.6)` }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `hsl(${theme.colors.foreground} / 0.3)` }}
            />
          </div>
        )}

        {/* Logo & Name */}
        <div className="relative z-10 px-6 md:px-12 pt-8 md:pt-12 flex items-center gap-4">
          {site.logo_url && (
            <img
              src={site.logo_url}
              alt={`${site.business_name} logo`}
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg bg-white/10 backdrop-blur-sm p-2"
            />
          )}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{ color: `hsl(${theme.colors.background})` }}
          >
            {site.business_name}
          </h1>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          {site.tagline && (
            <p
              className="text-xl md:text-2xl mb-6 font-light"
              style={{ color: `hsl(${theme.colors.background} / 0.9)` }}
            >
              {site.tagline}
            </p>
          )}
          {site.description && (
            <p
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
              style={{ color: `hsl(${theme.colors.background} / 0.8)` }}
            >
              {site.description}
            </p>
          )}

          {/* CTA Button */}
          {site.phone && (
            <>
              <a href={`tel:${site.phone}`} className="inline-block">
                <Button
                  size="lg"
                  className="text-xl md:text-2xl px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: `hsl(${theme.colors.accent})`,
                    color: `hsl(${theme.colors.background})`,
                  }}
                >
                  <Phone className="w-6 h-6 mr-3" />
                  {site.phone}
                </Button>
              </a>
              <p
                className="mt-4 text-sm"
                style={{ color: `hsl(${theme.colors.background} / 0.7)` }}
              >
                Tap to call now!
              </p>
            </>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center animate-bounce"
            style={{ borderColor: `hsl(${theme.colors.background} / 0.5)` }}
          >
            <div
              className="w-1.5 h-3 rounded-full mt-2"
              style={{ backgroundColor: `hsl(${theme.colors.background} / 0.5)` }}
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: `hsl(${theme.colors.background})` }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-lg p-8 md:p-12 text-center"
            style={{ backgroundColor: `hsl(${theme.colors.card})` }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: `hsl(${theme.colors.foreground})` }}
            >
              Get in Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto text-left">
              {site.hours_text && (
                <div className="flex items-start gap-4">
                  <Clock
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={{ color: `hsl(${theme.colors.accent})` }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: `hsl(${theme.colors.foreground})` }}
                    >
                      Hours
                    </p>
                    <p style={{ color: `hsl(${theme.colors.foreground} / 0.7)` }}>
                      {site.hours_text}
                    </p>
                  </div>
                </div>
              )}

              {site.service_area && (
                <div className="flex items-start gap-4">
                  <MapPin
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={{ color: `hsl(${theme.colors.accent})` }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: `hsl(${theme.colors.foreground})` }}
                    >
                      Service Area
                    </p>
                    <p style={{ color: `hsl(${theme.colors.foreground} / 0.7)` }}>
                      {site.service_area}
                    </p>
                  </div>
                </div>
              )}

              {site.email && (
                <div className="flex items-start gap-4">
                  <Mail
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={{ color: `hsl(${theme.colors.accent})` }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: `hsl(${theme.colors.foreground})` }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:underline"
                      style={{ color: `hsl(${theme.colors.foreground} / 0.7)` }}
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Large Phone CTA */}
            {site.phone && (
              <>
                <a href={`tel:${site.phone}`} className="inline-block">
                  <Button
                    size="lg"
                    className="text-2xl md:text-3xl px-10 py-8 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: `hsl(${theme.colors.primary})`,
                      color: `hsl(${theme.colors.background})`,
                    }}
                  >
                    <Phone className="w-8 h-8 mr-4" />
                    {site.phone}
                  </Button>
                </a>
                <p
                  className="mt-4"
                  style={{ color: `hsl(${theme.colors.foreground} / 0.6)` }}
                >
                  Call us today!
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4"
        style={{ backgroundColor: `hsl(${theme.colors.foreground})` }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: `hsl(${theme.colors.background})` }}
          >
            {site.business_name}
          </p>
          <p
            className="text-xs mt-4"
            style={{ color: `hsl(${theme.colors.background} / 0.5)` }}
          >
            © {new Date().getFullYear()} {site.business_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Site;
