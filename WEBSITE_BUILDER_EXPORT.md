# 🚀 Website Builder - Complete Export Package

> Copy this entire system into a new Lovable project. Follow the steps in order.

---

## Step 1: Database Migration (Run First!)

Tell Lovable: **"Run this database migration"**

```sql
-- Create site_theme enum
CREATE TYPE public.site_theme AS ENUM ('modern', 'classic', 'bold', 'minimal', 'warm');

-- Create business_sites table
CREATE TABLE public.business_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  phone TEXT,
  email TEXT,
  hours_text TEXT,
  service_area TEXT,
  theme site_theme NOT NULL DEFAULT 'modern',
  logo_url TEXT,
  hero_image_url TEXT,
  owner_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upload_sessions table for QR code mobile uploads
CREATE TABLE public.upload_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL DEFAULT encode(extensions.gen_random_bytes(16), 'hex'),
  site_id UUID REFERENCES public.business_sites(id),
  upload_type TEXT NOT NULL DEFAULT 'video',
  uploaded_url TEXT,
  owner_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

-- Enable RLS
ALTER TABLE public.business_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upload_sessions ENABLE ROW LEVEL SECURITY;

-- Business Sites Policies
CREATE POLICY "Public can view business sites" ON public.business_sites
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create business sites" ON public.business_sites
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Owners can update their business sites" ON public.business_sites
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their business sites" ON public.business_sites
  FOR DELETE USING (auth.uid() = owner_id);

-- Upload Sessions Policies
CREATE POLICY "Anyone can create upload sessions" ON public.upload_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view sessions by token" ON public.upload_sessions
  FOR SELECT USING (
    (token = COALESCE(((current_setting('request.headers'::text, true))::json ->> 'x-upload-token'), '')) 
    AND (expires_at > now())
  );

CREATE POLICY "Users can update sessions by token" ON public.upload_sessions
  FOR UPDATE USING (
    (token = COALESCE(((current_setting('request.headers'::text, true))::json ->> 'x-upload-token'), '')) 
    AND (expires_at > now())
  );

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies
CREATE POLICY "Anyone can upload to site-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Anyone can view site-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-images');
```

---

## Step 2: Install Dependencies

Tell Lovable: **"Install these packages: browser-image-compression, qrcode.react, framer-motion"**

---

## Step 3: Create Files

### 📁 src/lib/themes.ts

```typescript
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
```

---

### 📁 src/components/SiteBuilder/ImageUpload.tsx

```typescript
import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  bucket?: string;
}

export const ImageUpload = ({ label, value, onChange, bucket = 'site-images' }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};
```

---

### 📁 src/components/SiteBuilder/MultiMediaUpload.tsx

```typescript
import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import imageCompression from 'browser-image-compression';

interface MultiMediaUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  maxFiles?: number;
  bucket?: string;
}

export const MultiMediaUpload = ({ 
  label, 
  values = [], 
  onChange, 
  accept = 'image/*',
  maxFiles = 10,
  bucket = 'site-images' 
}: MultiMediaUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>('');

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
    };

    try {
      setProgress('Compressing...');
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      return compressedFile;
    } catch (error) {
      console.error('Compression failed, using original:', error);
      return file;
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (values.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        setProgress(`Processing ${i + 1}/${files.length}...`);

        if (file.type.startsWith('image/')) {
          file = await compressImage(file);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        setProgress(`Uploading ${i + 1}/${files.length}...`);
        
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        newUrls.push(publicUrl);
      }

      onChange([...values, ...newUrls]);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {values.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
              <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => handleRemove(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {values.length < maxFiles && (
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center py-4">
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-primary animate-spin mb-1" />
                <p className="text-xs text-muted-foreground">{progress}</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-6 h-6 text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">
                  Add photos ({values.length}/{maxFiles})
                </p>
                <p className="text-xs text-muted-foreground">Auto-compressed</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};
```

---

### 📁 src/components/SiteBuilder/PhoneUploadModal.tsx

```typescript
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smartphone, Copy, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PhoneUploadModalProps {
  onUploadComplete: (url: string) => void;
}

export const PhoneUploadModal = ({ onUploadComplete }: PhoneUploadModalProps) => {
  const [open, setOpen] = useState(false);
  const [uploadLink, setUploadLink] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const generateUploadLink = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('upload_sessions')
        .insert([{ upload_type: 'video' }])
        .select()
        .single();

      if (error) throw error;

      const baseUrl = window.location.origin;
      const link = `${baseUrl}/upload/${data.token}`;
      setUploadLink(link);
      setToken(data.token);
    } catch (error) {
      console.error('Error creating upload session:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (uploadLink) {
      await navigator.clipboard.writeText(uploadLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const checkForUpload = async () => {
    if (!token) return;
    
    setChecking(true);
    try {
      const { data, error } = await supabase
        .from('upload_sessions')
        .select('uploaded_url')
        .eq('token', token)
        .single();

      if (error) throw error;

      if (data?.uploaded_url) {
        onUploadComplete(data.uploaded_url);
        setOpen(false);
        setUploadLink(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Error checking upload:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !uploadLink) {
      generateUploadLink();
    }
    if (!isOpen) {
      setUploadLink(null);
      setToken(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          <Smartphone className="w-4 h-4 mr-2" />
          Upload from Phone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload from Your Phone</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : uploadLink ? (
            <>
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <QRCodeSVG value={uploadLink} size={200} />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>1.</strong> Scan this QR code with your phone camera
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>2.</strong> Upload your video on the mobile page
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>3.</strong> Click "Check for Upload" below when done
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={uploadLink}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
                />
                <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <Button 
                type="button" 
                onClick={checkForUpload} 
                className="w-full"
                disabled={checking}
              >
                {checking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Check for Upload'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Link expires in 1 hour
              </p>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

### 📁 src/components/SiteBuilder/MultiVideoUpload.tsx

```typescript
import { useState } from 'react';
import { X, Video, Loader2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PhoneUploadModal } from './PhoneUploadModal';

interface MultiVideoUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  bucket?: string;
}

export const MultiVideoUpload = ({ 
  label, 
  values = [], 
  onChange, 
  maxFiles = 3,
  maxSizeMB = 25,
  bucket = 'site-images' 
}: MultiVideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (values.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} videos allowed`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`Video "${file.name}" is too large. Maximum ${maxSizeMB}MB per video.`);
          continue;
        }

        setProgress(`Uploading ${i + 1}/${files.length}...`);

        const fileExt = file.name.split('.').pop();
        const fileName = `videos/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        newUrls.push(publicUrl);
      }

      onChange([...values, ...newUrls]);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handlePhoneUpload = (url: string) => {
    if (values.length < maxFiles) {
      onChange([...values, url]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <p className="text-xs text-muted-foreground">
        Max {maxSizeMB}MB per video • {maxFiles} videos max
      </p>
      
      {values.length > 0 && (
        <div className="space-y-2">
          {values.map((url, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-border">
              <video 
                src={url} 
                controls 
                className="w-full max-h-32 bg-black"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => handleRemove(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {values.length < maxFiles && (
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col items-center justify-center py-2">
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 text-primary animate-spin mb-1" />
                  <p className="text-xs text-muted-foreground">{progress}</p>
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">From this device</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>

          <PhoneUploadModal onUploadComplete={handlePhoneUpload} />
        </div>
      )}
    </div>
  );
};
```

---

### 📁 src/components/SiteBuilder/ThemeSelector.tsx

```typescript
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
```

---

### 📁 src/components/SiteBuilder/BuilderForm.tsx

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUpload } from './ImageUpload';
import { MultiMediaUpload } from './MultiMediaUpload';
import { MultiVideoUpload } from './MultiVideoUpload';
import { ThemeSelector } from './ThemeSelector';
import { supabase } from '@/integrations/supabase/client';
import { SiteTheme } from '@/lib/themes';
import { Loader2 } from 'lucide-react';

interface FormData {
  business_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  hours_text: string;
  service_area: string;
  theme: SiteTheme;
  logo_url?: string;
  gallery_images: string[];
  videos: string[];
}

export const BuilderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    business_name: '',
    tagline: '',
    description: '',
    phone: '',
    email: '',
    hours_text: '',
    service_area: '',
    theme: 'modern',
    gallery_images: [],
    videos: [],
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToInsert = {
        business_name: formData.business_name,
        tagline: formData.tagline,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        hours_text: formData.hours_text,
        service_area: formData.service_area,
        theme: formData.theme,
        logo_url: formData.logo_url,
        hero_image_url: formData.gallery_images.length > 0 ? JSON.stringify(formData.gallery_images) : null,
      };

      const { data, error } = await supabase
        .from('business_sites')
        .insert([dataToInsert])
        .select()
        .single();

      if (error) throw error;

      navigate(`/site/${data.id}`);
    } catch (error) {
      console.error('Error creating site:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Business Information</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              value={formData.business_name}
              onChange={(e) => handleChange('business_name', e.target.value)}
              placeholder="Your Business Name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="555-123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="Your catchy tagline here"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Tell customers about your business..."
            rows={4}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hours_text">Business Hours</Label>
            <Input
              id="hours_text"
              value={formData.hours_text}
              onChange={(e) => handleChange('hours_text', e.target.value)}
              placeholder="Mon-Fri 9am-5pm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service_area">Service Area</Label>
            <Input
              id="service_area"
              value={formData.service_area}
              onChange={(e) => handleChange('service_area', e.target.value)}
              placeholder="Seattle Metro Area"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="contact@yourbusiness.com"
          />
        </div>
      </div>

      {/* Images & Video */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Photos & Videos</h2>
        <p className="text-sm text-muted-foreground">
          Images are automatically compressed for fast loading. Videos max 25MB each.
        </p>
        
        <ImageUpload
          label="Logo (optional)"
          value={formData.logo_url}
          onChange={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
        />

        <MultiMediaUpload
          label="Photo Gallery"
          values={formData.gallery_images}
          onChange={(urls) => setFormData(prev => ({ ...prev, gallery_images: urls }))}
          maxFiles={10}
        />

        <MultiVideoUpload
          label="Videos"
          values={formData.videos}
          onChange={(urls) => setFormData(prev => ({ ...prev, videos: urls }))}
          maxFiles={3}
          maxSizeMB={25}
        />
      </div>

      {/* Theme */}
      <ThemeSelector
        value={formData.theme}
        onChange={(theme) => handleChange('theme', theme)}
      />

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={loading || !formData.business_name}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Your Site...
          </>
        ) : (
          'Create My Site'
        )}
      </Button>
    </form>
  );
};
```

---

### 📁 src/pages/Builder.tsx

```typescript
import { Link } from 'react-router-dom';
import { BuilderForm } from '@/components/SiteBuilder/BuilderForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Builder = () => {
  return (
    <div className="min-h-screen bg-background">
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

      <main className="max-w-3xl mx-auto px-4 py-8">
        <BuilderForm />
      </main>
    </div>
  );
};

export default Builder;
```

---

### 📁 src/pages/CreateSite.tsx

```typescript
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const CreateSite = () => {
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7 + 10) % 100}%`,
      duration: 4 + (i % 4),
      delay: i * 0.25,
    })), 
  []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <motion.div 
          className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%]"
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=90"
            alt="Cityscape"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [-20, -100], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex justify-between items-center px-8 md:px-16 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back</span>
        </Link>
        <span className="text-white/30 text-sm tracking-[0.3em]">EST. 2024</span>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 px-8 md:px-16 pt-8 md:pt-12 pb-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-amber-400/80 text-sm md:text-base tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Digital Presence Awaits
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            <span className="block">Professional Website</span>
            <span className="block mt-2">
              in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                30 Minutes
              </span>
            </span>
          </h1>
          
          <motion.p 
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Powered By Lightning-Fast Intelligence
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/builder">
              <Button 
                size="lg" 
                className="text-lg md:text-xl px-12 py-8 h-auto rounded-full bg-white text-black hover:bg-amber-100 transition-all duration-500 tracking-wide shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-20">
            <p className="text-amber-400/60 text-sm tracking-[0.3em] uppercase mb-4">The Experience</p>
            <h2 className="font-display text-3xl md:text-5xl text-white">Three effortless moments to your new website</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Share Your Story", desc: "Simply tell us your business name and how to reach you. We handle everything else." },
              { step: "02", title: "Add Your Images", desc: "Upload your finest photos directly. We'll ensure they look absolutely stunning." },
              { step: "03", title: "From Any Device", desc: "Photos on your phone? Scan a simple code and they appear instantly. Pure magic." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-400/30 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <span className="text-amber-400/40 text-sm font-mono tracking-wider">{item.step}</span>
                <h3 className="font-display text-2xl text-white mt-4 mb-3 group-hover:text-amber-200 transition-colors">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-amber-400/5 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Phone Upload Feature */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-sm tracking-wide">Magic Feature</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
                  Photos on Your Phone?
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  We've crafted an effortless solution. Simply scan a code with your camera, 
                  select your images, and watch them appear on your new website. 
                  No cables. No confusion. Just seamless simplicity.
                </p>
              </div>
              
              <div className="w-40 h-40 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <div className="w-28 h-28 bg-white/80 rounded-xl flex items-center justify-center">
                  <span className="text-black/30 text-xs">QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-white">What's Included</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Professional website design",
              "Optimized for every device",
              "One-tap calling for customers",
              "Shareable link for anywhere",
              "Lightning-fast loading",
              "Completely complimentary",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white/80 text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-8 md:px-16 py-32">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 text-xl mb-8">
            Ready to elevate your presence?
          </p>
          
          <Link to="/builder">
            <Button 
              size="lg" 
              className="text-xl px-16 py-10 h-auto rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-black hover:from-amber-300 hover:via-amber-400 hover:to-amber-300 transition-all duration-500 tracking-wide shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 font-medium"
            >
              Begin Your Journey
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
          
          <p className="text-white/40 mt-8 text-base">
            A few minutes is all it takes
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 md:px-16 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-amber-400/30" />
            <span className="text-amber-400/60 text-xs tracking-[0.3em] uppercase">
              Crafted with Care
            </span>
            <div className="h-px w-8 bg-amber-400/30" />
          </div>
          <p className="text-white/40 text-sm">
            Questions? We're here to guide you every step of the way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateSite;
```

---

### 📁 src/pages/Site.tsx

```typescript
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

  // Parse gallery images if stored as JSON
  let galleryImages: string[] = [];
  if (site.hero_image_url) {
    try {
      galleryImages = JSON.parse(site.hero_image_url);
    } catch {
      galleryImages = [site.hero_image_url];
    }
  }

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
        {galleryImages.length > 0 ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${galleryImages[0]})` }}
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

      {/* Gallery Section (if multiple images) */}
      {galleryImages.length > 1 && (
        <section
          className="py-16 px-4"
          style={{ backgroundColor: `hsl(${theme.colors.background})` }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              style={{ color: `hsl(${theme.colors.foreground})` }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((url, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
```

---

### 📁 src/pages/MobileUpload.tsx

```typescript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Check, X, Loader2, Video, Image as ImageIcon } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const MobileUpload = () => {
  const { token } = useParams<{ token: string }>();
  const [session, setSession] = useState<{ id: string; upload_type: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  useEffect(() => {
    const fetchSession = async () => {
      if (!token) {
        setError('Invalid upload link');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('upload_sessions')
          .select('id, upload_type, expires_at, uploaded_url')
          .eq('token', token)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError('Upload link not found');
          setLoading(false);
          return;
        }

        if (new Date(data.expires_at) < new Date()) {
          setError('This upload link has expired');
          setLoading(false);
          return;
        }

        if (data.uploaded_url) {
          try {
            const existingUrls = JSON.parse(data.uploaded_url);
            if (Array.isArray(existingUrls)) {
              setUploadedUrls(existingUrls);
            }
          } catch {
            if (data.uploaded_url) {
              setUploadedUrls([data.uploaded_url]);
            }
          }
        }

        setSession({ id: data.id, upload_type: data.upload_type });
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load upload session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [token]);

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      setProgress('Compressing...');
      return await imageCompression(file, options);
    } catch {
      return file;
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !session) return;

    setUploading(true);
    setError(null);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        setProgress(`Processing ${i + 1}/${files.length}...`);

        if (file.type.startsWith('video/')) {
          if (file.size > 25 * 1024 * 1024) {
            setError(`Video "${file.name}" is too large. Max 25MB.`);
            continue;
          }
        } else if (file.type.startsWith('image/')) {
          file = await compressImage(file);
        }

        const fileExt = file.name.split('.').pop();
        const folder = file.type.startsWith('video/') ? 'videos' : 'images';
        const fileName = `${folder}/${session.id}-${Date.now()}-${i}.${fileExt}`;

        setProgress(`Uploading ${i + 1}/${files.length}...`);

        const { error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(fileName);

        newUrls.push(publicUrl);
      }

      const allUrls = [...uploadedUrls, ...newUrls];
      setUploadedUrls(allUrls);

      await supabase
        .from('upload_sessions')
        .update({ uploaded_url: JSON.stringify(allUrls) })
        .eq('id', session.id);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload. Please try again.');
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <X className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-xl font-semibold text-foreground mb-2">Upload Error</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (uploadedUrls.length > 0 && !uploading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <Check className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-xl font-semibold text-foreground mb-2">
          {uploadedUrls.length} file(s) uploaded!
        </h1>
        <p className="text-muted-foreground mb-6">
          You can close this page or add more files.
        </p>
        
        <div className="grid grid-cols-2 gap-2 max-w-sm mb-6">
          {uploadedUrls.slice(-4).map((url, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border">
              {url.includes('/videos/') ? (
                <video src={url} className="w-full h-full object-cover" />
              ) : (
                <img src={url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>

        <label className="w-full max-w-xs">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button variant="outline" className="w-full" asChild>
            <span>Add More Files</span>
          </Button>
        </label>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="text-center py-8">
        <div className="flex justify-center gap-2 mb-4">
          <ImageIcon className="w-10 h-10 text-primary" />
          <Video className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Upload Files</h1>
        <p className="text-muted-foreground">
          Select photos or videos from your phone
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Images auto-compressed • Videos max 25MB
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {error && (
          <p className="text-destructive text-sm mb-4 text-center">{error}</p>
        )}

        <label className="w-full max-w-sm">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-foreground font-medium">{progress}</p>
                <p className="text-sm text-muted-foreground">Please wait</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium">Tap to Select Files</p>
                <p className="text-sm text-muted-foreground mt-1">Photos & videos</p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default MobileUpload;
```

---

## Step 4: Update App.tsx Routes

Add these routes to your App.tsx:

```typescript
import CreateSite from "./pages/CreateSite";
import Builder from "./pages/Builder";
import Site from "./pages/Site";
import MobileUpload from "./pages/MobileUpload";

// In your Routes:
<Route path="/create" element={<CreateSite />} />
<Route path="/builder" element={<Builder />} />
<Route path="/site/:id" element={<Site />} />
<Route path="/upload/:token" element={<MobileUpload />} />
```

---

## Step 5: Test the Flow

1. Go to `/create` - Landing page
2. Click "Start Creating" → `/builder`
3. Fill out the form and submit
4. View generated site at `/site/{id}`
5. Test QR upload from phone

---

## Summary

**Pages:** 4 (CreateSite, Builder, Site, MobileUpload)
**Components:** 6 (BuilderForm, ImageUpload, MultiMediaUpload, MultiVideoUpload, PhoneUploadModal, ThemeSelector)
**Database Tables:** 2 (business_sites, upload_sessions)
**Storage Bucket:** 1 (site-images)
**Themes:** 5 (modern, classic, bold, minimal, warm)

**Features:**
- ✅ Beautiful animated landing page
- ✅ Multi-step form with validation
- ✅ Image compression (auto 1MB max)
- ✅ Video upload (25MB max)
- ✅ QR code mobile upload
- ✅ 5 customizable themes
- ✅ Responsive generated sites
- ✅ Click-to-call functionality
- ✅ Gallery display

---

*Generated for export on January 2026*
