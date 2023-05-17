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
  const [posts, setPosts] = useState<IPrompt[]>([]);

  // search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<IPrompt[]>([]);

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case insensitive search
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce search
    setSearchTimeout(
      setTimeout(() => {
        setSearchResults(filterPrompts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    console.log('tag clicked: ', tag);
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchResults(searchResult);
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
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
