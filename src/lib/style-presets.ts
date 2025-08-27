import { StylePreset } from '@/types/image';

export const stylePresets: StylePreset[] = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Realistic photography style with natural lighting',
    promptModifier: 'photorealistic, high quality, professional photography, natural lighting, detailed',
    example: 'A photorealistic portrait of a person in natural lighting'
  },
  {
    id: 'artistic',
    name: 'Artistic Painting',
    description: 'Oil painting or watercolor artistic style',
    promptModifier: 'artistic painting, oil painting style, painterly, brushstrokes, canvas texture',
    example: 'An artistic oil painting of a landscape with visible brushstrokes'
  },
  {
    id: 'digital_art',
    name: 'Digital Art',
    description: 'Modern digital artwork with vibrant colors',
    promptModifier: 'digital art, concept art, vibrant colors, digital painting, highly detailed',
    example: 'Digital concept art of a futuristic city with vibrant neon lights'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and fantastical scenes',
    promptModifier: 'fantasy art, magical, mystical, ethereal lighting, enchanted, dreamlike',
    example: 'A magical forest with glowing mushrooms and fairy lights'
  },
  {
    id: 'sci_fi',
    name: 'Sci-Fi',
    description: 'Futuristic and science fiction themes',
    promptModifier: 'sci-fi, futuristic, cyberpunk, neon lighting, high-tech, space age',
    example: 'A futuristic cyberpunk cityscape with neon lights and flying cars'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple designs with minimal elements',
    promptModifier: 'minimalist, clean design, simple, geometric, modern, white background',
    example: 'A minimalist geometric composition with clean lines and simple shapes'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro and vintage aesthetic',
    promptModifier: 'vintage, retro, aged, film photography, nostalgic, classic style',
    example: 'A vintage-style photograph with aged colors and retro aesthetic'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Non-representational artistic expression',
    promptModifier: 'abstract art, non-representational, flowing forms, color study, experimental',
    example: 'An abstract composition with flowing colors and dynamic forms'
  }
];

export const getStylePreset = (id: string): StylePreset | undefined => {
  return stylePresets.find(preset => preset.id === id);
};

export const getDefaultStyle = (): StylePreset => {
  return stylePresets[0]; // photorealistic
};