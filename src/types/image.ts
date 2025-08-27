export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  timestamp: number;
  status: 'generating' | 'completed' | 'error';
  error?: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  style?: string;
  systemPrompt?: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  id: string;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  example: string;
}

export interface GenerationSettings {
  systemPrompt: string;
  defaultStyle: string;
  maxImages: number;
}