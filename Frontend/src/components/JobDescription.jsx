import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: jobId } = useParams();

  const fetchJobDetails = async () => {
    console.log('Fetching job details for ID:', jobId);
    if (!jobId) return;

    try {
      const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
      if (res.data && res.status === 200) {
        dispatch(setSingleJob(res.data));
      } else {
        toast.error('Failed to fetch job details');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Error fetching job details');
    }
  };

  const applyJobHandler = () => {
    if (!user) {
      toast.error('Please log in to apply for this job.');
      return;
    }
    navigate(`/apply/${jobId}`);
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="bg-blue-100 text-blue-800">{singleJob?.position} Positions</Badge>
            <Badge className="bg-red-100 text-red-800">{singleJob?.jobType}</Badge>
            <Badge className="bg-purple-100 text-purple-800">{singleJob?.salary} LPA</Badge>
            <Badge className="bg-green-100 text-green-800">Total Applicants: {singleJob?.applications?.length}</Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg px-6 py-2 transition duration-300"
        >
          APPLY
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Job Details</h2>
        <div className="space-y-2">
          <p className="text-lg"><span className="font-semibold">Role:</span> <span className="text-gray-600">{singleJob?.title}</span></p>
          <p className="text-lg"><span className="font-semibold">Location:</span> <span className="text-gray-600">{singleJob?.location}</span></p>
          <p className="text-lg"><span className="font-semibold">Description:</span> <span className="text-gray-600">{singleJob?.description}</span></p>
          <p className="text-lg"><span className="font-semibold">Experience:</span> <span className="text-gray-600">{singleJob?.experience} yrs</span></p>
          <p className="text-lg"><span className="font-semibold">Salary:</span> <span className="text-gray-600">{singleJob?.salary} LPA</span></p>
          <p className="text-lg"><span className="font-semibold">Total Applicants:</span> <span className="text-gray-600">{singleJob?.applications?.length}</span></p>
          <p className="text-lg"><span className="font-semibold">Posted Date:</span> <span className="text-gray-600">{singleJob?.createdAt?.split('T')[0]}</span></p>
        </div>

        {/* Display Company Details */}
        {singleJob?.company && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Company Details</h2>
            <div className="flex items-center mt-2">
              {singleJob?.company?.logo && (
                <img src={singleJob.company.logo} alt="Company Logo" className="h-16 w-16 rounded-full mr-4" />
              )}
              <div>
                <p className="text-lg"><span className="font-semibold">Name:</span> <span className="text-gray-600">{singleJob?.company?.name}</span></p>
                <p className="text-lg"><span className="font-semibold">Location:</span> <span className="text-gray-600">{singleJob?.company?.location}</span></p>
                <p className="text-lg"><span className="font-semibold">Description:</span> <span className="text-gray-600">{singleJob?.company?.description}</span></p>
                {singleJob?.company?.website && (
                  <p className="text-lg"><span className="font-semibold">Website:</span> <a href={singleJob.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{singleJob.company.website}</a></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
