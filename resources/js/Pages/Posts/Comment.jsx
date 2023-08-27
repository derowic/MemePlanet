import React from 'react';
import CommentInput from './CommentInput';

const sendComment = async (postId,authorId,text,parentId) => {
    console.log("id posta ",postId," parent id: ",parentId );
    /*try {
        const response = await axios.post('/api/like', {
            idUser: authorId,
            idPost: postId,
            idParentComment: parentId,
            text:text
        });
        console.log('Dane zostały przesłane', response.data);
        setCount(response.data.like);
        // Obsłuż odpowiedź serwera
    } catch (error) {
        console.error('Błąd przesyłania danych:', error);
        // Obsłuż błędy
    }
    */
};

//const usedComments = [];
//console.log("inicjalizajc tablicy komentarzy  ");

const Comment = ({usedComments, comment, allComments, post, parentId }) => {
 
    const getRepliesForComment = (comments, parentId) => {

        return comments.filter(comment => comment.idParentComment === parentId);
    };

    const replies = getRepliesForComment(allComments, comment.id);

    function checkId(id)
    {
        for (var i = 0; i < usedComments.length; i++) {
            //console.log("id ", id, "uzyte id komów ", usedComments[i]);
            //console.log("uzyte id komów ", usedComments.length);
            if (usedComments[i] === id) {
            return true;
            }
        }
        return false; // Zwracaj false po zakończeniu pętli
    }

    if (checkId(comment.id)) {
        //tutaj nie pokazuje gdy ponownie renderuje chodzi o to ze sa zapisne i przy ponownym uzyciu jest 
        //traktowane jak juz wyswietlone
        return null; // Pomijaj renderowanie
    }
    
    

    usedComments.push(comment.id);

    const handleSubmitComment = (comment) => {
        // Tutaj możesz obsłużyć dodawanie komentarza, np. wysłać go na serwer
        console.log('Dodano komentarz:', comment);
      };

    return (
        <div className="comment mt-5">

            {comment.reply_to ? 
                <div className="ml-5"> reply to: {comment.reply_to.user.name} user: {comment.user.name}  komentarz: {comment.text} <button onClick={() => sendComment(post,"","",parentId)}>rpeply</button> </div> 
                
                : <div> user: {comment.user.name}  komentarz: {comment.text}  <button onClick={() => sendComment(post,"","",parentId)}>rpeply</button></div>}
            
            {/*<CommentInput onSubmit={handleSubmitComment} />*/}
            {replies.length > 0 && (
                
            <div className="replies">
                {replies.map(reply => (
                <Comment key={reply.id} usedComments={usedComments}  comment={reply} allComments={allComments} post={post} parentId={comment.id}/>
                
                ))}
            </div>
            )}
            
        </div>
    );

};

export default Comment;