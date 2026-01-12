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

    // Check max files
    if (values.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} videos allowed`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check file size
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
      
      {/* Uploaded videos */}
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

      {/* Upload options */}
      {values.length < maxFiles && (
        <div className="grid grid-cols-2 gap-2">
          {/* Direct upload */}
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

          {/* Phone upload */}
          <PhoneUploadModal onUploadComplete={handlePhoneUpload} />
        </div>
      )}
    </div>
  );
};
