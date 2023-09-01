import React, { createContext, useContext, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ExampleComponent from './ExampleComponent';
import InfiniteScrollPosts from './Posts/InfiniteScrollPosts';
import SidePanel from './SidePanel';
import Notification from './Notification';
import UploadPost from './Posts/UploadPost';
//import Comments from './Comments';

export default function Dashboard({ auth }) {
    //const isAdmin = auth.user && auth.user.roles.includes('admin');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2> 
            }>

            <Head title="Meme Planet" />

                <div className="bg-[#231f20] overflow-hidden shadow-sm ">
                    <div className="flex p-6 text-gray-900 dark:text-gray-100 ">

                        <div className="bg-[#333333] fixed p-4 sm:rounded-lg "> {/* Blok po lewej */}
                        {/*{isAdmin && (*/}
                            <>
                                <h3 className="text-center font-semibold mb-2"><SidePanel>Add Post</SidePanel></h3>
                                <h3 className="text-center font-semibold mb-2">Categories</h3>
                                <h3><Notification/></h3>
                            </>
                        {/*)} */}
                            
                        </div>
                        <div className=" w-1/4 p-4  "> {/* Blok po lewej */}

                        
                         
                            
                        </div>

                        <div className="w-1/2 ">
                        
                            
                                
                            <div className="w-full bg-[#333333] p-4 text-center sm:rounded-lg"> 
                                {/* Główny blok treści */}
                                {/*<ExampleComponent /> */}
                                <h2>Meme Planet  - memes and news</h2>
                                <UploadPost />
                                <InfiniteScrollPosts />
                               

                            </div>
                        </div>

                        <div className="bg-[#333333] ml-4 w-1/4 p-4 overflow-hidden sm:rounded-lg"> {/* Blok po prawej */}
                            <h3 className="text-center font-semibold mb-2">Popular</h3>
                            {/* Tu możesz dodać dowolną treść */}
                            
                        </div>
                    </div>
                </div>
                
            
        </AuthenticatedLayout>
    );
}
