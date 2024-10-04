import React from 'react';

const CompanyCard = ({ company }) => {
    return (
        <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center'>
            <img
                src={company.logo}
                alt={company.name}
                className='w-24 h-24 object-cover rounded-full mb-4'
            />
            <h2 className='text-xl font-bold mb-2'>{company.name}</h2>
            <p className='text-sm text-gray-600 mb-4'>{company.description}</p>
            <a
                href={company.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
            >
                Visit Website
            </a>
        </div>
    );
};

export default CompanyCard;
