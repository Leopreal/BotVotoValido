import { CommentSectionContainer } from './style';
import  { useState } from 'react';
const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return; // Evita comentários vazios
    setComments([...comments, commentText]);
    setCommentText(''); // Limpa o campo de entrada
  };

  return (
    <CommentSectionContainer>
      <h2>Comentários</h2>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Escreva seu comentário..."
          required
        />
        <button type="submit">Comentar</button>
      </form>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
    </CommentSectionContainer>
  );
};

export default CommentSection;
