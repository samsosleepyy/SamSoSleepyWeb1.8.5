import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface AddonProduct {
  title: string;
  info: string;
  image: string;
  downloadLink: string;
}

interface AddonCardProps {
  product: AddonProduct;
}

export function AddonCard({ product }: AddonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract badge text from title (text within parentheses)
  const badgeMatch = product.title.match(/^\(([^)]+)\)/);
  const badgeText = badgeMatch ? badgeMatch[1] : null;
  const displayTitle = badgeText
    ? product.title.replace(/^\([^)]+\)\s*/, '')
    : product.title;

  // Check if info has more than 5 lines
  const infoLines = product.info.split('\n');
  const hasMoreLines = infoLines.length > 5;
  const displayInfo = isExpanded ? product.info : infoLines.slice(0, 5).join('\n');

  const handleDownload = () => {
    try {
      const url = new URL(product.downloadLink);
      window.open(product.downloadLink, '_blank', 'noopener,noreferrer');
      toast.success('Opening download link...');
    } catch (error) {
      toast.error('Invalid download link. Please check the URL.');
    }
  };

  return (
  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1">
      {badgeText && (
        <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-all duration-200 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)] border-2 border-red-300">
          <span className="relative z-10 font-bold animate-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-[length:200%_100%] text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {badgeText}
          </span>
        </Badge>
      )}
      
      <CardHeader className="p-0">
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={product.image}
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="mb-2 text-gray-900 dark:text-gray-100">{displayTitle}</h3>
        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {displayInfo}
          {hasMoreLines && !isExpanded && '...'}
        </div>
        {hasMoreLines && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 active:scale-95"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-200" />
              </>
            ) : (
              <>
                More <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
              </>
            )}
          </Button>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleDownload} className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
