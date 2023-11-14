import { TagsContainer, ButtonTag } from './NavbarStyles';

interface TagsListProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TagsList: React.FC<TagsListProps> = ({ selectedCategory, onCategoryChange }) => {
  const TagsArray: string[] = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  return (
    <TagsContainer>
      {TagsArray.map((tag) => (
        <ButtonTag $isChosen={selectedCategory === tag} key={tag} onClick={() => onCategoryChange(tag)}>
          {tag}
        </ButtonTag>
      ))}
    </TagsContainer>
  );
};

export default TagsList;
