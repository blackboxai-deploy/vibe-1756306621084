import { GeneratedImage, GenerationSettings } from '@/types/image';

const STORAGE_KEYS = {
  IMAGES: 'ai_generated_images',
  SETTINGS: 'ai_generation_settings'
} as const;

export class StorageManager {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  // Image Management
  static saveImage(image: GeneratedImage): void {
    if (!this.isClient()) return;
    
    const images = this.getImages();
    images.unshift(image); // Add to beginning
    
    // Keep only the latest 50 images
    const limitedImages = images.slice(0, 50);
    
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(limitedImages));
  }

  static getImages(): GeneratedImage[] {
    if (!this.isClient()) return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.IMAGES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load images from storage:', error);
      return [];
    }
  }

  static getImageById(id: string): GeneratedImage | undefined {
    const images = this.getImages();
    return images.find(img => img.id === id);
  }

  static updateImage(id: string, updates: Partial<GeneratedImage>): void {
    if (!this.isClient()) return;
    
    const images = this.getImages();
    const index = images.findIndex(img => img.id === id);
    
    if (index !== -1) {
      images[index] = { ...images[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    }
  }

  static deleteImage(id: string): void {
    if (!this.isClient()) return;
    
    const images = this.getImages();
    const filtered = images.filter(img => img.id !== id);
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(filtered));
  }

  static clearAllImages(): void {
    if (!this.isClient()) return;
    localStorage.removeItem(STORAGE_KEYS.IMAGES);
  }

  // Settings Management
  static getSettings(): GenerationSettings {
    if (!this.isClient()) {
      return this.getDefaultSettings();
    }
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const settings = stored ? JSON.parse(stored) : this.getDefaultSettings();
      return { ...this.getDefaultSettings(), ...settings };
    } catch (error) {
      console.error('Failed to load settings from storage:', error);
      return this.getDefaultSettings();
    }
  }

  static saveSettings(settings: Partial<GenerationSettings>): void {
    if (!this.isClient()) return;
    
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
  }

  private static getDefaultSettings(): GenerationSettings {
    return {
      systemPrompt: "Generate a high-quality, detailed image based on the user's prompt. Focus on artistic composition, proper lighting, and visual appeal.",
      defaultStyle: 'photorealistic',
      maxImages: 50
    };
  }

  // Utility methods
  static exportData(): string {
    if (!this.isClient()) return '{}';
    
    return JSON.stringify({
      images: this.getImages(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  static importData(jsonData: string): { success: boolean; error?: string } {
    if (!this.isClient()) return { success: false, error: 'Not in browser environment' };
    
    try {
      const data = JSON.parse(jsonData);
      
      if (data.images && Array.isArray(data.images)) {
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(data.images));
      }
      
      if (data.settings && typeof data.settings === 'object') {
        this.saveSettings(data.settings);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON data' 
      };
    }
  }
}