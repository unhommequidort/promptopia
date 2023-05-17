'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { IPrompt } from '@models/prompt';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPrompt[]>([]);

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

  const handleEdit = () => {};
  const handleDelete = async () => {};
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
