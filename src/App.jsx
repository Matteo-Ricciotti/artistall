// import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import EditProfile from './pages/EditProfile';
// import Explore from './pages/Explore';
// import Home from './pages/Home';
// import Links from './pages/Links';

import AddPhoto from "./pages/AddPhoto";

// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Register from './pages/Register';
// import Search from './pages/Search';
// import Navbar from './components/molecules/Navbar';
// import { useEffect } from 'react';
// import AddAudio from './pages/AddAudio';

// const Root = () => {
//     const { pathname } = useLocation();
//     const navigate = useNavigate();

//     const matchNav = ['/links', '/edit', '/add-audio'];

//     useEffect(() => {
//         if (pathname === '/') {
//             navigate('/login');
//         }
//     }, [pathname, navigate]);

//     return (
//         <div>
//             <Outlet />
//             {!matchNav.some((path) => pathname.includes(path)) && pathname !== '/' && <Navbar />}
//         </div>
//     );
// };

const App = () => {
    return (
        <AddPhoto />
        
        // <Routes>
        //     <Route path='/login' element={<Login />} />
        //     <Route path='/register' element={<Register />} />
        //     <Route path='/' element={<Root />}>
        //         <Route path='home' element={<Home />} />
        //         <Route path='search' element={<Search />} />
        //         <Route path='explore' element={<Explore />} />
        //         <Route path='profile'>
        //             <Route index element={<Profile />} />
        //             <Route path='edit' element={<EditProfile />} />
        //             <Route path='links' element={<Links />} />
        //             <Route path='add-audio' element={<AddAudio />} />
        //         </Route>
        //     </Route>
        // </Routes>
    );
};
export default App;
