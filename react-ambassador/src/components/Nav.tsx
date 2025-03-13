import React, {Dispatch} from 'react';
import {connect} from "react-redux";
import {Link, NavLink, useHistory} from 'react-router-dom';
import {User} from "../models/user";
import axios from "axios";
import {setUser} from "../redux/actions/setUserAction";

interface NavProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const Nav = ({user, setUser}: NavProps) => {
    const history = useHistory();

    const logout = async () => {
        try {
            await axios.post('logout');
            setUser(null);
            history.push('/login');
        } catch (e) {
            console.error('Logout failed:', e);
        }
    }

    let menu;

    if (user?.id) {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/rankings'} className="btn me-2">Rankings</Link>
                <Link to={'/stats'} className="btn me-2">Stats</Link>
                <button className="btn btn-outline-primary me-2"
                        onClick={logout}
                >Logout</button>
                <Link to={'/profile'} className="btn btn-primary">{user.first_name} {user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/login'} className="btn btn-outline-primary me-2">Login</Link>
                <Link to={'/register'} className="btn btn-primary">Sign-up</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <NavLink to='/' activeClassName='link-dark' exact
                                 className="nav-link px-2 link-secondary">Frontend</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/backend'} activeClassName='link-dark'
                                 className="nav-link px-2 link-secondary ">Backend</NavLink>
                    </li>
                </ul>

                {menu}
            </header>
        </div>
    );
};

export default connect(
    (state: { user: User | null }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User | null) => dispatch(setUser(user))
    })
)(Nav);
