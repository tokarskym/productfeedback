import { TextAreaContainer, TextAreaCommentReply, ErrorParagraph } from './RequestDetails';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

interface ReplyFormProps {
  onSubmitReply: (data: { reply: string }) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmitReply }) => {
  interface ReplyValues {
    reply: string;
  }

  const replySchema = yup
    .object({
      reply: yup.string().required('Cant post empty comment.').min(10, 'Comment must be at least 10 characters.'),
    })
    .required();

  const newReplyForm = useForm<ReplyValues>({
    resolver: yupResolver(replySchema),
    defaultValues: {
      reply: '',
    },
  });

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    newReplyForm.setValue('reply', event.target.value, { shouldValidate: true });
  };

  const {
    formState: { errors: replyErrors },
  } = newReplyForm;

  return (
    <>
      <form onSubmit={newReplyForm.handleSubmit(onSubmitReply)}>
        <TextAreaContainer style={{ position: 'relative' }}>
          <TextAreaCommentReply {...newReplyForm.register('reply')} onChange={handleReplyChange} />
          <PrimaryButton type="submit"> Post Reply</PrimaryButton>
          {replyErrors.reply && <ErrorParagraph>{replyErrors.reply.message}</ErrorParagraph>}
        </TextAreaContainer>
      </form>
    </>
  );
};

export default ReplyForm;
