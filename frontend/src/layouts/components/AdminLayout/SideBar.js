import { NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {

    const currDate = {
        show : new Date().toLocaleString(),
    }


    return (
   
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{'height':'100vh', 'width': 'auto'}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">PRN 2023</span>
        </a>

        <span style={{'color' : 'green'}}><small>{currDate.show}</small></span>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">

            <li>
                <NavLink className="nav-link text-white" to="/dashboard"  ><FontAwesomeIcon icon="fas fa-dashboard" /> Dashboard </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/kedah"  ><FontAwesomeIcon icon="fas fa-flag" /> Kedah </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/kelantan"  ><FontAwesomeIcon icon="fas fa-flag" /> Kelantan </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/selangor"  ><FontAwesomeIcon icon="fas fa-flag" /> Selangor </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/pulau_pinang"  ><FontAwesomeIcon icon="fas fa-flag" /> Pulau Pinang </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/negeri_sembilan"  ><FontAwesomeIcon icon="fas fa-flag" /> Negeri Sembilan </NavLink>
            </li>

            <li>
                <NavLink className="nav-link text-white"  to="/terengganu"  ><FontAwesomeIcon icon="fas fa-flag" /> Terengganu    </NavLink>
            </li>
    
        </ul>

    </div>
 
    )
}

export default SideBar