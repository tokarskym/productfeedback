import styled from 'styled-components';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

//STYLES
import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';
import { ErrorParagraph } from '../RequestDetails/RequestDetails';
//COMPONENTS
import BackButton from '../BackButton/BackButton';
import CategorySelector from './CategorySelector';
import StatusSelector from './StatusSelector';

import NewFeedbackSVG from '../../images/shared/icon-new-feedback.svg';
import BlueArrowUpSVG from '../../images/shared/icon-arrow-up-blue.svg';
import BlueArrowDownSVG from '../../images/shared/icon-arrow-down-blue.svg';

import { capitalizeFirstLetter } from '../../Utils/Functions';
//TS
import { ProductRequest } from '../../data/data';

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
  max-width: 890px;
  margin: 0 auto;
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

export const FormFieldLabel = styled.label`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.18px;
`;

export const FormFieldDescription = styled.p`
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

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

export const SelectedCategoryButtonInput = styled.button<{ $isHighlighted: boolean }>`
  width: 100%;
  height: 48px;
  background-color: #f7f8fd;
  font-size: 13px;
  color: #3a4374;
  border: ${(props) => (props.$isHighlighted ? '0.5px solid #4661e6' : 'none')};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  &:focus {
    outline: 0.5px solid #4661e6;
  }
`;

export const CategoryModal = styled.div`
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

const ButtonsDiv = styled.div<{ $isDelete: boolean }>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: ${(props) => (props.$isDelete ? 'space-between' : 'flex-end')};
  align-items: center;
`;

const CancelButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-right: 15px;
`;

const DeleteButton = styled(PrimaryButton)`
  background-color: #d73737;
  display: flex;
`;

export interface FormValues {
  title: string;
  category: string;
  description: string;
  id: number;
  status: string;
  upvotes: number;
}

interface RequestFormProps {
  handleAddProductRequest: (newProductRequest: ProductRequest) => void;
  mode: string;
  requestList: ProductRequest[];
  handleDeleteProductRequest: (id: number) => void;
  handleEditProductRequest: (data: FormValues, updatedProductRequest: ProductRequest) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ handleAddProductRequest, mode, requestList, handleDeleteProductRequest, handleEditProductRequest }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productID = Number(id);

  const formValidation = yup
    .object({
      title: yup.string().required('Title is required'),
      category: yup.string().required('Category is required'),
      description: yup.string().required('Description is required'),
      id: yup.number().required(),
      status: yup.string().required(),
      upvotes: yup.number().required(),
    })
    .required();

  const requestToEdit: ProductRequest | undefined = requestList ? requestList.find((request) => request.id === productID) : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formValidation),
    defaultValues: {
      title: mode === 'edit' ? requestToEdit?.title : '',
      category: mode === 'edit' ? requestToEdit?.category : 'Feature',
      description: mode === 'edit' ? requestToEdit?.description : '',
      id: productID,
      upvotes: mode === 'edit' ? requestToEdit?.upvotes : 0,
      status: mode === 'edit' ? requestToEdit?.status : 'suggestion',
    },
  });

  //
  const [categoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [statusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);

  const openCategoryModal = (event: any) => {
    setIsCategoryModalOpen(!categoryModalOpen);
    setIsStatusModalOpen(false);
  };

  const openStatusModal = (event: any) => {
    setIsStatusModalOpen(!statusModalOpen);
    setIsCategoryModalOpen(false);
  };

  const handleCategoryChange = (value: string) => {
    setIsCategoryModalOpen(!categoryModalOpen);
    setSelectMenuHighlighted(false);
    setValue('category', value);
  };

  const handleStatusChange = (value: string) => {
    setIsStatusModalOpen(!statusModalOpen);
    setSelectMenuHighlighted(false);
    setValue('status', value);
  };
  const [selectMenuHighlighted, setSelectMenuHighlighted] = useState(false);

  const fakeLabelFunctionality = () => {
    setSelectMenuHighlighted(!selectMenuHighlighted);
  };

  // SUBMITING

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedRequest = requestToEdit;
    if (mode === 'edit' && updatedRequest) {
      handleEditProductRequest(updatedRequest, data);
      console.log('udaje się editing');
    } else {
      handleAddProductRequest(data);
      console.log('udaje sie adding');
    }
    navigate(-1);
  };

  const onDeleteProductRequest = (id: number) => {
    handleDeleteProductRequest(id);
    navigate(-2);
  };

  const selectedCategory = watch('category');
  const selectedStatus: string = watch('status');

  return (
    <>
      <BackButton isEdit={false} />
      <RequestFormContainer>
        <NewRequestForm>
          <NewFeedbackIcon src={NewFeedbackSVG} />
          <RequestFormHeader>{mode === 'edit' ? `Editing '${requestToEdit?.title}'` : 'Create New Feedback'} </RequestFormHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFieldWrapper style={{ position: 'relative' }}>
              <FormFieldLabel htmlFor="feedbackTitle">Feedback Title</FormFieldLabel>
              <FormFieldDescription>Add a short, descriptive headline</FormFieldDescription>
              <FeedbackTitleInput id="feedbackTitle" {...register('title')} disabled={categoryModalOpen} />
              {errors.title && <ErrorParagraph style={{ top: '36px' }}>{errors.title.message}</ErrorParagraph>}
            </FormFieldWrapper>
            <FormFieldWrapper style={{ position: 'relative' }}>
              <FormFieldLabel onClick={fakeLabelFunctionality}>Category</FormFieldLabel>
              <FormFieldDescription>Choose a category for your feedback</FormFieldDescription>
              <SelectedCategoryButtonInput onClick={openCategoryModal} $isHighlighted={selectMenuHighlighted} type="button">
                {capitalizeFirstLetter(selectedCategory)}
                <img src={categoryModalOpen ? BlueArrowUpSVG : BlueArrowDownSVG} alt={categoryModalOpen ? 'Arrow Up' : 'Arrow Down'} />
              </SelectedCategoryButtonInput>
              {categoryModalOpen && <CategorySelector selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} register={register} />}
            </FormFieldWrapper>
            {mode === 'edit' && (
              <StatusSelector
                selectMenuHighlighted={selectMenuHighlighted}
                selectedCategory={selectedCategory}
                fakeLabelFunctionality={fakeLabelFunctionality}
                openStatusModal={openStatusModal}
                selectedStatus={selectedStatus}
                statusModalOpen={statusModalOpen}
                handleStatusChange={handleStatusChange}
                register={register}
              />
            )}
            <FormFieldWrapper style={{ position: 'relative' }}>
              <FormFieldLabel htmlFor="description">Feedback Detail</FormFieldLabel>
              <FormFieldDescription>Include any specific comments on what should be improved, added.</FormFieldDescription>
              <FeedbackDetailInput id="description" {...register('description')} disabled={categoryModalOpen} />
              {errors.description && <ErrorParagraph style={{ top: '38px' }}>{errors.description.message}</ErrorParagraph>}
            </FormFieldWrapper>
            <ButtonsDiv $isDelete={mode === 'edit'}>
              {mode === 'edit' && (
                <div>
                  <DeleteButton onClick={() => onDeleteProductRequest(productID)} type="button">
                    Delete
                  </DeleteButton>
                </div>
              )}
              <div>
                <CancelButton onClick={() => navigate(-1)} type="button">
                  Cancel
                </CancelButton>
                <PrimaryButton type="submit">{mode === 'edit' ? 'Save Changes' : 'Add Feedback'}</PrimaryButton>
              </div>
            </ButtonsDiv>
          </form>
        </NewRequestForm>
      </RequestFormContainer>
    </>
  );
};

export default RequestForm;
