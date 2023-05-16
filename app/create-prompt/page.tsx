'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IPrompt } from '@models/prompt';

import Form from '@components/Form';
import { Schema } from 'mongoose';

const CreatePromptPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPrompt>({
    prompt: '',
    tags: '',
    creator: {} as Schema.Types.ObjectId,
  });

  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          // email: session?.data?.user?.email,
          tags: post.tags,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePromptPage;
