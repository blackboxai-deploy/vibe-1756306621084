import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export const metadata = {
  title: 'About - AI Image Generator',
  description: 'Learn about our AI image generation technology, features, and how to create stunning artwork with advanced FLUX 1.1 Pro model.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          About AI Image Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover the power of artificial intelligence to transform your creative ideas into stunning visual artwork
        </p>
      </div>

      {/* Technology Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </span>
            Advanced AI Technology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our image generator is powered by <strong>FLUX 1.1 Pro</strong>, one of the most advanced 
            image generation models available today. This cutting-edge AI model excels at understanding 
            complex prompts and creating high-quality, detailed images that match your creative vision.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                🎯 High Precision
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Accurately interprets detailed prompts and produces images that closely match your description
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                ⚡ Fast Generation
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate high-quality images in just 2-5 minutes with real-time progress tracking
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                🎨 Multiple Styles
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                From photorealistic to artistic, fantasy to minimalist - explore various artistic styles
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                🔧 Customizable
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Fine-tune generation with custom system prompts and style presets for perfect results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">✨</span>
            </span>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Intelligent Prompt Processing
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Our AI understands complex descriptions, artistic styles, lighting conditions, and composition details to create exactly what you envision.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Style Presets & Customization
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Choose from pre-configured styles like Photorealistic, Digital Art, Fantasy, and more. Advanced users can customize system prompts for precise control.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Gallery & History Management
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Automatically save your generated images with searchable history, filtering by style and status, plus easy download and sharing options.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Real-time Generation Tracking
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Watch your images come to life with progress indicators, status updates, and estimated completion times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">💡</span>
            </span>
            Tips for Better Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Writing Effective Prompts
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Be specific:</strong> Include details about colors, lighting, composition, and style</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Use descriptive adjectives:</strong> "vibrant", "soft", "dramatic", "ethereal"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Specify the medium:</strong> "oil painting", "digital art", "photograph"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Mention lighting:</strong> "golden hour", "soft natural light", "dramatic shadows"</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Example Prompt
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 italic">
                "A serene mountain landscape at sunset with purple and orange clouds, crystal clear lake reflection, 
                soft golden lighting, photorealistic style, highly detailed, professional photography composition"
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Common Mistakes to Avoid
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Vague descriptions: "a pretty picture" or "something cool"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Too many conflicting styles in one prompt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Overly complex prompts with too many elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Using negative language (focus on what you want, not what you don't want)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🔒</span>
            </span>
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Your privacy is important to us. Here's how we handle your data:
          </p>
          
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-green-600">🔐</span>
              <span><strong>Local Storage:</strong> Your generated images and settings are stored locally in your browser</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">🔐</span>
              <span><strong>No Account Required:</strong> Use the service without creating accounts or providing personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">🔐</span>
              <span><strong>Secure Processing:</strong> Image generation happens on secure cloud infrastructure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">🔐</span>
              <span><strong>Data Export:</strong> Export your images and data anytime from the Gallery page</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Ready to Start Creating?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Transform your imagination into stunning visuals with the power of AI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/generate">Start Generating</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}