import { HorizontalRule } from '../Header/HeaderStyles';
import { CategoryModal } from './RequestForm';

import FilteredOption from '../Header/FilteredOption';

import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './RequestForm';

interface CategorySelectorProps {
  selectedCategory: string;
  handleCategoryChange: (newValue: string) => void;
  register: UseFormRegister<FormValues>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, handleCategoryChange, register }) => {
  return (
    <CategoryModal>
      <FilteredOption label="Feature" value="feature" selectedValue={selectedCategory} onValueChange={handleCategoryChange} register={register} type="category" />
      <HorizontalRule />
      <FilteredOption label="Bug" value="bug" selectedValue={selectedCategory} onValueChange={handleCategoryChange} register={register} type="category" />
      <HorizontalRule />
      <FilteredOption label="Enhancement" value="enhancement" selectedValue={selectedCategory} onValueChange={handleCategoryChange} register={register} type="category" />
      <HorizontalRule />
      <FilteredOption label="UX" value="UX" selectedValue={selectedCategory} onValueChange={handleCategoryChange} register={register} type="category" />
      <HorizontalRule />
      <FilteredOption label="UI" value="UI" selectedValue={selectedCategory} onValueChange={handleCategoryChange} register={register} type="category" />
    </CategoryModal>
  );
};

export default CategorySelector;
