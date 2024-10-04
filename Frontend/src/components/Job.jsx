import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate the number of days ago the job was posted
  const daysAgoFunction = (dateString) => {
    if (!dateString) return 'Date not available';
    const createdAt = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;
  };

  // Placeholder logo if no company logo is provided
  const placeholderLogo = 'https://via.placeholder.com/150';

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt)}
        </p>
        {/* Responsive Bookmark Button */}
        <Button
          variant='outline'
          className='rounded-full p-2 sm:p-3 hover:bg-gray-100 transition duration-300'
          size='icon'
        >
          <Bookmark className='h-4 w-4 sm:h-5 sm:w-5' />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        {/* Display company logo with a fallback to a placeholder if not available */}
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src={job?.company?.logo || placeholderLogo}
            alt={job?.company?.name || 'Company Logo'}
          />
        </Avatar>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name || 'Unknown Company'}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title || 'Job Title Not Available'}</h1>
        <p className='text-sm text-gray-600'>{job?.description || 'No description provided.'}</p>
      </div>
      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge className={'text-blue-700 font-bold'} variant='ghost'>
          {job?.position ? `${job.position} Positions` : 'Position Not Specified'}
        </Badge>
        <Badge className={'text-[#F83002] font-bold'} variant='ghost'>
          {job?.jobType || 'Type Not Specified'}
        </Badge>
        <Badge className={'text-[#7fcaee] font-bold'} variant='ghost'>
          {job?.salary ? `${job.salary} LPA` : 'Salary Not Specified'}
        </Badge>
      </div>
      <div className='flex items-center gap-4 mt-4 flex-wrap'>
        {/* Responsive Details Button */}
        <Button
          onClick={() => navigate(`/description/${job?.id}`)}
          variant='outline'
          className='w-full sm:w-auto'
        >
          Details
        </Button>
        {/* Responsive Save for Later Button */}
        <Button
          className='bg-[#234968] text-white w-full sm:w-auto hover:bg-[#1e3d59] transition duration-300'
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
