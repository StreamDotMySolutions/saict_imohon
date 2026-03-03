import './style.css';
import RoleLayout from '../RoleLayout';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

const AdminLayout = () => <RoleLayout TopNavBar={TopNavBar} Footer={Footer} />;

export default AdminLayout;
