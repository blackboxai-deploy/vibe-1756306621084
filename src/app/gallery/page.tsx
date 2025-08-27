import { GenerationHistory } from '@/components/GenerationHistory';

export const metadata = {
  title: 'Gallery - AI Image Generator',
  description: 'Browse and manage your AI-generated images. View your complete collection of artwork created with advanced AI models.',
};

export default function GalleryPage() {
  return <GenerationHistory />;
}