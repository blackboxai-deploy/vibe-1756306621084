'use client';

import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  placeholder?: string;
}

const promptSuggestions = [
  "A serene mountain landscape at golden hour with misty peaks",
  "Portrait of a wise old tree with intricate bark patterns",
  "Futuristic city skyline with flying vehicles and neon lights",
  "Magical forest clearing with bioluminescent mushrooms",
  "Cozy coffee shop interior with warm lighting and plants",
  "Abstract geometric composition with vibrant flowing colors",
  "Vintage library with towering bookshelves and old manuscripts",
  "Peaceful zen garden with cherry blossoms and stone paths"
];

const quickPrompts = [
  "photorealistic",
  "artistic",
  "vibrant colors",
  "soft lighting",
  "detailed",
  "minimalist",
  "dramatic",
  "ethereal"
];

export function PromptInput({ value, onChange, onSubmit, isGenerating, placeholder }: PromptInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characterLimit = 1000;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!isGenerating && value.trim()) {
        onSubmit();
      }
    }

    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < promptSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : promptSuggestions.length - 1
        );
      } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
        e.preventDefault();
        onChange(promptSuggestions[selectedSuggestionIndex]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const addQuickPrompt = (prompt: string) => {
    const newValue = value ? `${value}, ${prompt}` : prompt;
    if (newValue.length <= characterLimit) {
      onChange(newValue);
      textareaRef.current?.focus();
    }
  };

  const charactersRemaining = characterLimit - value.length;
  const isOverLimit = charactersRemaining < 0;

  return (
    <div className="space-y-4">
      {/* Main Input Area */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Describe the image you want to generate in detail..."}
          className="min-h-[120px] text-base resize-none pr-20"
          disabled={isGenerating}
        />
        
        {/* Character Count */}
        <div className="absolute bottom-3 right-3 text-sm">
          <span className={isOverLimit ? 'text-red-500' : 'text-slate-500'}>
            {charactersRemaining}
          </span>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Quick Additions:
        </label>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <Badge
              key={prompt}
              variant="secondary"
              className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => addQuickPrompt(prompt)}
            >
              + {prompt}
            </Badge>
          ))}
        </div>
      </div>

      {/* Suggestions Toggle */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          disabled={isGenerating}
        >
          {showSuggestions ? 'Hide' : 'Show'} Example Prompts
        </Button>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          Press Cmd/Ctrl + Enter to generate
        </div>
      </div>

      {/* Suggestions List */}
      {showSuggestions && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
            Example Prompts:
          </h4>
          {promptSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-3 rounded-lg cursor-pointer transition-colors text-sm ${
                selectedSuggestionIndex === index
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {!showSuggestions && (
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <p><strong>💡 Tip:</strong> Be specific about colors, lighting, composition, and style for better results.</p>
          <p><strong>🎨 Style:</strong> Try adding words like "photorealistic", "digital art", or "oil painting".</p>
        </div>
      )}
    </div>
  );
}