import { themes, SiteTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  value: SiteTheme;
  onChange: (theme: SiteTheme) => void;
}

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Choose Your Theme</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(themes) as SiteTheme[]).map((themeKey) => {
          const theme = themes[themeKey];
          const isSelected = value === themeKey;
          
          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => onChange(themeKey)}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                />
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                />
              </div>
              <p className="font-semibold text-foreground">{theme.name}</p>
              <p className="text-xs text-muted-foreground">{theme.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
