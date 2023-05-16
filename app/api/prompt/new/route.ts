import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tags } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await new Prompt({
      creator: userId,
      prompt,
      tags,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error creating prompt: ', error?.message);
      return new Response('Failed to create a new prompt!', { status: 500 });
    }
  }
};
