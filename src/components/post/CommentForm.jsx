import { Button } from '@/components/ui/button/button';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CommentForm({ onComment }) {
  CommentForm.propTypes = {
    onComment: PropTypes.func.isRequired,
  };

  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;
    onComment(commentText);
    setCommentText('');
  };

  return (
    <div className="w-full ">
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-medium">
            Tambahkan komentar
          </label>
          <Textarea
            id="comment"
            placeholder="Tulis komentar Anda di sini..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[100px] shadow-md mt-2"
          />
        </div>
        <Button type="submit" disabled={!commentText.trim()}>
          Posting Komentar
        </Button>
      </form>
    </div>
  );
}
