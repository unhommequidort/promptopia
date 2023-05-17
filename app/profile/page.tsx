'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { IPrompt } from '@models/prompt';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPrompt[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data: IPrompt[] = await response.json();
      setPosts(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session?.user?.id]);

  const handleEdit = (post: IPrompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: IPrompt) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error?.message);
        }
      }
    }
  };
  return (
    <Profile
      name="My "
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
