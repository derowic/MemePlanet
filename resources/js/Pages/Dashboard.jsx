import React, { createContext, useContext, useState, useRef,useEffect  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InfiniteScrollPosts from './Posts/InfiniteScrollPosts';
import FetchCategories from '@/Components/FetchCategories';
import CategoryList from './Posts/CategoryList';
import TopPosts from './Posts/TopPosts';

export default function Dashboard({ auth }) {
    const [chosenCategory, setChosenCategory] = useState(0);
   

    const changeCategory = (tmp) => {
        setChosenCategory(tmp);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2> 
            }>

            <div className='bg-[#231f20] flex text-gray-100'>

                <div className='bg-[#231f20] w-1/3 mt-6' >
                    <div className="bg-[#333333] fixed p-4 sm:rounded-lg w-1/4 ml-5">
                         
                           <h3 className="text-center font-semibold mb-2">Categories<hr/></h3>
                           <CategoryList chosenCategory={chosenCategory} changeCategory={changeCategory}/>
                           
                   </div>
                </div>

                <div className='bg-[#231f20] w-1/2 mt-2'>
                    <div className="w-full p-4 text-center sm:rounded-lg"> 
                        <h2 className='bg-[#333333] p-4 mb-2 rounded-lg' >Meme Planet <br/> memes and news<hr/></h2>
                        <InfiniteScrollPosts chosenCategory={chosenCategory}/>
                        
                    </div>
                </div>

                <div className='bg-[#231f20] w-1/3 mt-6 ml-4'>
                    <div className="w-full bg-[#333333] p-4 text-center sm:rounded-lg">
                        <h3 className="text-center font-semibold mb-2">Popular<hr/></h3>
                        <TopPosts/>
                    </div>
                </div>
                
            </div>

        </AuthenticatedLayout>
    );
}
