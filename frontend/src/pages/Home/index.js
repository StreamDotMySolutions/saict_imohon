import useAuthStore from "../Auth/stores/AuthStore"
import SystemDashboard from "./components/SystemDashboard"
import AdminDashboard from "./components/AdminDashboard"
import UserDashboard from "./components/UserDashboard"
import Approver1Dashboard from "./components/Approver1Dashboard"
import Approver2Dashboard from "./components/Approver2Dashboard"

const Home = () => {
    const store = useAuthStore();
    let renderedComponent;

    switch (store?.user?.role) {
        case 'system':
            renderedComponent = <SystemDashboard />;
        break;

        case 'admin':
            renderedComponent = <AdminDashboard />;
        break;

        case 'user':
            renderedComponent = <UserDashboard />;
        break;

        case 'approver-1':
            renderedComponent = <Approver1Dashboard />;
        break;

        case 'approver-2':
            renderedComponent = <Approver2Dashboard />;
        break;

        default:
            // Render a fallback or handle other cases here
            renderedComponent = <div>Hello world</div>;
    }

    return (<>
        {renderedComponent}
        </>)
} 

export default Home