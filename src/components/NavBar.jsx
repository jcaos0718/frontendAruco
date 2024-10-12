import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { changeTabActive } from '../redux/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'; // Importa Link desde react-router-dom
import { useAuth } from "../contexts/AuthContext";
const NavBar = ({ activeTab }) => {
    const { user, logout } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let  menu=[]
    const menuUnAuth = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Join Us', path: '/signup' },
        { name: 'Log In', path: '/signin' }
    ];
    const menuAuth=[
        { name: 'Home', path: '/' },
        { name: 'Profile', path: '/profile' },
        { name: 'Game', path: '/game' },
        { name: 'Log Out', path: '/' }
    ];


    const [linkNav,setLinkNav] = useState(menu);
    const [statusNav, changeStatusNav] = useState(null);
    useEffect(() => {
        if (!user) {
            setLinkNav(menuUnAuth);
        } else {
            setLinkNav(menuAuth);
        }
    }, [user]); 

    const toggleNav = () => {
        changeStatusNav(statusNav === null ? 'active' : null);
    }
    
    const changeTab = (value) => {
        if (value==='Log Out'){
            logout();
           
        }
        dispatch(changeTabActive(value));
        toggleNav();
        reload();
    
    }
    
    return (
        <header className="w-screen p-4">
            <div className="logo">
                <img src="/Logo.png" alt=""/> ArucoGame
            </div>
            <nav className={statusNav}>
                {
                linkNav.map(({ name, path }) => (
                    <Link 
                        key={name} 
                        to={path} 
                        className={activeTab === name ? 'active' : ''}
                        onClick={() => changeTab(name)}
                    >
                        {name}
                    </Link>
                ))
                }
            </nav>
            <div className="icon-bar" onClick={toggleNav}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    activeTab: state.activeTab
});

export default connect(mapStateToProps, { changeTabActive })(NavBar);


// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { useDispatch } from 'react-redux';
// import { changeTabActive } from '../redux/actions';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from 'react-router-dom'; // Importa Link desde react-router-dom
// import { useAuth } from "../contexts/AuthContext";

// const NavBar = ({ activeTab }) => {
//     const { user, logout } = useAuth();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     let menu = [];

//     const menuUnAuth = [
//         { name: 'Home', path: '/' },
//         { name: 'About Us', path: '/about' },
//         { name: 'Join Us', path: '/signup' },
//         { name: 'Log In', path: '/signin' }
//     ];

//     const menuAuth = [
//         { name: 'Home', path: '/' },
//         { name: 'Profile', path: '/profile' },
//         { name: 'Game', path: '/game' },
//         { name: 'Log Out', path: '/' }
//     ];

//     const [linkNav, setLinkNav] = useState(menu);
//     const [statusNav, changeStatusNav] = useState(null);

//     useEffect(() => {
//         if (!user) {
//             setLinkNav(menuUnAuth);
//         } else {
//             setLinkNav(menuAuth);
//         }
//     }, [user]);

//     const toggleNav = () => {
//         changeStatusNav(statusNav === null ? 'active' : null);
//     }

//     const changeTab = (value, path) => {
//         if (value === 'Log Out') {
//             logout();
//         }
//         dispatch(changeTabActive(value));
//         toggleNav();
        
//         // Navigate to the path and reload the page
//         navigate(path, { replace: true });
//         window.location.reload(); // Force page reload
//     }

//     return (
//         <header className="w-screen p-4">
//             <div className="logo">
//                 <img src="/Logo.png" alt="" /> ArucoGame
//             </div>
//             <nav className={statusNav}>
//                 {linkNav.map(({ name, path }) => (
//                     <Link
//                         key={name}
//                         to={path}
//                         className={activeTab === name ? 'active' : ''}
//                         onClick={() => changeTab(name, path)}
//                     >
//                         {name}
//                     </Link>
//                 ))}
//             </nav>
//             <div className="icon-bar" onClick={toggleNav}>
//                 <FontAwesomeIcon icon={faBars} />
//             </div>
//         </header>
//     );
// }

// const mapStateToProps = (state) => ({
//     activeTab: state.activeTab
// });

// export default connect(mapStateToProps, { changeTabActive })(NavBar);
