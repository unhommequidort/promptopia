import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error fetching prompts: ', error?.message);
      return new Response('Failed to fetch prompts!', { status: 500 });
    }
  }
};
