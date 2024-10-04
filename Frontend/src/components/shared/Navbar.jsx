import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out.");
    }
  };

  return (
    <div className='sticky top-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
        {/* Logo */}
        <h1 className='text-3xl font-extrabold text-white tracking-wide'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg'>
            CareerMap
          </span>
        </h1>

        {/* Navigation Links */}
        <div className='flex items-center gap-12'>
          <ul className='flex font-semibold items-center gap-8 text-gray-300'>
            <li>
              <Link 
                to="/" 
                className='hover:text-pink-500 transition-colors duration-300 underline-offset-4 hover:underline'
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/jobs" 
                className='hover:text-pink-500 transition-colors duration-300 underline-offset-4 hover:underline'
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className='hover:text-pink-500 transition-colors duration-300 underline-offset-4 hover:underline'
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/FAQs" 
                className='hover:text-pink-500 transition-colors duration-300 underline-offset-4 hover:underline'
              >
                FAQs
              </Link>
            </li>
          </ul>

          {/* Buttons and User Profile */}
          <div className='flex items-center gap-4'>
            <Link to="/jobs">
              <Button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300">
                Want a Job
              </Button>
            </Link>
            {!user ? (
              <div className='flex items-center gap-3'>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <span 
                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer" 
                    type="button" 
                    aria-haspopup="dialog" 
                    aria-expanded="false" 
                    aria-controls="radix-:r1f:" 
                    data-state="closed"
                  >
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                    </Avatar>
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 bg-gray-800 rounded-lg shadow-lg text-white">
                  <div>
                    <div className='flex gap-2 items-center mb-3'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                      </Avatar>
                      <div>
                        <h4 className='font-medium text-white'>{user?.fullname}</h4>
                        <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className='flex flex-col text-gray-300'>
                      {user && user.role === 'student' && (
                        <div className='flex items-center gap-2 mb-2 cursor-pointer'>
                          <User2 className="text-gray-400" />
                          <Link to="/profile" className="text-sm hover:text-white transition duration-300">
                            View Profile
                          </Link>
                        </div>
                      )}
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <LogOut className="text-gray-400" />
                        <Button 
                          onClick={logoutHandler} 
                          variant="link" 
                          className="text-sm text-red-500 hover:text-red-600 transition duration-300"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
