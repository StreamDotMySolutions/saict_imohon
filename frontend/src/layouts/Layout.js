import React from 'react';
import { useAuthStore } from '../stores/AuthStore';
import DefaultLayout from './components/DefaultLayout';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';

const Layout = () => {
    const store = useAuthStore();

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

        case 'apprroval-1':
            renderedComponent = <AdminLayout />;
        break;

        case 'apprroval-2':
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
