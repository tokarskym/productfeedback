//TS
import { UserComment, UserReply } from '../../data/data';
//STYLES
import { CommentHeader, UserInfoContainer, UserImage, UserName, UserNickName, ReplyButton, CommentContent, ReplyTo } from './RequestDetails';

interface SingleReplyProps {
  comment: UserComment;
  handleCommentReply: (commentId: number, replyTo: string, replyId: number | undefined) => void;
  isComment: boolean;
  reply?: UserReply;
}

const SingleReply: React.FC<SingleReplyProps> = ({ comment, handleCommentReply, isComment, reply }) => {
  return (
    <>
      {isComment ? (
        comment ? (
          <>
            <CommentHeader>
              <UserInfoContainer>
                <UserImage src={comment.user.image} />
                <div style={{ height: '40px' }}>
                  <UserName>{comment.user.name}</UserName>
                  <UserNickName>@{comment.user.username}</UserNickName>
                </div>
              </UserInfoContainer>
              <ReplyButton onClick={() => handleCommentReply(comment.id, comment.user.username, 0)}>Reply</ReplyButton>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
          </>
        ) : null
      ) : reply && comment ? (
        <>
          <CommentHeader>
            <UserInfoContainer>
              <UserImage src={reply.user.image} />
              <div style={{ height: '40px' }}>
                <UserName>{reply.user.name}</UserName>
                <UserNickName>@{reply.user.username}</UserNickName>
              </div>
            </UserInfoContainer>
            <ReplyButton onClick={() => handleCommentReply(comment.id, reply.user.username, reply.id)}>Reply</ReplyButton>
          </CommentHeader>
          <div>
            <ReplyTo>@{reply.replyingTo}</ReplyTo>
            <CommentContent>{reply.content}</CommentContent>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SingleReply;
