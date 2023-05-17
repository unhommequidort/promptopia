'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { IPrompt } from '@models/prompt';

interface PromptCardListProps {
  data: IPrompt[];
  handleTagClick?: (tag: string) => void;
}

const PromptCardList = ({
  data,
  handleTagClick,
}: PromptCardListProps): JSX.Element => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id as string}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data: IPrompt[] = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
