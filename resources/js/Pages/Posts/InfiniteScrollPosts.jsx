import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next'; // Dodaj ten import
import Button from './Button';
import Comment from './Comment';
import CommentSection from './CommentSection';
import '../styles.css'; // Importuj plik ze stylami
import '../i18n';


const InfiniteScrollPosts = () => {
  const { t,i18n } = useTranslation(); 
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState({ user: null });
  

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...response.data.posts.data]);
      setPage(prevPage => prevPage + 1);
      setAuth({ user: response.data.user })
      console.log("dane: ",response.data); // Wyświetla całą odpowiedź
      console.log("dane posta: ",response.data.posts); // Wyświetla zawartość tablicy posts
      console.log("role : ",response.data.user.name); 
      console.log("comments : ",response.data.posts.data[0].comments); 
      console.log("id usera", response.data.user.id);
      
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = auth.user && auth.user.roles.includes('admin');
  console.log("is admin: ",isAdmin);
  
  const changeLanguageToPolish = () => {
      i18n.changeLanguage('pl');
    };

  useEffect(() => {
    fetchPosts();
  }, []);

return (
  <div>
    <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={true} loader={<p>{t('loading')}</p>} endMessage={<p>{t('noMorePosts')}</p>} >
        
    {isAdmin && 
    (
      <>
          <button className="btn normal-btn" onClick={changeLanguageToPolish}>Change Language to Polish</button>

          {t('adminOnly')}
          <button className="btn add-btn">Przycisk widziany tylko przez admina</button>
          
      </>
    )}
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
      
            <div className="flex bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4">
              {post.id }    
              <div className="m-auto">
                  <h3 className="text-left font-semibold mb-2">{post.title}</h3>
                  <div className="text-left text-xs mb-2">{post.user.name}</div>   
                  <div className="text-left text-xs mb-2">{post.text}</div>   
                  <div className="  ">
                      <div className="flex flex-col items-center justify-end mt-2">
                            <img src="/images/2.jpg" alt="Opis obrazka" ></img>
                          <Button />
                      </div> 
                  </div>
                  <CommentSection postId={post.id}/>
            
                  
                  {/*
                    post.comments.map(comment => (
                        <div key={comment.id}>user: {comment.user.name} komentarz: {comment.text} jeszcze potrzeba wyświetlać zagnieżdzone komentarze</div>
                    ))
                    
                  */}
                  {/*
                  {post.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} allComments={post.comments} post={post} userId={auth.user.id} />
                  ))}
                  */}
              </div>
            </div>
          </li>
          )
        )
      }
    </ul>    
    </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollPosts;

