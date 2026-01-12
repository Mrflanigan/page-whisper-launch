export type SiteTheme = 'modern' | 'classic' | 'bold' | 'minimal' | 'warm';

export const themes: Record<SiteTheme, {
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
  };
}> = {
  modern: {
    name: 'Modern',
    description: 'Clean and professional with blue accents',
    colors: {
      primary: '221 83% 53%',
      accent: '221 83% 53%',
      background: '0 0% 100%',
      foreground: '222 47% 11%',
      card: '210 40% 96%',
    },
  },
  classic: {
    name: 'Classic',
    description: 'Timeless elegance with deep navy',
    colors: {
      primary: '222 47% 20%',
      accent: '38 92% 50%',
      background: '60 9% 98%',
      foreground: '222 47% 11%',
      card: '60 5% 94%',
    },
  },
  bold: {
    name: 'Bold',
    description: 'High contrast with vibrant red',
    colors: {
      primary: '0 84% 60%',
      accent: '0 84% 60%',
      background: '0 0% 7%',
      foreground: '0 0% 98%',
      card: '0 0% 12%',
    },
  },
  minimal: {
    name: 'Minimal',
    description: 'Subtle and understated grayscale',
    colors: {
      primary: '0 0% 20%',
      accent: '0 0% 40%',
      background: '0 0% 100%',
      foreground: '0 0% 10%',
      card: '0 0% 97%',
    },
  },
  warm: {
    name: 'Warm',
    description: 'Inviting earth tones with terracotta',
    colors: {
      primary: '16 70% 50%',
      accent: '16 70% 50%',
      background: '40 30% 97%',
      foreground: '16 30% 20%',
      card: '40 20% 93%',
    },
  },
};
