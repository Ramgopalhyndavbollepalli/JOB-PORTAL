import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { APPLICATION_API_END_POINT, USER_API_END_POINT } from '@/utils/constant'; // Ensure USER_API_END_POINT is defined in your constants

const JobApplicationForm = () => {
  const { jobId } = useParams(); // Get jobId from URL parameters
  const [userId, setUserId] = useState(null); // State to store the userId

  // Function to fetch user by email
  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/email/${email}`);
      if (response.data.success) {
        return response.data.user.id; // Assuming the backend returns the user object with an `id` field
      } else {
        toast.error("User not found.");
        return null;
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
      toast.error('Error fetching user ID.');
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const applicantName = formData.get('applicantName');
    const userEmail = formData.get('userEmail');
    const phoneNumber = formData.get('phoneNumber');
    const resumeFile = formData.get('resume');

    if (!userEmail) {
      toast.error('Email is required');
      return;
    }

    if (!phoneNumber) {
      toast.error('Phone number is required');
      return;
    }

    // Fetch the user ID from the backend based on the email
    const userId = await fetchUserIdByEmail(userEmail);
    if (!userId) {
      return; // Exit if user ID is not found
    }

    // Append userId to the form data
    formData.append('userId', userId);

    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Application submitted successfully!');
      } else {
        toast.error('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Error applying for job.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506765515384-028b60a970df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTkzN3wwfDF8c2VhcmNofDF8fHdvcmt8ZW58MHx8fHwxNjEzNzEwNzI3&ixlib=rb-1.2.1&q=80&w=1080')`,
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Apply for Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="applicantName"
              id="applicantName"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              className="w-full px-4 py-3 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
