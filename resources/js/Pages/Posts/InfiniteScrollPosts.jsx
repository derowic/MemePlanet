import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next'; // Dodaj ten import
import Like from './Like';
import Heart from './Heart';
//import Comment from './Comment';
import CommentSection from './CommentSection';
import { userData } from "../GlobalData.js";


import '../styles.css'; // Importuj plik ze stylami
import '../i18n';


const InfiniteScrollPosts = () => {
  const { t,i18n } = useTranslation(); 
  const [posts, setPosts] = useState([]);
  const [favs, setFavs] = useState([]);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState({ user: null });
  

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...response.data.posts.data]);
      setPage(prevPage => prevPage + 1);
      setAuth({ user: response.data.user });
      setFavs(prevFavs => [...prevFavs, ...response.data.fav]);
      /*
      console.log("dane: ",response.data); // Wyświetla całą odpowiedź
      console.log("dane posta: ",response.data.posts); // Wyświetla zawartość tablicy posts
      console.log("role : ",response.data.user.name); 
      console.log("comments : ",response.data.posts.data[0].comments); 
      console.log("id usera", response.data.fav);
      */
      userData.name = response.data.user.name;
      
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = auth.user && auth.user.roles.includes('admin');
  //console.log("is admin: ",isAdmin);
  
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
          <button className="bg-[#EEA243] hover:bg-[#FFC465] text-black font-bold py-2 px-4 rounded-lg border border-[#EEA243]" onClick={changeLanguageToPolish}>Change Language to Polish</button>

          {t('adminOnly')}
          <button className="bg-[#EEA243] hover:bg-[#FFC465] text-black font-bold py-2 px-4 rounded-lg border border-[#EEA243]">Przycisk widziany tylko przez admina</button>
          
      </>
    )}
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
      
            <div className="w-full flex b-green0 overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                  
              <div className="m-auto">
                  <h3 className="text-left font-semibold mb-2">{post.title}</h3>
                  <div className="text-left text-xs mb-2">{post.user.name}</div>   
                  <div className="text-left text-xs mb-2">{post.text}</div>   
                  
                  
                  <div className="flex flex-col items-center justify-end mt-2">
                    <img src={"/images/"+post.pathToImage} alt="Opis obrazka" className='w-full h-full'></img>
                    <div className="flex">
                        <Like elementId={post.id} elementType={"post"} likes={post.likes} />
                        {/*<Heart postId={post.id} fav={true}/>*/}
                        <Heart postId={post.id} fav={favs.find(fav => fav == post.id) !== undefined} />
                    </div>   
                  </div> 

                  

                   
                  {<CommentSection postId={post.id}/>}
                 
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

