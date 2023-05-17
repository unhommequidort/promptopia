'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IPrompt } from '@models/prompt';
import { useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { Schema } from 'mongoose';

const UpdatePromptPage = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPrompt>({
    prompt: '',
    tag: '',
    creator: {} as Schema.Types.ObjectId,
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data: IPrompt = await response.json();
      setPost(data);
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert('Prompt ID is missing');
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error?.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePromptPage;
