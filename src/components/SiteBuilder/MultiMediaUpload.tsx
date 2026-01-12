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
    // Only compress images
    if (!file.type.startsWith('image/')) return file;
    
    const options = {
      maxSizeMB: 1, // Max 1MB per image
      maxWidthOrHeight: 1920, // Max dimension
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

    // Check max files
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

        // Compress if it's an image
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
      
      {/* Uploaded items */}
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

      {/* Upload button */}
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
