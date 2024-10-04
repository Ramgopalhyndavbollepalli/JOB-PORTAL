import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setAllAppliedJobs } from '@/redux/jobSlice'; // Correct action name
import { USER_API_END_POINT, USER_API_END_POINT1 } from '@/utils/constant';
import { toast } from 'sonner'; // If you are using toast for notifications

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user); // Get the user from the Redux store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!user || !user.id) {
        toast.error('User not authenticated or user ID is missing');
        return;
      }

      try {
        const response = await axios.get(
          `${USER_API_END_POINT1}/applications/user/${user.id}/applications`,
          { withCredentials: true }
        );
        console.log('Fetched applied jobs:', response.data); // Debugging
        if (response.data && response.status === 200) {
          dispatch(setAllAppliedJobs(response.data)); // Correct action name
        } else {
          setError('Failed to fetch applied jobs');
        }
      } catch (err) {
        console.error('Error fetching applied jobs:', err);
        setError('Error fetching applied jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [dispatch, user]); // Ensure `user` is in the dependency array

  return { loading, error };
};

export default useGetAppliedJobs;
