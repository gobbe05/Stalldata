import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './routes/auth/login.tsx'
import Signup from './routes/auth/signup.tsx'
import Behandling from './routes/behandling/behandling.tsx'
import ChooseFarm from './routes/behandling/choosefarm.tsx'
import ChooseSection from './routes/behandling/choosesection.tsx'
import { GlobalState } from './GlobalState.tsx'
import ChooseBox from './routes/behandling/choosebox.tsx'
import AddFarm from './company/addfarm.tsx'
import Company from './company/company.tsx'
import AddBox from './company/addbox.tsx'
import AddSection from './company/addsection.tsx'
import AdminUsers from './admin/users.tsx'
import Layout from './layout.tsx'
import CreateTreatmentLayout from './routes/behandling/createtreatmentlayout.tsx'
import ChooseTreatment from './routes/behandling/choosetreatment.tsx'
import AddTreatment from './company/addtreatment.tsx'
import TreatedBoxes from './company/treatedboxes.tsx'
import AcceptUsers from './company/acceptusers.tsx'
import Auth from './routes/auth/auth.tsx'
import Admin from './admin/admin.tsx'
import CreateCompany from './admin/createcompany.tsx'
import ChooseCompany from './routes/auth/choosecompany.tsx'
import Users from './company/users.tsx'
import Companies from './admin/companies.tsx'
import CreateCompanyAdmin from './admin/createcompanyadmin.tsx'
import CreateAdmin from './admin/createadmin.tsx'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route path="/auth" element={<Auth />}>
        <Route path="company" element={<ChooseCompany />}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route index element={<Behandling />}/>
          <Route path="/behandling" element={<CreateTreatmentLayout />}>
            <Route index element={<ChooseFarm />}/>
            <Route path="choosesection" element={<ChooseSection />}/>
            <Route path="choosebox" element={<ChooseBox />}/>
            <Route path="choosetreatment" element={<ChooseTreatment />}/>,
          </Route>
          
        <Route path="/admin" element={<Admin />}>
          <Route path="companies" element={<Companies />} />
          <Route path="createcompany" element={<CreateCompany />}/>
          <Route path="createcompanyadmin" element={<CreateCompanyAdmin />}/>
          <Route path="createadmin" element={<CreateAdmin />}/>
          <Route path="users" element={<AdminUsers />} />
        </Route>,
        <Route path="/company" element={<Company />}>
          <Route index element={<TreatedBoxes />}/>
          <Route path="users" element={<Users />} />
          <Route path="accept" element={<AcceptUsers />}/>
          <Route path="addtreatment" element={<AddTreatment />}/>
          <Route path="addfarm" element={<AddFarm />}/>
          <Route path="addsection" element={<AddSection />}/>
          <Route path="addbox" element={<AddBox />}/>
        </Route>,
        
    </Route>,
    
  ])
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  </React.StrictMode>,
)
