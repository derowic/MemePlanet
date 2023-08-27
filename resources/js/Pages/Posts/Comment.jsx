const usedComments = [];

 
const getRepliesForComment = (comments, parentId) => {

return comments.filter(comment => comment.idParentComment === parentId);
};

function checkId(id)
{
for (var i = 0; i < usedComments.length; i++) {
    console.log("id ", id, "uzyte id komów ", usedComments[i]);
    console.log("uzyte id komów ", usedComments.length);
    if (usedComments[i] === id) {
    return true;
    }
}
return false; // Zwracaj false po zakończeniu pętli
}

const Comment = ({ comment, allComments }) => {
const replies = getRepliesForComment(allComments, comment.id);


if (checkId(comment.id)) {
    
    return null; // Pomijaj renderowanie
}
console.log("komentarz id ",comment.id);

usedComments.push(comment.id);

return (
    <div className="comment mt-5">

        {comment.reply_to ? <p> reply to: {comment.reply_to.name} user: {comment.user.name}  komentarz: {comment.text} </p> : <p> user: {comment.user.name}  komentarz: {comment.text} </p>}
        <button>rpeply</button>
        {replies.length > 0 && (
            
        <div className="replies">
            {replies.map(reply => (
            <Comment key={reply.id} comment={reply} allComments={allComments} />
            
            ))}
        </div>
        )}
        
    </div>
);

};

export default Comment;