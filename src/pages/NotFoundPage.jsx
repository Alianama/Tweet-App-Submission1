import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
      setProgress((countdown - 1) * 20);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleRedirectNow = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto rounded-lg border bg-card p-8 shadow-lg"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <div className="bg-muted rounded-full p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Page not found
            </h1>
            <p className="text-muted-foreground">
              Kami tidak dapat menemukan halaman yang Anda cari.
            </p>
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Redirecting in
                  </span>
                </div>
                <motion.span
                  key={countdown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono font-bold"
                >
                  {countdown}s
                </motion.span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleRedirectNow}
                className="flex-1 gap-2"
                variant="default"
              >
                Home
                <Home className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
