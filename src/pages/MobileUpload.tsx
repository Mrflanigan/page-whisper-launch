import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Check, X, Loader2, Video } from 'lucide-react';

const MobileUpload = () => {
  const { token } = useParams<{ token: string }>();
  const [session, setSession] = useState<{ id: string; upload_type: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
          setUploaded(true);
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }

    // Max 50MB
    if (file.size > 50 * 1024 * 1024) {
      setError('Video must be under 50MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.id}-${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);

      // Update session with uploaded URL
      const { error: updateError } = await supabase
        .from('upload_sessions')
        .update({ uploaded_url: publicUrl })
        .eq('id', session.id);

      if (updateError) throw updateError;

      setPreview(publicUrl);
      setUploaded(true);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
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

  if (uploaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <Check className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-xl font-semibold text-foreground mb-2">Upload Complete!</h1>
        <p className="text-muted-foreground mb-6">
          You can now close this page and return to your desktop.
        </p>
        {preview && (
          <video 
            src={preview} 
            controls 
            className="max-w-full max-h-48 rounded-lg"
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      {/* Header */}
      <div className="text-center py-8">
        <Video className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Upload Video</h1>
        <p className="text-muted-foreground">
          Select a video from your phone to upload
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
            accept="video/*"
            capture="environment"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-foreground font-medium">Uploading...</p>
                <p className="text-sm text-muted-foreground">Please wait</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium">Tap to Select Video</p>
                <p className="text-sm text-muted-foreground mt-1">or record a new one</p>
              </>
            )}
          </div>
        </label>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          Maximum file size: 50MB
        </p>
      </div>
    </div>
  );
};

export default MobileUpload;
