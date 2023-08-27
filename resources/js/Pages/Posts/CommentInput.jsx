import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(comment);
    setComment('');
  };

  return (
    <div>
      <TextField
        label="Komentarz"
        multiline
        rows={4}
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Dodaj komentarz
      </Button>
    </div>
  );
};

export default CommentInput;
