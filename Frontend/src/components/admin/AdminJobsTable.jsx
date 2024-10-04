import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector to get data from the Redux store
import { USER_API_END_POINT } from '@/utils/constant';

const AppliedJobTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.auth.user); // Get the user from the Redux store

  // Function to fetch applied jobs
  const fetchAppliedJobs = async () => {
    if (!user || !user.id) {
      setError('User not found');
      return;
    }
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/user/${user.id}/applications`
      );
      setAppliedJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch applied jobs:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [user]); // Run effect whenever user changes

  return (
    <div>
      <h2>Applied Jobs</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Job Role</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.length === 0 ? (
              <tr>
                <td colSpan="4">No jobs found</td>
              </tr>
            ) : (
              appliedJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.applicationDate}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td>{job.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppliedJobTable;
