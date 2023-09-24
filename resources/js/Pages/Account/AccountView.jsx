import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer } from '@mui/material';
import Comment from './Comment';
import CommentInput from './CommentInput';
import SendComment from './SendComment';
import Notification from '@/Components/Notification';
import { userData } from "../GlobalData.js";
import InfiniteScrollPosts from './InfiniteScrollPosts';
import CategoryList from './CategoryList';


function AccountView({ categoryId }) {
    const [isOpenPosts, setIsOpenPosts] = useState(true);


    const togglePanelPosts = () => {
        setIsOpenPosts(!isOpenPosts);

    };



    useEffect(() => {

    }, []);

    return (
        <div>
            <Button onClick={togglePanelPosts}>
                <div className="text-white">My Posts</div>
            </Button>

            <Button onClick={togglePanelPosts}>
                <div className="text-white">Favourites</div>
            </Button>

            <div className="w-full p-4 text-center sm:rounded-lg">
                <h2 className='bg-[#333333] p-4 mb-2 rounded-lg' >Meme Planet <br/> memes and news<hr/></h2>

                <InfiniteScrollPosts chosenCategory={categoryId}/>
            </div>




        </div>
    );
}

export default AccountView;
