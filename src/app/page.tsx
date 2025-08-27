import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen -mt-8 pt-8">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            AI Image Generator
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your imagination into stunning visuals with our advanced AI-powered image generation using FLUX 1.1 Pro
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/generate">Start Creating</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>

          {/* Sample Generated Image Placeholder */}
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4592ada5-054e-4f29-8b3d-4b5cf552af4e.png" 
                alt="Beautiful AI generated landscape with vibrant colors and stunning detail"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Example of AI-generated artwork
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
            Powerful Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">AI</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  Advanced AI Model
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Powered by FLUX 1.1 Pro, one of the most advanced image generation models available today
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">∞</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  Unlimited Creativity
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate endless variations with customizable styles, prompts, and artistic directions
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  Fast Generation
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  High-quality images generated in minutes with real-time progress tracking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
            How It Works
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-xl text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  Describe Your Vision
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enter a detailed description of the image you want to create. The more specific you are, the better the results will be.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-2xl border">
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    "A serene mountain landscape at sunset with purple clouds and a crystal clear lake reflecting the sky"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-xl text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  AI Processes Your Request
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our advanced AI model analyzes your prompt and begins creating a unique image tailored to your specifications.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Generating image...</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-xl text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  Download & Share
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your generated image is ready! Download it in high quality or save it to your gallery for future reference.
                </p>
              </div>
              <div className="flex-1">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center">
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Your Amazing Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Join thousands of creators who are already using AI to bring their ideas to life.
          </p>
          <Button asChild size="lg" className="px-12 py-6 text-lg">
            <Link href="/generate">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}