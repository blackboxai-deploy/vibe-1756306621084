'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PromptInput } from './PromptInput';
import { StyleSelector } from './StyleSelector';
import { LoadingAnimation } from './LoadingAnimation';
import { ImageCard } from './ImageCard';
import { StorageManager } from '@/lib/storage';
import { getStylePreset } from '@/lib/style-presets';
import { GeneratedImage, ImageGenerationRequest } from '@/types/image';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Load settings on mount
  useEffect(() => {
    const settings = StorageManager.getSettings();
    setSystemPrompt(settings.systemPrompt);
    setSelectedStyle(settings.defaultStyle);
  }, []);

  const buildFinalPrompt = (userPrompt: string, style: string): string => {
    const stylePreset = getStylePreset(style);
    const styleModifier = stylePreset?.promptModifier || '';
    
    return styleModifier ? `${userPrompt}, ${styleModifier}` : userPrompt;
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate an image');
      return;
    }

    if (prompt.length > 1000) {
      toast.error('Prompt is too long. Please keep it under 1000 characters.');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Create a temporary image object for immediate feedback
    const tempImage: GeneratedImage = {
      id: `temp_${Date.now()}`,
      url: '',
      prompt: prompt.trim(),
      style: selectedStyle,
      timestamp: Date.now(),
      status: 'generating'
    };
    
    setCurrentImage(tempImage);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) return 90; // Cap at 90% until actual completion
        return prev + Math.random() * 10;
      });
    }, 2000);

    try {
      const finalPrompt = buildFinalPrompt(prompt, selectedStyle);
      
      const requestData: ImageGenerationRequest = {
        prompt: finalPrompt,
        style: selectedStyle,
        systemPrompt: systemPrompt || undefined
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (result.success && result.imageUrl) {
        const completedImage: GeneratedImage = {
          ...tempImage,
          id: result.id,
          url: result.imageUrl,
          status: 'completed'
        };

        setCurrentImage(completedImage);
        StorageManager.saveImage(completedImage);
        
        toast.success('Image generated successfully!');
        
        // Save current settings
        StorageManager.saveSettings({
          systemPrompt,
          defaultStyle: selectedStyle
        });
        
      } else {
        const errorImage: GeneratedImage = {
          ...tempImage,
          id: result.id || tempImage.id,
          status: 'error',
          error: result.error || 'Unknown error occurred'
        };
        
        setCurrentImage(errorImage);
        toast.error(`Generation failed: ${result.error || 'Unknown error'}`);
      }
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Generation error:', error);
      
      const errorImage: GeneratedImage = {
        ...tempImage,
        status: 'error',
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
      
      setCurrentImage(errorImage);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 1000);
    }
  };

  const handleRetry = () => {
    if (currentImage && currentImage.status === 'error') {
      generateImage();
    }
  };

  const handleNewGeneration = () => {
    setCurrentImage(null);
    setPrompt('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <LoadingAnimation 
        isVisible={isGenerating} 
        progress={generationProgress}
      />
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          AI Image Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Transform your ideas into stunning visuals with our advanced AI model. 
          Describe what you want to see and watch it come to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Generation Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Image Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Input */}
              <div>
                <Label htmlFor="prompt" className="text-base font-medium">
                  Describe Your Image
                </Label>
                <div className="mt-2">
                  <PromptInput
                    value={prompt}
                    onChange={setPrompt}
                    onSubmit={generateImage}
                    isGenerating={isGenerating}
                    placeholder="A majestic mountain landscape at sunset with golden light reflecting on a crystal clear lake..."
                  />
                </div>
              </div>

              <Separator />

              {/* Style Selection */}
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                disabled={isGenerating}
              />

              <Separator />

              {/* System Prompt */}
              <div>
                <Label htmlFor="system-prompt" className="text-base font-medium mb-2 block">
                  System Prompt (Advanced)
                </Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Override the default system prompt to fine-tune image generation behavior..."
                  className="min-h-[100px]"
                  disabled={isGenerating}
                />
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Optional: Customize how the AI interprets and generates your images. 
                  Leave empty to use the default optimized prompt.
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateImage}
                disabled={isGenerating || !prompt.trim()}
                size="lg"
                className="w-full"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Image...
                  </div>
                ) : (
                  'Generate Image'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Result Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Generated Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentImage ? (
                <div className="space-y-4">
                  <ImageCard 
                    image={currentImage}
                    onRetry={currentImage.status === 'error' ? handleRetry : undefined}
                    showPrompt={true}
                  />
                  
                  {currentImage.status === 'completed' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleNewGeneration}
                        className="flex-1"
                      >
                        Generate New Image
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Ready to Create
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Enter a prompt and click Generate to create your first AI image
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}