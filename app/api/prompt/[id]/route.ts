import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) {
      return new Response('Prompt not found!', { status: 404 });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error fetching prompt: ', error?.message);
      return new Response('Failed to fetch prompt!', { status: 500 });
    }
  }
};

// PATCH
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response('Prompt not found!', { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error updating prompt: ', error?.message);
      return new Response('Failed to update prompt!', { status: 500 });
    }
  }
};

// DELETE
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully!', {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error deleting prompt: ', error?.message);
      return new Response('Failed to delete prompt!', { status: 500 });
    }
  }
};
