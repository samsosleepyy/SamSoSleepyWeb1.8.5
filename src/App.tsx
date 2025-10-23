import { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { Toaster } from './components/ui/sonner';
import { Menu } from 'lucide-react';
import { Button } from './components/ui/button';
import backgroundVideo from './assets/lv_0_20251022205617.mp4';

type Page = 'home' | 'addon' | 'map' | 'mcui';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoScale, setVideoScale] = useState(1);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const vW = el.videoWidth || vw;
      const vH = el.videoHeight || vh;
      if (!vW || !vH) return;
      const scale = Math.max(vw / vW, vh / vH);
      // ensure at least 1 and add tiny epsilon to avoid subpixel gaps
      setVideoScale(Math.max(1, scale + 0.001));
    };

    el.addEventListener('loadedmetadata', updateScale);
    window.addEventListener('resize', updateScale);
    // run once in case metadata already loaded
    updateScale();

    return () => {
      el.removeEventListener('loadedmetadata', updateScale);
      window.removeEventListener('resize', updateScale);
    };
  }, [videoRef.current]);

  return (
    <ThemeProvider>
      <div className="flex h-screen relative overflow-hidden">
        {/* Background video (fixed, full viewport) */}
        <video
          ref={videoRef}
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ transform: `scale(${videoScale})`, transformOrigin: 'center' }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex w-full h-full">
          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-4 left-4 z-50 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <Sidebar 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <main className="flex-1 overflow-auto pt-16">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'addon' && <ProductPage type="addon" />}
            {currentPage === 'map' && <ProductPage type="map" />}
            {currentPage === 'mcui' && <ProductPage type="mcui" />}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
