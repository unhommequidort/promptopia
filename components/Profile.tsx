import { IPrompt } from '@models/prompt';
import PromptCard from './PromptCard';

interface ProfileProps {
  name: string;
  description: string;
  data: IPrompt[];
  handleEdit: (post: IPrompt) => void;
  handleDelete: (post: IPrompt) => void;
}

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id as string}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
