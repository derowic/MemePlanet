import React, { useState, useEffect } from 'react';
import Notification from '@/Components/Notification';
import FetchCategories from '@/Components/FetchCategories';
import axios from 'axios';
import Like from './Like';
import Heart from './Heart';
import CommentSection from './CommentSection';
import { userData } from "../GlobalData.js";
import { OnePostViewData } from "../GlobalData.js";


const ShowOnePost = ( postId ) => {

    console.log("post id one ",OnePostViewData.postId);
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

    const fetchPosts = async () => {
        try {
          const response = await axios.post('/getOnePost', {
                postId: postId
            });
          setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
          
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
    

    useEffect(() => {
    
        fetchPosts();
        fetchTags();
        
    }, []);


  

  return (
    
   
    posts.map((post, index) => 
    (
            <div className="m-auto overflow-hidden shadow-sm  p-4 mt-2 ">   
            
                <h3 className="text-left font-semibold mb-2"> {post.title}</h3>
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
                        {/*<Heart postId={post.id} fav={favs.find(fav => fav == post.id) !== undefined} />*/}
                    </div>
                    }
                    <CommentSection postId={post.id}/>
                </div>   
            </div>   
                
            
       
    ))
  );
};

export default ShowOnePost;
