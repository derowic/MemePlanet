import React, { createContext, useContext, useState, useRef,useEffect  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import SendComment from './Posts/SendComment';
import Notification from '@/Components/Notification';
import ShowOnePost from './Posts/ShowOnePost';
import { userData } from "./GlobalData.js";
import './styles.css'; // Importuj plik ze stylami

export default function OnePostView({ auth, postId }) {

    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"></h2> 
            }>

            <div className='bg-[#231f20] flex text-gray-100' style={{ maxHeight: '100vh', minHeight: '100vh' }}>
            
                <ShowOnePost/>
            </div>

        </AuthenticatedLayout>
    );
}
