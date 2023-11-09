import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

//STYLES
import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';

//TS
import { ProductRequest } from '../../data/data';

//COMPONENTS
import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';
import SingleReply from './SingleReply';
import ReplyForm from './ReplyForm';
import NewCommentForm from './NewCommentForm';
import BackButton from '../BackButton/BackButton';

export const ProductRequestNavbar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

export const ReturnButton = styled.button`
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

export const EditFeedbackButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.colors.blue};
`;

export const RequestDetailsAndCommentsContainer = styled(Container)`
  margin-bottom: 40px;
  margin-top: 10px;
`;

export const CommentsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const NewCommentContainer = styled(CommentsContainer)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const CommentNumber = styled.h3`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-bottom: 20px;
`;

export const UserImage = styled.img`
  border-radius: 50%;
  width: auto;
  height: 40px;
`;

export const UserName = styled.h4`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
`;

export const UserNickName = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
`;

export const ReplyButton = styled.button`
  color: ${(props) => props.theme.colors.blue};
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 13px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const CommentContent = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 24px;
`;

export const SingleCommentContainer = styled.div``;
export const SingleReplyContainer = styled.div<{ $isFirstChild: boolean }>`
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
    background-color: ${(props) => (props.$isFirstChild ? '#979797' : 'transparent')};
    opacity: 0.4;
  }
`;

export const ReplyTo = styled.h3`
  color: ${(props) => props.theme.colors.purple};
  font-size: 13px;
  display: inline-block;
  margin-right: 5px;
`;

export const TextAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const TextAreaCommentReply = styled.textarea`
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

export const CharsLeftParagraph = styled.p`
  font-size: 15px;
  color: ${(props) => props.theme.colors.gray};
`;

export const ErrorParagraph = styled.p`
  font-size: 13px;
  color: red;
  position: absolute;
  top: -21px;
  left: 0;
`;

interface RequestDetailsProps {
  requestList: ProductRequest[];
  onAddNewComment: (productRequestID: number, newCommentContent: string) => void;
  onAddReply: (productRequestID: number, commentID: number, newReplyContent: string, replyingToUsername: string) => void;
  calculateCommentNumbers: (request: any) => number;
  handleUpvote: (updatedProductRequest: ProductRequest) => void;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ requestList, onAddNewComment, onAddReply, calculateCommentNumbers, handleUpvote }) => {
  const { id } = useParams();
  let requestID: number | undefined;

  if (id !== undefined) {
    requestID = parseInt(id, 10);
  } else {
    console.log('requestID is undefined, need to work on bugs');
  }

  const request = requestList ? requestList.find((request) => request.id === requestID) : undefined;

  const onSubmitNewComment = (data: { comment: string }) => {
    if (request) {
      onAddNewComment(request.id, data.comment as string);
      data.comment = '';
    } else {
      console.error('Request is undefined.');
    }
  };

  const [activeReply, setActiveReply] = useState<{ commentId: number; replyTo: string; replyId: number | undefined } | null>(null);

  const handleCommentReply = (commentId: number, replyTo: string, replyId: number | undefined) => {
    setActiveReply({ commentId, replyTo, replyId });
  };

  const onSubmitReply = (data: { reply: string }) => {
    if (request && activeReply) {
      const { commentId, replyTo } = activeReply;
      onAddReply(request.id, commentId, data.reply, replyTo);
      setActiveReply(null);
    } else {
      console.error('Request or active reply is undefined');
    }
  };

  return (
    <>
      <>
        {request ? (
          <>
            <BackButton isEdit={true} requestID={request.id} />
            <RequestDetailsAndCommentsContainer>
              <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} handleUpvote={handleUpvote} />
              <CommentsContainer>
                <CommentNumber>{calculateCommentNumbers(request)} Comments</CommentNumber>
                {request.comments?.map((comment) => (
                  <SingleCommentContainer key={comment.id}>
                    <SingleReply comment={comment} handleCommentReply={handleCommentReply} isComment={true} />
                    {activeReply?.commentId === comment.id && activeReply?.replyId === 0 && <ReplyForm onSubmitReply={onSubmitReply} />}
                    {comment?.replies?.map((reply, index) => (
                      <SingleReplyContainer key={reply.id} $isFirstChild={index === 0}>
                        <SingleReply comment={comment} handleCommentReply={handleCommentReply} isComment={false} reply={reply} />
                        {activeReply?.commentId === comment.id && activeReply?.replyId === reply?.id && <ReplyForm onSubmitReply={onSubmitReply} />}
                      </SingleReplyContainer>
                    ))}
                  </SingleCommentContainer>
                ))}
              </CommentsContainer>
              <NewCommentForm onSubmitNewComment={onSubmitNewComment} />
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
