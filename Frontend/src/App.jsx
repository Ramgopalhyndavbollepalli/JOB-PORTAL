import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanySetup from './components/admin/CompanySetup'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ContactUs from './components/admin/ContactUs'
import FAQs from './components/admin/FAQs';
import JobApplicationForm from './components/JobApplicationForm'; // Import your JobApplicationForm component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/applicants/:jobId",
    element: <Applicants />
  },
  {
    path: '/FAQs',
    element: <FAQs />
  },
  {
    path: "/contact",
    element: <ContactUs />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
 
  {
    path: "/profile",
    element: <Profile />
  },
  // Add this route for applying to a job
  {
    path: "/apply/:jobId",
    element: <JobApplicationForm />
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },

  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },

]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
