'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ImageCard } from './ImageCard';
import { StorageManager } from '@/lib/storage';
import { GeneratedImage } from '@/types/image';
import { stylePresets } from '@/lib/style-presets';

interface GenerationHistoryProps {
  showTitle?: boolean;
  maxItems?: number;
}

export function GenerationHistory({ showTitle = true, maxItems }: GenerationHistoryProps) {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GeneratedImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [images, searchTerm, styleFilter, statusFilter, sortBy]);

  const loadImages = () => {
    const storedImages = StorageManager.getImages();
    setImages(storedImages);
  };

  const applyFilters = () => {
    let filtered = [...images];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Style filter
    if (styleFilter !== 'all') {
      filtered = filtered.filter(image => image.style === styleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(image => image.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'prompt':
        filtered.sort((a, b) => a.prompt.localeCompare(b.prompt));
        break;
    }

    // Apply maxItems limit if specified
    if (maxItems && maxItems > 0) {
      filtered = filtered.slice(0, maxItems);
    }

    setFilteredImages(filtered);
  };

  const handleDelete = (imageId: string) => {
    StorageManager.deleteImage(imageId);
    loadImages();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all images? This action cannot be undone.')) {
      StorageManager.clearAllImages();
      loadImages();
    }
  };

  const handleExport = () => {
    const data = StorageManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-images-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getStatusCount = (status: GeneratedImage['status']) => {
    return images.filter(img => img.status === status).length;
  };

  const getStyleCount = (style: string) => {
    return images.filter(img => img.style === style).length;
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Image Gallery
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {images.length} images generated • {getStatusCount('completed')} completed
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm">
              Export Data
            </Button>
            <Button 
              onClick={handleClearAll} 
              variant="outline" 
              size="sm"
              className="text-red-600 hover:text-red-700"
              disabled={images.length === 0}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      {!maxItems && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex-1">
            <Input
              placeholder="Search by prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={styleFilter} onValueChange={setStyleFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Styles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              {stylePresets.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  {style.name} ({getStyleCount(style.id)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed ({getStatusCount('completed')})</SelectItem>
              <SelectItem value="generating">Generating ({getStatusCount('generating')})</SelectItem>
              <SelectItem value="error">Failed ({getStatusCount('error')})</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="prompt">By Prompt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quick Stats */}
      {!maxItems && images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            Total: {images.length}
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Completed: {getStatusCount('completed')}
          </Badge>
          {getStatusCount('generating') > 0 && (
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              Generating: {getStatusCount('generating')}
            </Badge>
          )}
          {getStatusCount('error') > 0 && (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
              Failed: {getStatusCount('error')}
            </Badge>
          )}
        </div>
      )}

      {/* Images Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={() => handleDelete(image.id)}
              showPrompt={true}
              showActions={true}
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🖼️</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No Images Yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Start generating images to build your gallery
          </p>
          <Button asChild>
            <a href="/generate">Generate Your First Image</a>
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No Images Match Your Filters
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Try adjusting your search or filter settings
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setStyleFilter('all');
              setStatusFilter('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}