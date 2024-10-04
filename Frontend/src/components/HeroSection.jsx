import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        // Combine the search parameters into a single string for dispatch
        const searchQuery = `query:${query} location:${location} industry:${industry}`.trim();

        // Dispatch the search query
        dispatch(setSearchedQuery(searchQuery));
        navigate("/jobs");
    };

    return (
        <div 
            className='relative bg-center text-white h-screen' 
            style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1713947506663-7f630ef496ba?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
            }}
        >
            <div className='absolute inset-0 bg-black opacity-50'></div> {/* Overlay */}
            <div className='relative z-10 flex flex-col items-center justify-center h-full text-center'>
                <h1 className='text-5xl font-bold leading-snug mb-4'>
                    Your Dream <span className='text-[#6A38C2]'>Job</span> is Waiting
                </h1>

                {/* Enhanced Search Bar */}
                <div className='relative w-full md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-8'>
                    <div className='flex items-center gap-2 p-2 bg-white rounded-lg shadow-lg backdrop-blur-md bg-opacity-80'>
                        <input
                            type="text"
                            placeholder='Job Title (e.g. Graphic, Web Developer)'
                            onChange={(e) => setQuery(e.target.value)}
                            className='w-1/3 py-3 px-4 text-sm text-gray-800 bg-white outline-none rounded-md placeholder-gray-500 focus:ring-2 focus:ring-[#6A38C2] transition-colors duration-300 ease-in-out'
                        />
                        <input
                            type="text"
                            placeholder='Location (e.g. New York)'
                            onChange={(e) => setLocation(e.target.value)}
                            className='w-1/3 py-3 px-4 text-sm text-gray-800 bg-white outline-none rounded-md placeholder-gray-500 focus:ring-2 focus:ring-[#6A38C2] transition-colors duration-300 ease-in-out'
                        />
                        <input
                            type="text"
                            placeholder='Industry (e.g. Tech, Healthcare)'
                            onChange={(e) => setIndustry(e.target.value)}
                            className='w-1/3 py-3 px-4 text-sm text-gray-800 bg-white outline-none rounded-md placeholder-gray-500 focus:ring-2 focus:ring-[#6A38C2] transition-colors duration-300 ease-in-out'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="bg-[#6A38C2] hover:bg-purple-700 p-3 rounded-md text-white transition-all duration-300 flex items-center justify-center"
                        >
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
