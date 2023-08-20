import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ExampleComponent from './ExampleComponent';
import InfiniteScrollPosts from './Posts/InfiniteScrollPosts';

export default function MemeGenerator({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">MemeGenerator</h2>}
        >
            <Head title="MemeGenerator" />

            <div className="max-w-8xl py-12 mx-auto sm:px-6 lg:px-8">
                
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex">
                            <div className="w-1/4 p-4"> {/* Blok po lewej */}
                                <h3 className=" text-center font-semibold mb-2">Categories</h3>
                              
                                {/* Tu możesz dodać dowolną treść */}
                            </div>
                            
                            <div className="w-1/2 p-4"> {/* Główny blok treści */}
                                <h3 className="text-center font-semibold mb-2">Today memes</h3>
                                You're logged in, asshole!
                               
                            </div>
                            
                            <div className="w-1/4 p-4"> {/* Blok po prawej */}
                                <h3 className="text-center font-semibold mb-2">Popular</h3>
                                {/* Tu możesz dodać dowolną treść */}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
