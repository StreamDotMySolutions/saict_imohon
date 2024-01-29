/** React Helmet Async - SEO */
import { HelmetProvider } from 'react-helmet-async';

import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
/** Font Awesome **/
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

/** Layouts */
import DefaultLayout from "./layouts/components/DefaultLayout/index.js"
import AuthLayout from './pages/Auth/layout.js';
import Layout from './layouts/Layout';

/** Protected Route */
import ProtectedRoute from './libs/ProtectedRoute';


/** Error */
import Error404 from "./pages/Error404"

/** Pages - PUBLIC */
import Home from "./pages/Home"
import User from "./pages/User"
import Dashboard from "./pages/Dashboard"

import Penafian from "./pages/Footer/Penafian"
import Teknologi from "./pages/Footer/Teknologi"
import Keselamatan from "./pages/Footer/Keselamatan"
import Privasi from "./pages/Footer/Privasi"

import CategoryIndex from './pages/Category'
import UserDepartment from './pages/UserDepartment'

import Account from './pages/Account'
import ResetPassword from './pages/Auth/components/ResetPassword'
import SignInForm from './pages/Auth/components/SignIn'
import SignInByNricForm from './pages/Auth/components/SignInByNric'
import SignUpForm from './pages/Auth/components/SignUp'
import EmailPassword from './pages/Auth/components/EmailPassword'
import Unauthorized from './pages/Auth/components/Unauthorized'
import SignOut from './pages/Auth/components/SignOut'
import Application from './pages/Application'
import ApprovalByManager from './pages/Approval/ByManager'
import ApprovalByAdmin from './pages/Approval/ByAdmin'
import Inventory from './pages/Inventory'
import Distribution from './pages/Distribution'
import DistributionApproval from './pages/DistributionApproval'
import DistributionAcceptance from './pages/DistributionAcceptance'

library.add(fas)

export default function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>            
          <Route path="*" element={<Error404 />} />
        
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/sign-in-by-nric" element={<SignInByNricForm />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/sign-out" element={<SignOut />} />
            
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/password/email" element={<EmailPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
            </Route>

            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>  
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/penafian" element={<Penafian />} />
                <Route path="/teknologi" element={<Teknologi />} />
                <Route path="/keselamatan" element={<Keselamatan />} />
                <Route path="/privasi" element={<Privasi />} />
                <Route path="/categories" element={<CategoryIndex />} />
                <Route path="/users" element={<User />} />
                <Route path="/user-departments" element={<UserDepartment />} />
                <Route path="/applications" element={<Application />} />
                <Route path="/approvals/by-manager" element={<ApprovalByManager />} />
                <Route path="/approvals/by-admin" element={<ApprovalByAdmin />} />
                <Route path="/approvals/by-boss" element={<ApprovalByManager />} />
                <Route path="/inventories" element={<Inventory />} />
                <Route path="/distributions" element={<Distribution />} />
                <Route path="/distribution-approvals" element={<DistributionApproval />} />
                <Route path="/distribution-acceptances" element={<DistributionAcceptance />} />
              </Route>
            </Route>

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
