'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GeneratedImage } from '@/types/image';
import { getStylePreset } from '@/lib/style-presets';

interface ImageCardProps {
  image: GeneratedImage;
  onRetry?: () => void;
  onDelete?: () => void;
  showPrompt?: boolean;
  showActions?: boolean;
}

export function ImageCard({ 
  image, 
  onRetry, 
  onDelete, 
  showPrompt = false, 
  showActions = true 
}: ImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const downloadImage = async () => {
    if (!image.url || image.status !== 'completed') return;

    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const copyImageUrl = async () => {
    if (!image.url) return;
    
    try {
      await navigator.clipboard.writeText(image.url);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const getStatusColor = (status: GeneratedImage['status']) => {
    switch (status) {
      case 'generating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Image Display */}
        <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
          {image.status === 'generating' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Generating...</p>
              </div>
            </div>
          )}

          {image.status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">Generation Failed</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {image.error || 'Unknown error occurred'}
                </p>
                {onRetry && (
                  <Button onClick={onRetry} size="sm" variant="outline">
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}

          {image.status === 'completed' && image.url && (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🖼️</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Image failed to load
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Status and Style */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(image.status)}>
              {image.status === 'generating' ? 'Generating...' : 
               image.status === 'completed' ? 'Completed' : 'Failed'}
            </Badge>
            
            {image.style && (
              <Badge variant="secondary">
                {getStylePreset(image.style)?.name || image.style}
              </Badge>
            )}
          </div>

          {/* Prompt */}
          {showPrompt && (
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                Prompt:
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {image.prompt}
              </p>
            </div>
          )}

          {/* Timestamp */}
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {formatTimestamp(image.timestamp)}
          </p>

          {/* Actions */}
          {showActions && image.status === 'completed' && image.url && (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={downloadImage}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                Download
              </Button>
              
              <Button
                onClick={copyImageUrl}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                Copy URL
              </Button>
              
              {onDelete && (
                <Button
                  onClick={onDelete}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}