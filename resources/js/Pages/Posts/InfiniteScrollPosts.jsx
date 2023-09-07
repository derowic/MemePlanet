import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next'; 
import Like from './Like';
import Heart from './Heart';
import UploadPost from './UploadPost';
import Notification from '@/Components/Notification';
import CommentSection from './CommentSection';
import { userData } from "../GlobalData.js";

import '../styles.css'; 
import '../i18n';

const InfiniteScrollPosts = ({chosenCategory}) => {
  const { t,i18n } = useTranslation(); 
  const [posts, setPosts] = useState([]);
  const [favs, setFavs] = useState([]);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState({ user: null });
  const [key, setKey] = useState(0);
  const [tags, setTags] = useState([]);

  const [chosedCategory, setChosedCategory] = useState(0);
  

  const handleRefresh = () => {
    
    setPosts([]);
    setPage(0);
    setKey(0);
    fetchPosts();
    /*
    setPosts([]);
    setPage(1);
    setFavs([]);
    fetchPosts();
    */
  };

  useEffect(() => {
    // Tutaj możesz wywołać handleRefresh za każdym razem, gdy chosenCategory się zmieni
    console.log("infinte",chosenCategory);
    setChosedCategory(chosenCategory);
  }, [chosenCategory]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...response.data.posts.data]);
      setPage(prevPage => prevPage + 1);
      setAuth({ user: response.data.user });
      setFavs(prevFavs => [...prevFavs, ...response.data.fav]);
      userData.name = response.data.user.name;
      userData.id = response.data.user.id;
    } catch (error) {
      Notification(error.response.data.msg);
      console.error("InfiniteScrollPosts -> fetchPosts error: ",error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.post(`/getTags`);
      setTags(prevTags => [...prevTags, ...response.data.tags]);
    } catch (error) {
      Notification(error.response.data.msg);
      console.error("InfiniteScrollPosts -> fetchTags error: ",error);
    }
  };

  const isAdmin = auth.user && auth.user.roles.includes('admin');

  
  const changeLanguageToPolish = () => 
  {
    i18n.changeLanguage('pl');
    
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

 

return (
  
  <div >
    <div className='bg-[#333333] rounded-lg p-4'>
      <button className='bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]' onClick={handleRefresh}>Odśwież</button>
      <UploadPost fetchPosts={handleRefresh}/>
    </div>
    <InfiniteScroll  dataLength={posts.length} next={fetchPosts} hasMore={true} loader={<p>{t('loading')}</p>} endMessage={<p>{t('noMorePosts')}</p>} >
        
    <div className='bg-[#333333] rounded-lg p-4 mt-2'>
    {isAdmin && 
    (
      <button className="bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]">Przycisk widziany tylko przez admina</button>
    )}
    <div>
      <button className="mt-2 bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]" onClick={changeLanguageToPolish}>Change Language to Polish</button>
    </div>
    {t('adminOnly')}
          
    </div>    
    

   
      {
        posts.map((post, index) => 
          (
            <>
                     
                            
            
             
              { chosedCategory != 0 ?
                
                <div key={index}>
                  { chosedCategory == post.category.id && 
                      
                      <div className="w-full flex bg-[#333333]  overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                            
                        <div className="m-auto">
                            <h3 className="text-left font-semibold mb-2">{post.id} {post.title}</h3>
                            <div className="text-left text-xs mb-2">{post.user.name}</div>   
                            <div className="text-left text-xs ">{post.category.text}</div>  
                            {post.tags && 
                              <div className="text-left text-xs  ">
                                {post.tags.split(' ').map(tagId => {
                                  const tag = tags.find(tag => tag.id === parseInt(tagId));
                                  return tag ? (
                                    <button key={tag.id} className="mr-2 px-1 py-1 sm:rounded-lg p-4 mt-4 border-2 border-[#bbb]">
                                      {tag.text}
                                    </button>
                                  ) 
                                  : 
                                  null;
                                })}
                              </div>
                            }
                            <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">{post.text}</div>   
                           
                            <div className="flex flex-col items-center justify-end mt-2">
                              <a href={route('OnePostView')} active={route().current('OnePostView')}>
                                <button>
                                  <img src={"/images/"+post.path_to_image} alt="Opis obrazka"  className='w-full h-full'></img>
                                </button>
                              </a>
                              {userData.id != post.user.id &&
                                <div className="flex">
                                  <Like elementId={post.id} elementType={"post"} likes={post.likes} />
                                  <Heart postId={post.id} fav={favs.find(fav => fav == post.id) !== undefined} />
                                </div>
                              }
                              </div>   
                            </div> 

                            {<CommentSectionRendering postId={post.id}/>}
                          
                        </div>
                      
                    
                  }
                </div>
                :
                <div key={index}>
                  
                  
                    <div className="w-full flex bg-[#333333]  overflow-hidden shadow-sm sm:rounded-lg p-4 mt-4 border-b-4 border-t-4 border-[#A7C957]">
                    
                      <div className="m-auto">
                          <h3 className="text-left font-semibold mb-2">{post.id} {post.title}</h3>
                          <div className="text-left text-xs mb-2">{post.user.name}</div>   
                          <div className="text-left text-xs ">{post.category.text}</div>  
                          {post.tags && 
                            <div className="text-left text-xs  ">
                              {post.tags.split(' ').map(tagId => {
                                const tag = tags.find(tag => tag.id === parseInt(tagId));
                                return tag ? (
                                  <button key={tag.id} className="mr-2 px-1 py-1 sm:rounded-lg p-4 mt-4 border-2 border-[#bbb]">
                                    {tag.text}
                                  </button>
                                ) 
                                : 
                                null;
                              })}
                            </div>
                          }
                          <div className="overflow-wrap: normal word-break: normal text-left text-xs mb-2 mt-2">{post.text}</div>   

                          <div className="flex flex-col items-center justify-end mt-2">
                            <a href={route('OnePostView')} active={route().current('OnePostView')}>
                              <button>
                                <img src={"/images/"+post.path_to_image} alt="Opis obrazka"  className='w-full h-full'></img>
                              </button>
                            </a>
                            <div className="flex">
                              {userData.id != post.user.id &&
                                <div className="flex">
                                  <Like elementId={post.id} elementType={"post"} likes={post.likes} />
                                  <Heart postId={post.id} fav={favs.find(fav => fav == post.id) !== undefined} />
                                </div>
                              }
                            </div>   
                          </div> 

                          {<CommentSection postId={post.id}/>}
                        
                      </div>
                    </div>
                  
                </div>
              }
            </>
          )
        )
      }
      
    </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollPosts;

