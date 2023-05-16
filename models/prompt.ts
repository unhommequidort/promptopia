import { Schema, model, models } from 'mongoose';

export interface IPrompt {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tags: string;
}

const promptScheme = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required!'],
  },
  tags: {
    type: String,
    required: [true, 'Tag is required!'],
  },
});

const Prompt = models.Prompt || model<IPrompt>('Prompt', promptScheme);

export default Prompt;
