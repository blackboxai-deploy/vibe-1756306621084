import { NextRequest, NextResponse } from 'next/server';
import { AIImageGenerator } from '@/lib/ai-client';
import { ImageGenerationRequest } from '@/types/image';

// Configure runtime for edge functions
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ImageGenerationRequest = await request.json();
    
    // Validate required fields
    if (!body.prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Validate prompt length
    if (body.prompt.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Prompt is too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    // Generate image using AI client
    const result = await AIImageGenerator.generateImage(body);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        id: `error_${Date.now()}`
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}