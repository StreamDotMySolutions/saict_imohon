/** React Helmet Async - SEO */
import { HelmetProvider } from 'react-helmet-async';

import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
/** Font Awesome **/
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

/** Layouts */
import DefaultLayout from "./layouts/components/DefaultLayout/index.js"
import SignInLayout from './pages/SignIn/layout.js';
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
import UserDepartment from './pages/UserDepartment';


import Account from './pages/Account/index.js';
import ResetPassword from './pages/SignIn/components/ResetPassword/index.js';
import SignInForm from './pages/SignIn/components/SignIn/index.js';
import EmailPassword from './pages/SignIn/components/EmailPassword/index.js';

library.add(fas)

export default function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>            
          
          <Route path="*" element={<Error404 />} />

            <Route element={<SignInLayout />}>
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/password/email" element={<EmailPassword />} />
              <Route path="/password/reset" element={<ResetPassword />} />
            </Route>

            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>  
                {/* <Route index element={<Home />} /> */}
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
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
