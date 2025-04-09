
import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface CameraCaptureProps {
  onImageCapture: (imageFile: File) => void;
  buttonText?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ 
  onImageCapture,
  buttonText = "Take Photo" 
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera when dialog opens
  useEffect(() => {
    if (showCamera && !cameraActive) {
      startCamera();
    }
    
    // Cleanup function to stop camera when component unmounts or dialog closes
    return () => {
      if (streamRef.current) {
        stopCamera();
      }
    };
  }, [showCamera]);

  const startCamera = async () => {
    try {
      const constraints = { 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setCameraActive(true);
                console.log("Camera started successfully");
              })
              .catch(err => {
                console.error("Error playing video:", err);
              });
          }
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please ensure you've granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        
        // Convert data URL to Blob and then to File
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            console.log("Image captured successfully", file);
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage && canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onImageCapture(file);
          handleCloseDialog();
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const handleOpenDialog = () => {
    setShowCamera(true);
  };

  const handleCloseDialog = () => {
    setShowCamera(false);
    setCapturedImage(null);
    stopCamera();
  };

  return (
    <>
      <Button 
        variant="outline" 
        type="button" 
        onClick={handleOpenDialog}
        className="flex items-center gap-2"
      >
        <Camera className="h-4 w-4" />
        {buttonText}
      </Button>

      <Dialog open={showCamera} onOpenChange={(open) => {
        if (!open) handleCloseDialog();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take a Photo</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center">
            {!capturedImage ? (
              <div className="relative w-full">
                <video 
                  ref={videoRef} 
                  className="w-full h-auto rounded-md border border-gray-200" 
                  autoPlay 
                  playsInline
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                    Loading camera...
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-auto rounded-md border border-gray-200" 
                />
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            
            {capturedImage ? (
              <div className="space-x-2">
                <Button variant="outline" onClick={retakePhoto}>Retake</Button>
                <Button onClick={savePhoto}>Use Photo</Button>
              </div>
            ) : (
              <Button 
                onClick={capturePhoto} 
                disabled={!cameraActive}
              >
                Capture
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraCapture;
