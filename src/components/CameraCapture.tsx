
import React, { useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setShowCamera(true);
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
    setShowCamera(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      
      // Convert data URL to Blob and then to File
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onImageCapture(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <>
      <Button 
        variant="outline" 
        type="button" 
        onClick={startCamera}
        className="flex items-center gap-2"
      >
        <Camera className="h-4 w-4" />
        {buttonText}
      </Button>

      <Dialog open={showCamera} onOpenChange={(open) => {
        if (!open) stopCamera();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take a Photo</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center">
            {!capturedImage ? (
              <video 
                ref={videoRef} 
                className="w-full h-auto rounded-md border border-gray-200" 
                autoPlay 
                playsInline
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-auto rounded-md border border-gray-200" 
              />
            )}
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={stopCamera}>Cancel</Button>
            
            {capturedImage ? (
              <Button onClick={retakePhoto}>Retake</Button>
            ) : (
              <Button onClick={capturePhoto}>Capture</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraCapture;
