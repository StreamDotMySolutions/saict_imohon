import React from 'react';
import useAuthStore from '../pages/Auth/stores/AuthStore';
import DefaultLayout from './components/DefaultLayout';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';

const Layout = () => {
    const store = useAuthStore();
    //console.log(store)
    let renderedComponent;

    if(!store?.user?.role)  return <DefaultLayout />

    switch (store.user.role) {
        case 'system':
            renderedComponent = <DefaultLayout />;
        break;

        case 'admin':
            renderedComponent = <AdminLayout />;
        break;

        case 'user':
                renderedComponent = <UserLayout />;
        break;

        case 'manager':
            renderedComponent = <AdminLayout />;
        break;

        case 'boss':
            renderedComponent = <AdminLayout />;
        break;

        default:
            // Render a fallback or handle other cases here
            renderedComponent = <div>Hello world</div>;
    }

    return (
        <div>
            {renderedComponent}
        </div>
    );
};

export default Layout;
