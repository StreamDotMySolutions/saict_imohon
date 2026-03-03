import './style.css';
import RoleLayout from '../RoleLayout';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

const DefaultLayout = () => <RoleLayout TopNavBar={TopNavBar} Footer={Footer} />;

export default DefaultLayout;
