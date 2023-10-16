/** React Helmet Async - SEO */
import { HelmetProvider } from 'react-helmet-async';

import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

/** Layouts */
import DefaultLayout from "./layouts/DefaultLayout"

/** Error */
import Error404 from "./pages/Error404"

/** Pages - PUBLIC */
import Home from "./pages/Home"
import User from "./pages/User"
import Dashboard from "./pages/Dashboard"
import Penafian from "./pages/Penafian"
import Teknologi from "./pages/Teknologi"
import Keselamatan from "./pages/Keselamatan"
import Privasi from "./pages/Privasi"
import CategoryIndex from './pages/Category'
import UserDepartment from './pages/UserDepartment';

/** Font Awesome **/
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            {/* <Route index element={<Home />} /> */}
            <Route index element={<Home />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/penafian" element={<Penafian />} />
            <Route path="/teknologi" element={<Teknologi />} />
            <Route path="/keselamatan" element={<Keselamatan />} />
            <Route path="/privasi" element={<Privasi />} />
            <Route path="/categories" element={<CategoryIndex />} />
            <Route path="/users" element={<User />} />
            <Route path="/user-departments" element={<UserDepartment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);