import {Dispatch, useEffect} from 'react';
import Nav from "./Nav";
import Header from "./Header";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";
import {connect} from "react-redux";

interface LayoutProps {
    children: React.ReactNode;
    setUser: (user: User) => void;
}

const Layout = ({children, setUser}: LayoutProps) => {
    const location = useLocation();

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user');
                    setUser(data);
                } catch (e) {
                    console.log(e);
                }
            }
        )();
    }, [setUser]); // Only depend on setUser

    let header;

    if (location.pathname === '/' || location.pathname === '/backend') {
        header = <Header/>;
    }

    return (
        <div>
            <Nav/>
            <main>
                {header}
                <div className="album py-5 bg-light">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
