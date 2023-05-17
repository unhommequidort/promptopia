import { Schema, model, models } from 'mongoose';
import User, { IUser } from './user';
import { Key } from 'react';

export interface IPrompt {
  _id?: Key | null | undefined | Schema.Types.ObjectId;
  creator: any;
  prompt: string;
  tag: string;
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
  tag: {
    type: String,
    required: [true, 'Tag is required!'],
  },
});

const Prompt = models.Prompt || model<IPrompt>('Prompt', promptScheme);

export default Prompt;
