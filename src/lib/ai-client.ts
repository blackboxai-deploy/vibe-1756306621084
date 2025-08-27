import { ImageGenerationRequest, ImageGenerationResponse } from '@/types/image';

const AI_ENDPOINT = 'https://oi-server.onrender.com/chat/completions';
const AI_MODEL = 'replicate/black-forest-labs/flux-1.1-pro';

const DEFAULT_HEADERS = {
  'customerId': 'cus_RtuUelvcC9CvX8',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer xxx'
};

export class AIImageGenerator {
  private static async makeRequest(prompt: string, systemPrompt?: string): Promise<Response> {
    const messages = [
      {
        role: 'user' as const,
        content: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt
      }
    ];

    const requestBody = {
      model: AI_MODEL,
      messages
    };

    return fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(requestBody),
    });
  }

  static async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const response = await this.makeRequest(request.prompt, request.systemPrompt);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API Error:', response.status, errorText);
        return {
          success: false,
          error: `API Error: ${response.status} - ${response.statusText}`,
          id
        };
      }

      const data = await response.json();
      
      // Extract image URL from response
      let imageUrl: string | undefined;
      
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        // Look for image URLs in the response
        const urlMatch = content.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i);
        if (urlMatch) {
          imageUrl = urlMatch[0];
        }
      }

      if (!imageUrl) {
        console.error('No image URL found in response:', data);
        return {
          success: false,
          error: 'No image URL found in response',
          id
        };
      }

      return {
        success: true,
        imageUrl,
        id
      };

    } catch (error) {
      console.error('Image generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        id
      };
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeRequest('Test connection');
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}