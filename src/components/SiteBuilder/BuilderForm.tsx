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
      // Store arrays as JSON strings for hero_image_url (gallery) and add video support
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
        // Store gallery as JSON in hero_image_url field
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
        
        {/* Logo */}
        <ImageUpload
          label="Logo (optional)"
          value={formData.logo_url}
          onChange={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
        />

        {/* Gallery Images */}
        <MultiMediaUpload
          label="Photo Gallery"
          values={formData.gallery_images}
          onChange={(urls) => setFormData(prev => ({ ...prev, gallery_images: urls }))}
          maxFiles={10}
        />

        {/* Videos */}
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
