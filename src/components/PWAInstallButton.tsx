import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share2, Info } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className,
  variant = 'outline',
  size = 'sm',
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already running as an installed native/PWA app
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleInstallClick}
        className={className}
        title="Install DigiTech POS Android App"
      >
        <Smartphone className="h-4 w-4 mr-2 text-primary" />
        <span>Install App</span>
      </Button>

      {/* Guide dialog for Android / Chrome / Mobile install */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Install Android Native App
            </DialogTitle>
            <DialogDescription>
              Install DigiTech POS directly onto your Android device or Chromebook as a full standalone application.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-muted p-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">On Android (Chrome / Brave / Edge):</p>
                  <p className="text-muted-foreground mt-0.5">
                    Tap the <strong>three vertical dots (⋮)</strong> menu in the top-right corner of your browser.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">Select "Install app" or "Add to Home screen":</p>
                  <p className="text-muted-foreground mt-0.5">
                    Android will generate and install the native WebAPK package with full hardware camera access and home screen icon.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">Launch from App Drawer:</p>
                  <p className="text-muted-foreground mt-0.5">
                    Open DigiTech POS like any native Android app without any browser URL bars.
                  </p>
                </div>
              </div>
            </div>

            {isIOS && (
              <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">On iOS (Safari):</p>
                Tap the <Share2 className="inline h-3.5 w-3.5 mx-0.5" /> <strong>Share</strong> button, then select <strong>Add to Home Screen</strong>.
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="default" onClick={() => setShowGuide(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
