'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { stylePresets } from '@/lib/style-presets';
import { StylePreset } from '@/types/image';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  disabled?: boolean;
}

export function StyleSelector({ selectedStyle, onStyleChange, disabled }: StyleSelectorProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayedStyles = showAll ? stylePresets : stylePresets.slice(0, 4);

  const handleStyleSelect = (styleId: string) => {
    if (disabled) return;
    onStyleChange(styleId);
  };

  const getStyleCard = (style: StylePreset) => (
    <Card
      key={style.id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedStyle === style.id
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20'
          : 'hover:shadow-lg'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => handleStyleSelect(style.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {style.name}
          </h3>
          {selectedStyle === style.id && (
            <Badge variant="default" className="bg-blue-600">
              Selected
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {style.description}
        </p>
        
        <div className="space-y-2">
          <div className="text-xs text-slate-500 dark:text-slate-500">
            <strong>Keywords:</strong> {style.promptModifier}
          </div>
          
          <div className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800 p-2 rounded">
            <strong>Example:</strong> {style.example}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Style Preset
        </h3>
        
        {stylePresets.length > 4 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            disabled={disabled}
          >
            {showAll ? 'Show Less' : `Show All (${stylePresets.length})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedStyles.map(getStyleCard)}
      </div>

      {/* Selected Style Preview */}
      {selectedStyle && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
            Current Style: {stylePresets.find(s => s.id === selectedStyle)?.name}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {stylePresets.find(s => s.id === selectedStyle)?.description}
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500">
            <strong>These keywords will be added to your prompt:</strong> {' '}
            <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              {stylePresets.find(s => s.id === selectedStyle)?.promptModifier}
            </span>
          </div>
        </div>
      )}

      {/* Style Tips */}
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p><strong>💡 Style Tips:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Photorealistic works best for portraits and nature scenes</li>
          <li>Digital Art is great for characters and concept art</li>
          <li>Fantasy style adds magical elements automatically</li>
          <li>You can override the style by being specific in your prompt</li>
        </ul>
      </div>
    </div>
  );
}