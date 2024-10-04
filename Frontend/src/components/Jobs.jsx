import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Jobs = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);

  // Fetching jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}`);
        console.log('Fetched jobs:', response.data);
        if (Array.isArray(response.data)) {
          setJobs(response.data);
          setFilterJobs(response.data);
        } else {
          console.error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search query
  useEffect(() => {
    console.log('Searched Query:', searchedQuery);
    let filteredJobs = jobs;

    if (searchedQuery) {
      // Improved regex to handle multiple key-value pairs correctly
      const queryObj = Object.fromEntries(
        searchedQuery
          .split(' ')
          .map((item) => item.split(/:(.+)/).map((str) => str.trim()))
      );

      console.log('Query Object:', queryObj);

      const queryLocation = queryObj?.location?.toLowerCase();
      const queryPosition = queryObj?.position?.toLowerCase();
      const querySalary = queryObj?.salary;
      const queryJobType = queryObj?.job_type?.toLowerCase();

      // Apply filters
      filteredJobs = jobs.filter((job) => {
        const matchLocation = queryLocation ? job.location?.toLowerCase() === queryLocation : true;
        const matchPosition = queryPosition ? job.position?.toLowerCase().includes(queryPosition) : true;
        const matchSalary = querySalary ? isSalaryInRange(job.salary, querySalary) : true;
        const matchJobType = queryJobType ? job.jobType?.toLowerCase().includes(queryJobType) : true;

        return matchLocation && matchPosition && matchSalary && matchJobType;
      });

      console.log('Filtered Jobs:', filteredJobs);
    }

    setFilterJobs(filteredJobs);
  }, [searchedQuery, jobs]);

  const isSalaryInRange = (jobSalary, queryRange) => {
    const jobSalaryNumeric = extractSalaryValue(jobSalary);
    const [minRange, maxRange] = extractSalaryRange(queryRange);

    if (minRange === null || maxRange === null || jobSalaryNumeric === null) {
      return false;
    }

    return jobSalaryNumeric >= minRange && jobSalaryNumeric <= maxRange;
  };

  const extractSalaryValue = (salaryString) => {
    const salaryMatch = salaryString.match(/(\d+)\s*Lakh/);
    return salaryMatch ? parseInt(salaryMatch[1]) * 100000 : null;
  };

  const extractSalaryRange = (rangeString) => {
    if (rangeString.includes('Above')) {
      const min = parseInt(rangeString.match(/(\d+)\s*Lakh/)[1]);
      return [min * 100000, Infinity];
    }
    const rangeMatch = rangeString.match(/(\d+)\s*Lakh.*?(\d+)\s*Lakh/);
    return rangeMatch ? [parseInt(rangeMatch[1]) * 100000, parseInt(rangeMatch[2]) * 100000] : [null, null];
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'>
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job.id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
