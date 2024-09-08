import {lazy, Suspense, useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProtectRoute from './Components/Auth/ProtectRoute';
import { LayoutLoader } from './Components/layout/Loaders';

const Home = lazy(()=>import("./pages/Home"));
const Login =lazy(()=>import("./pages/Login"));
const Chat = lazy(()=>import("./pages/Chat"));
const Group = lazy(()=>import("./pages/Group"));
const NotFound = lazy(()=>import("./pages/NotFound"));
const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"));
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"));

function App() {
    const [user,setUser] = useState(true    );
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>} >
          <Routes>
          <Route path='/' element= {<ProtectRoute user={user}><Home/></ProtectRoute>}/>
          <Route path='/chat/:chatId' element= {<ProtectRoute user={user}><Chat/></ProtectRoute>}/>
          <Route path='/group' element= {<ProtectRoute user={user}><Group/></ProtectRoute>}/>
          <Route path='/login' element= {<ProtectRoute user={!user} redirect="/"><Login/></ProtectRoute>}/>
          <Route path ='/admin' element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='*' element= {<NotFound/>}/>
          </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
