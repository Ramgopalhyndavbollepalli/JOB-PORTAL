import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'position',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'FullStack Developer',
      'Web Developer',
      'UI/UX Designer',
      'Technical Support Engineer',
      'Team Lead',
      'Software Developer',
      'Software Architect',
      'SEO Specialist',
      'Security Analyst',
      'Sales Manager',
      'Research Analyst',
      'QA Manager',
    ],
  },
  {
    filterType: 'salary',
    array: ['0Lakh LPA- 6Lakh LPA', '6Lakh LPA-15Lakh LPA', 'Above 15Lakh LPA'],
  },
  {
    filterType: 'job_type',
    array: ['Part-Time', 'Full-Time', 'Entry-Level', 'Internships'],
  },
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({
    location: '',
    position: '',
    salary: '',
    job_type: '',
  });
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    // Combine all selected filter values into a search query string
    const query = Object.entries(selectedValues)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}:${value}`)
      .join(' ');

    // Dispatch the search query
    dispatch(setSearchedQuery(query));
  }, [selectedValues, dispatch]);

  return (
    <div className='w-full bg-white p-3 rounded-md max-h-[700px] overflow-y-auto'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      {filterData.map((data) => (
        <div key={data.filterType}>
          <h1 className='font-bold text-lg'>{data.filterType}</h1>
          <RadioGroup
            value={selectedValues[data.filterType]}
            onValueChange={(value) => changeHandler(data.filterType, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id-${data.filterType}-${idx}`;
              return (
                <div key={itemId} className='flex items-center space-x-2 my-2'>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
