import React, { createContext, useContext, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InfiniteScrollPosts from './Posts/InfiniteScrollPosts';
import SidePanel from './SidePanel';
import Notification from './Notification';
import UploadPost from './Posts/UploadPost';

export default function Dashboard({ auth }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2> 
            }>

            <div className='bg-[#231f20] flex text-gray-100'>

                <div className='bg-[#231f20] w-1/3 mt-2' >
                    <div className="bg-[#333333] fixed p-4 sm:rounded-lg w-1/4 ml-5">
                           <h3 className="text-center font-semibold mb-2"><SidePanel>Add Post</SidePanel></h3>
                           <h3 className="text-center font-semibold mb-2">Categories</h3>
                           <h3><Notification/></h3>
                   </div>
                </div>

                <div className='bg-[#231f20] w-1/2 mt-2'>
                    <div className="w-full bg-[#333333] p-4 text-center sm:rounded-lg"> 
                        <h2>Meme Planet  - memes and news</h2>
                        <InfiniteScrollPosts />
                    </div>
                </div>

                <div className='bg-[#231f20] w-1/3 mt-2 ml-4'>
                    <div className="w-full bg-[#333333] p-4 text-center sm:rounded-lg">
                        <h3 className="text-center font-semibold mb-2">Popular</h3>
                    </div>
                </div>
                
            </div>

        </AuthenticatedLayout>
    );
}
