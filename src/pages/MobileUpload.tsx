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
          // Parse existing URLs if any
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

        // Validate and compress
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

      // Update session with all URLs as JSON
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
        
        {/* Show previews */}
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

        {/* Add more button */}
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
      {/* Header */}
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

      {/* Upload Area */}
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
