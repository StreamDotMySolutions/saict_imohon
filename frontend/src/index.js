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
import Index from "./pages/Index"
import States from "./pages/States"
import Regions from "./pages/Regions"
import Candidate from "./pages/Candidates"
import Dashboard from "./pages/Dashboard"
import Penafian from "./pages/Penafian"
import Teknologi from "./pages/Teknologi"
import Keselamatan from "./pages/Keselamatan"
import Privasi from "./pages/Privasi"
import CategoryIndex from './pages/Category'

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
            <Route index element={<Index />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/penafian" element={<Penafian />} />
            <Route path="/teknologi" element={<Teknologi />} />
            <Route path="/keselamatan" element={<Keselamatan />} />
            <Route path="/privasi" element={<Privasi />} />
            <Route path="/index" element={<Index />} />
            <Route path="/categories" element={<CategoryIndex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
