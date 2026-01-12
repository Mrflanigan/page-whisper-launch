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
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <QRCodeSVG value={uploadLink} size={200} />
                </div>
              </div>

              {/* Instructions */}
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

              {/* Copy Link */}
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

              {/* Check for Upload */}
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
