'use client';

import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  isVisible: boolean;
  message?: string;
  progress?: number;
}

const loadingMessages = [
  "Analyzing your prompt...",
  "Initializing AI model...",
  "Generating image composition...",
  "Adding details and textures...",
  "Applying artistic style...",
  "Finalizing your masterpiece..."
];

export function LoadingAnimation({ isVisible, message, progress }: LoadingAnimationProps) {
  const [currentMessage, setCurrentMessage] = useState(message || loadingMessages[0]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isVisible) return;

    const messageInterval = setInterval(() => {
      if (!message) {
        setCurrentMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [isVisible, message]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mx-4 max-w-md w-full text-center shadow-2xl">
        {/* Animated AI Brain */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
          <div className="absolute inset-4 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {/* Spinning Rings */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-pink-600 rounded-full animate-spin animation-delay-300"></div>
        </div>

        {/* Loading Message */}
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Creating Your Image
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 min-h-[1.5rem]">
          {currentMessage}{dots}
        </p>

        {/* Estimated Time */}
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-500">
          <p>This usually takes 2-5 minutes</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}