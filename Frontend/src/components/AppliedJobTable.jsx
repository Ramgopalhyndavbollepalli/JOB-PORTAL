import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector to get data from the Redux store
import { USER_API_END_POINT1 } from '@/utils/constant';

const AppliedJobTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Get the user from the Redux store
  const user = useSelector((store) => store.auth.user);

  // Function to fetch applied jobs
  const fetchAppliedJobs = async () => {
    if (!user || !user.id) {
      setError('User not found');
      setLoading(false); // Stop loading if user is not found
      return;
    }

    try {
      console.log('Fetching jobs for user ID:', user.id); // Debugging line

      const res = await axios.get(
        `${USER_API_END_POINT1}/applications/user/${user.id}/applications`
      );

      console.log('API response:', res.data); // Debugging line
      setAppliedJobs(res.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to fetch applied jobs:', err);
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading in any case
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [user]); // Fetch applied jobs whenever user changes

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Applied Jobs</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Job Role</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No jobs found</td>
                </tr>
              ) : (
                appliedJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{job.applicationDate}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{job.jobTitle}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{job.companyName}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{job.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
