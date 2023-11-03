import styled from 'styled-components';
import BackButton from '../BackButton/BackButton';

import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';
import NewFeedbackSVG from '../../images/shared/icon-new-feedback.svg';
import BlueArrowUpSVG from '../../images/shared/icon-arrow-up-blue.svg';
import BlueArrowDownSVG from '../../images/shared/icon-arrow-down-blue.svg';
import FilteredOption from '../Header/FilteredOption';

import { useState } from 'react';

import { HorizontalRule } from '../Header/HeaderStyles';
import { capitalizeFirstLetter } from '../../Utils/Functions';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductRequest } from '../../data/data';

import { useParams, useNavigate } from 'react-router-dom';

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
    &:focus {
      outline: 0.5px solid #4661e6;
   
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const SelectedCategoryButtonInput = styled.button<{ isHighlighted: boolean }>`
  width: 100%;
  height: 48px;
  background-color: #f7f8fd;
  font-size: 13px;
  color: #3a4374;
  border: ${(props) => (props.isHighlighted ? '0.5px solid #4661e6' : 'none')};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  &:focus {
    outline: 0.5px solid #4661e6;
  }
`;

const CategoryModal = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(72, 84, 159, 0.25) 0px 10px 20px 0px;
  bottom: -230px;
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
    outline: 0.5px solid #4661e6;
  }
`;

const ButtonsDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

const CancelButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.colors.darkerDarkBlue};
`;

export interface FormValues {
  title: string;
  category: string;
  description: string;
  id?: number | null;
  status?: string | null;
  upvotes?: number | null;
}

interface RequestFormProps {
  handleAddProductRequest: (newProductRequest: ProductRequest) => void;
}
const RequestForm: React.FC<RequestFormProps> = ({ handleAddProductRequest }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productID = Number(id);

  const formValidation = yup
    .object({
      title: yup.string().required('Title is required'),
      category: yup.string().required('Category is required'),
      description: yup.string().required('Description is required'),
      id: yup.number().nullable(),
      status: yup.string().nullable(),
      upvotes: yup.number().nullable(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formValidation),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      id: productID,
      upvotes: 0,
      status: 'suggestion',
    },
  });

  // CREATING USE STATE FOR HOLDING SELECTED OPTION AND SHOWING IT IN THE CATEGORY BUTTON
  const [selectedCategory, setSelectedCategory] = useState<string>('Feature');
  const [categoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const openCategoryModal = (event: any) => {
    setIsCategoryModalOpen(!categoryModalOpen);
    console.log('works!!');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIsCategoryModalOpen(!categoryModalOpen);
    setSelectMenuHighlighted(false);
    setValue('category', value);
  };

  const [selectMenuHighlighted, setSelectMenuHighlighted] = useState(false);

  const fakeLabelFunctionality = () => {
    setSelectMenuHighlighted(!selectMenuHighlighted);
  };
  // SUBMITING

  const onSubmit = (data: any) => {
    handleAddProductRequest(data);
    navigate(-1);
  };

  return (
    <>
      <BackButton isEdit={false} />
      <RequestFormContainer>
        <NewRequestForm>
          <NewFeedbackIcon src={NewFeedbackSVG} />
          <RequestFormHeader>Create New Feedback</RequestFormHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFieldWrapper>
              <FormFieldLabel htmlFor="feedbackTitle">Feedback Title</FormFieldLabel>
              <FormFieldDescription>Add a short, descriptive headline</FormFieldDescription>
              <FeedbackTitleInput id="feedbackTitle" {...register('title')} disabled={categoryModalOpen} />
            </FormFieldWrapper>
            <FormFieldWrapper style={{ position: 'relative' }}>
              <FormFieldLabel onClick={fakeLabelFunctionality}>Category</FormFieldLabel>
              <FormFieldDescription>Choose a category for your feedback</FormFieldDescription>
              <SelectedCategoryButtonInput onClick={openCategoryModal} isHighlighted={selectMenuHighlighted}>
                {capitalizeFirstLetter(selectedCategory)}
                <img src={categoryModalOpen ? BlueArrowUpSVG : BlueArrowDownSVG} alt={categoryModalOpen ? 'Arrow Up' : 'Arrow Down'} />
              </SelectedCategoryButtonInput>
              {categoryModalOpen && (
                <CategoryModal id="category">
                  <FilteredOption label="Feature" value="feature" selectedValue={selectedCategory} onChange={handleCategoryChange} register={register} />
                  <HorizontalRule />
                  <FilteredOption label="Bug" value="bug" selectedValue={selectedCategory} onChange={handleCategoryChange} register={register} />
                  <HorizontalRule />
                  <FilteredOption label="Enhancement" value="enhancement" selectedValue={selectedCategory} onChange={handleCategoryChange} register={register} />
                  <HorizontalRule />
                  <FilteredOption label="UX" value="UX" selectedValue={selectedCategory} onChange={handleCategoryChange} register={register} />
                  <HorizontalRule />
                  <FilteredOption label="UI" value="UI" selectedValue={selectedCategory} onChange={handleCategoryChange} register={register} />
                </CategoryModal>
              )}
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormFieldLabel htmlFor="description">Feedback Detail</FormFieldLabel>
              <FormFieldDescription>Include any specific comments on what should be improved, added, etc.</FormFieldDescription>
              <FeedbackDetailInput id="description" {...register('description')} disabled={categoryModalOpen} />
            </FormFieldWrapper>
            <ButtonsDiv>
              <CancelButton>Cancel</CancelButton>
              <PrimaryButton type="submit">Add Feedback</PrimaryButton>
            </ButtonsDiv>
          </form>
        </NewRequestForm>
      </RequestFormContainer>
    </>
  );
};

export default RequestForm;
