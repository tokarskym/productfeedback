import styled from 'styled-components';
import { ProductRequest } from '../../data/data';
import ReturnButtonSVG from '../../images/shared//icon-arrow-left.svg';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';
import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ProductRequestNavbar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

const ReturnButton = styled.button`
  font-weight: 700;
  color: #647196;
  height: 52px;
  width: auto;
  background-color: transparent;
  border: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EditFeedbackButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.colors.blue};
`;

const RequestDetailsAndCommentsContainer = styled(Container)`
  margin-bottom: 40px;
  margin-top: 10px;
`;

const CommentsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const NewCommentContainer = styled(CommentsContainer)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const CommentNumber = styled.h3`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-bottom: 20px;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: auto;
  height: 40px;
`;

const UserName = styled.h4`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
`;

const UserNickName = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
`;

const ReplyButton = styled.button`
  color: ${(props) => props.theme.colors.blue};
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 13px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CommentContent = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 24px;
`;
const SingleCommentContainer = styled.div``;
const SingleReplyContainer = styled.div<{ isFirstChild: boolean }>`
  margin-left: 23px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -23px; /* Przesunięcie względem lewej krawędzi rodzica o szerokość marginesu */
    top: 0;
    bottom: 0;
    width: 1px;
    height: 110%;
    background-color: ${(props) => (props.isFirstChild ? '#979797' : 'transparent')};
    opacity: 0.4;
  }
`;

const ReplyTo = styled.h3`
  color: ${(props) => props.theme.colors.purple};
  font-size: 13px;
  display: inline-block;
  margin-right: 5px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
const TextAreaCommentReply = styled.textarea`
  padding: 20px;
  font-size: 13px;
  font-weight: 400;
  color: #3a4374;
  background-color: #f7f8fd;
  font-family: inherit;
  border-radius: 5px;
  width: 100%;
  height: auto;
  resize: none;
  min-height: 50px;
  border: 0.5px solid gray;
  margin-bottom: 10px;

  &:focus {
    outline: 0.5px solid #4661e6;
  }
`;

const CharsLeftParagraph = styled.p`
  font-size: 15px;
  color: ${(props) => props.theme.colors.gray};
`;

const ErrorParagraph = styled.p`
  font-size: 13px;
  color: red;
  position: absolute;
  top: -21px;
  left: 0;
`;

interface RequestDetailsProps {
  requestList: ProductRequest[];
  onAddNewComment: (productRequestID: number, newCommentContent: string) => void;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ requestList, onAddNewComment }) => {
  const { id } = useParams();
  let requestID: number | undefined;

  if (id !== undefined) {
    requestID = parseInt(id, 10);
  } else {
    console.log('requestID is undefined, need to work on bugs');
  }

  const request = requestList ? requestList.find((request) => request.id === requestID) : undefined;

  const schema = yup
    .object({
      comment: yup.string().required('Cant post empty comment.').min(10, 'Comment must be at least 10 characters.'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
    },
  });

  const newComment = watch('comment') || '';
  const maxChars = 225;
  const charsLeft = maxChars - newComment.length;

  const onSubmit = (data: { comment: string }) => {
    if (request) {
      onAddNewComment(request.id, data.comment as string);
      setValue('comment', '');
    } else {
      console.error('Request is undefined.');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('comment', event.target.value, { shouldValidate: true });
  };

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  type ReplyBoxState = {
    parentID: number | null;
    childIndex?: number | null;
    type: 'comment' | 'reply' | null;
  };

  const [activeReplyBox, setActiveReplyBox] = useState<ReplyBoxState>({ parentID: null, childIndex: null, type: null });

  const handleReplyClick = (parentID: number | null, childIndex: number | null = null, type: 'comment' | 'reply' | null) => {
    setActiveReplyBox({ parentID, childIndex, type });
  };

  return (
    <>
      <>
        {request ? (
          <>
            <ProductRequestNavbar>
              <ReturnButton onClick={handleReturn}>
                <img src={ReturnButtonSVG} alt="Arrow Left / Go Back" />
                Go Back
              </ReturnButton>
              <EditFeedbackButton>Edit Feedback</EditFeedbackButton>
            </ProductRequestNavbar>
            <RequestDetailsAndCommentsContainer>
              <RequestSingleElement request={request} />
              <CommentsContainer>
                <CommentNumber>{request.comments?.length ?? 0} Comments</CommentNumber>
                {request.comments?.map((comment) => (
                  <SingleCommentContainer key={comment.id}>
                    <CommentHeader>
                      <UserInfoContainer>
                        <UserImage src={comment.user.image} />
                        <div style={{ height: '40px' }}>
                          <UserName>{comment.user.name}</UserName>
                          <UserNickName>@{comment.user.username}</UserNickName>
                        </div>
                      </UserInfoContainer>
                      <ReplyButton onClick={() => handleReplyClick(comment.id, null, 'comment')}>Reply</ReplyButton>
                    </CommentHeader>
                    <CommentContent>{comment.content}</CommentContent>
                    {activeReplyBox.parentID === comment.id && activeReplyBox.type === 'comment' && (
                      <TextAreaContainer>
                        <TextAreaCommentReply />
                        <PrimaryButton> Post Reply</PrimaryButton>
                      </TextAreaContainer>
                    )}
                    {comment?.replies?.map((reply, index) => (
                      <SingleReplyContainer key={`${comment.id}-${reply.user.username}-${index}`} isFirstChild={index === 0}>
                        <CommentHeader>
                          <UserInfoContainer>
                            <UserImage src={reply.user.image} />
                            <div style={{ height: '40px' }}>
                              <UserName>{reply.user.name}</UserName>
                              <UserNickName>@{reply.user.username}</UserNickName>
                            </div>
                          </UserInfoContainer>
                          <ReplyButton onClick={() => handleReplyClick(comment.id, index, 'reply')}>Reply</ReplyButton>
                        </CommentHeader>
                        <CommentContent>
                          <ReplyTo>@{reply.replyingTo}</ReplyTo>
                          {reply.content}
                        </CommentContent>
                        {activeReplyBox.parentID === comment.id && activeReplyBox.childIndex === index && activeReplyBox.type === 'reply' && (
                          <TextAreaContainer>
                            <TextAreaCommentReply />
                            <PrimaryButton> Post Reply</PrimaryButton>
                          </TextAreaContainer>
                        )}
                      </SingleReplyContainer>
                    ))}
                  </SingleCommentContainer>
                ))}
              </CommentsContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
                <NewCommentContainer>
                  <CommentNumber>Add Comment</CommentNumber>
                  <TextAreaContainer style={{ position: 'relative' }}>
                    <TextAreaCommentReply {...register('comment')} maxLength={maxChars} onChange={handleTextChange} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <CharsLeftParagraph>{charsLeft} characters left</CharsLeftParagraph>
                      <PrimaryButton type="submit"> Post Reply</PrimaryButton>
                    </div>
                    {errors.comment && <ErrorParagraph>{errors.comment.message}</ErrorParagraph>}
                  </TextAreaContainer>
                </NewCommentContainer>
              </form>
            </RequestDetailsAndCommentsContainer>
          </>
        ) : (
          <p>Request not found or ID is undefined.</p>
        )}
      </>
    </>
  );
};

export default RequestDetails;
