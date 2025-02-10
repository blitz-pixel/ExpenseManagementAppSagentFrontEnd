import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

function Layout(){
    return (
        <div>
            <Navbar />
            <main>
            <Outlet />
            </main>
        </div>
    );
}

export default Layout;