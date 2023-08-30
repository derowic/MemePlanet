import React from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css'; // Importuj styl komponentu

const DefaultComponent = () => {
  const commentData = [
    // Dane komentarzy (możesz dostosować te dane według swoich potrzeb)
    // ...
  ];

  const handleCommentSubmit = (comment) => {
    // Logika obsługi wysłania komentarza
    console.log('Wysłano komentarz:', comment);
  };

  const handleCommentDelete = (commentId) => {
    // Logika obsługi usunięcia komentarza
    console.log('Usunięto komentarz o ID:', commentId);
  };

  return (
    <div>
      <CommentSection
        currentUser={{
          // Dane aktualnie zalogowanego użytkownika
          // ...
        }}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/',
        }}
        commentData={commentData}
        onSubmitAction={handleCommentSubmit}
        onDeleteAction={handleCommentDelete}
        currentData={(data) => {
          // Logika obsługi aktualnych danych
          console.log('Aktualne dane:', data);
        }}
      />
    </div>
  );
};

export default DefaultComponent;
