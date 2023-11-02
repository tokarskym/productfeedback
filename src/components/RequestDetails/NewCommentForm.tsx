import { NewCommentContainer, CommentNumber, TextAreaContainer, TextAreaCommentReply, CharsLeftParagraph, ErrorParagraph } from './RequestDetails';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

interface NewCommentProps {
  onSubmitNewComment: (data: { comment: string }) => void;
}

const NewCommentForm: React.FC<NewCommentProps> = ({ onSubmitNewComment }) => {
  const schema = yup
    .object({
      comment: yup.string().required('Cant post empty comment.').min(10, 'Comment must be at least 10 characters.'),
    })
    .required();

  interface FormValues {
    comment: string;
  }

  const newCommentForm = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
    },
  });

  const {
    formState: { errors: commentErrors },
  } = newCommentForm;

  const newComment = newCommentForm.watch('comment') || '';
  const maxChars = 225;
  const charsLeft = maxChars - newComment.length;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    newCommentForm.setValue('comment', event.target.value, { shouldValidate: true });
  };

  const onSubmit = (data: FormValues) => {
    onSubmitNewComment(data);
    newCommentForm.reset({ comment: '' });
  };

  return (
    <form onSubmit={newCommentForm.handleSubmit(onSubmit)}>
      <NewCommentContainer>
        <CommentNumber>Add Comment</CommentNumber>
        <TextAreaContainer style={{ position: 'relative' }}>
          <TextAreaCommentReply {...newCommentForm.register('comment')} maxLength={maxChars} onChange={handleTextChange} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <CharsLeftParagraph>{charsLeft} characters left</CharsLeftParagraph>
            <PrimaryButton type="submit">Post Reply</PrimaryButton>
          </div>
          {commentErrors.comment && <ErrorParagraph>{commentErrors.comment.message}</ErrorParagraph>}
        </TextAreaContainer>
      </NewCommentContainer>
    </form>
  );
};

export default NewCommentForm;
