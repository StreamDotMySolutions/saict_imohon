import './style.css';
import RoleLayout from '../RoleLayout';
import TopNavBar from './TopNavBar';
import Footer from '../global/Footer';

const UserLayout = () => <RoleLayout TopNavBar={TopNavBar} Footer={Footer} />;

export default UserLayout;
