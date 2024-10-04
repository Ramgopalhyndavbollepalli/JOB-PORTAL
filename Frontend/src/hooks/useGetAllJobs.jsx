// import { setAllJobs } from '@/redux/jobSlice';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();
//     const { searchedQuery } = useSelector(store => store.job);

//     useEffect(() => {
//         const fetchAllJobs = async () => {
//             try {
//                 // Use the correct API endpoint to fetch jobs
//                 const res = await axios.get(`${JOB_API_END_POINT}?keyword=${searchedQuery}`, {
//                     withCredentials: true,
//                 });

//                 if (res.data && res.data.success) {
//                     // Dispatch the jobs to the store
//                     dispatch(setAllJobs(res.data.jobs));
//                 } else {
//                     console.error('Failed to fetch jobs or no jobs found:', res.data.message || 'Unknown error');
//                 }
//             } catch (error) {
//                 console.error('Error fetching jobs:', error.message || error);
//             }
//         };

//         fetchAllJobs();
//     }, [searchedQuery, dispatch]);
// };

// export default useGetAllJobs;
