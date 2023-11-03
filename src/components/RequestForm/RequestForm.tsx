import styled from 'styled-components';
import BackButton from '../BackButton/BackButton';

import { Container } from '../GlobalStyles/ReusedStyles';
import NewFeedbackSVG from '../../images/shared/icon-new-feedback.svg';
import BlueArrowUpSVG from '../../images/shared/icon-arrow-up-blue.svg';
import BlueArrowDownSVG from '../../images/shared/icon-arrow-down-blue.svg';
import FilteredOption from '../Header/FilteredOption';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { HorizontalRule } from '../Header/HeaderStyles';

import { capitalizeFirstLetter } from '../../Utils/Functions';
const RequestFormContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 40px;
`;

const NewRequestForm = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const NewFeedbackIcon = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  top: -20px;
  left: 20px;
`;

const RequestFormHeader = styled.h3`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-bottom: 24px;
  margin-top: 24px;
`;

const FormFieldLabel = styled.label`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.18px;
`;

const FormFieldDescription = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const FeedbackTitleInput = styled.input`
  padding: 5px 10px;
  width: 100%;
  height: 48px;
  background-color: #f7f8fd;
  font-size: 13px;
  color: #3a4374;
  border: none;
  outline: none;
  border-radius: 8px;
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const SelectedCategoryButtonInput = styled.button`
  width: 100%;
  height: 48px;
  background-color: #f7f8fd;
  font-size: 13px;
  color: #3a4374;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const CategoryModal = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(72, 84, 159, 0.25) 0px 10px 20px 0px;
  bottom: -23 0px;
`;

const FeedbackDetailInput = styled.textarea`
  padding: 20px;
  font-size: 13px;
  color: #3a4374;
  width: 100%;
  height: 120px;
  background-color: #f7f8fd;
  font-family: inherit;
  border-radius: 8px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const RequestForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // CREATING USE STATE FOR HOLDING SELECTED OPTION AND SHOWING IT IN THE CATEGORY BUTTON
  const [selectedCategory, setSelectedCategory] = useState<string>('Feature');
  const [categoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const openCategoryModal = () => {
    setIsCategoryModalOpen(!categoryModalOpen);
    console.log('works!!');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIsCategoryModalOpen(!categoryModalOpen);
  };

  return (
    <>
      <BackButton isEdit={false} />
      <RequestFormContainer>
        <NewRequestForm>
          <NewFeedbackIcon src={NewFeedbackSVG} />
          <RequestFormHeader>Create New Feedback</RequestFormHeader>
          <FormFieldWrapper>
            <FormFieldLabel htmlFor="feedbackTitle">Feedback Title</FormFieldLabel>
            <FormFieldDescription>Add a short, descriptive headline</FormFieldDescription>
            <FeedbackTitleInput id="feedbackTitle" />
          </FormFieldWrapper>
          <FormFieldWrapper style={{ position: 'relative' }}>
            <FormFieldLabel htmlFor="category">Category</FormFieldLabel>
            <FormFieldDescription>Choose a category for your feedback</FormFieldDescription>
            <SelectedCategoryButtonInput onClick={openCategoryModal}>
              {capitalizeFirstLetter(selectedCategory)}
              <img src={categoryModalOpen ? BlueArrowUpSVG : BlueArrowDownSVG} alt={categoryModalOpen ? 'Arrow Up' : 'Arrow Down'} />
            </SelectedCategoryButtonInput>
            {categoryModalOpen && (
              <CategoryModal id="category">
                <FilteredOption label="Feature" value="feature" selectedValue={selectedCategory} onChange={handleCategoryChange} />
                <HorizontalRule />
                <FilteredOption label="Bug" value="bug" selectedValue={selectedCategory} onChange={handleCategoryChange} />
                <HorizontalRule />
                <FilteredOption label="Enhancement" value="enhancement" selectedValue={selectedCategory} onChange={handleCategoryChange} />
                <HorizontalRule />
                <FilteredOption label="UX" value="UX" selectedValue={selectedCategory} onChange={handleCategoryChange} />
                <HorizontalRule />
                <FilteredOption label="UI" value="UI" selectedValue={selectedCategory} onChange={handleCategoryChange} />
              </CategoryModal>
            )}
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormFieldLabel htmlFor="description">Feedback Detail</FormFieldLabel>
            <FormFieldDescription>Include any specific comments on what should be improved, added, etc.</FormFieldDescription>
            <FeedbackDetailInput id="description" />
          </FormFieldWrapper>
        </NewRequestForm>
      </RequestFormContainer>
    </>
  );
};

export default RequestForm;
