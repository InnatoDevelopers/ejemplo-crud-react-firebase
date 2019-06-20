import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import M from 'materialize-css';

class Navigation extends Component {

    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }


    signOut = (event) => {
        event.preventDefault();
        firebase.auth().signOut();
    }

    render() {

        return (
            <React.Fragment>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper blue lighten-1">
                            <Link to="/dashboard" className="brand-logo">InnatoDevelopers</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/dashboard/user"><i className="material-icons left">people</i>Usuario</Link></li>
                                <li><a href="!#" onClick={this.signOut}><i className="material-icons left">power_settings_new</i>Salir</a></li>
                            </ul>
                            <ul id="nav-mobile" className="right show-on-medium-and-down">
                                <li><a href="!#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <ul id="slide-out" className="sidenav">
                    <li><Link to="/dashboard" className="sidenav-close"><i className="material-icons">home</i>Inicio</Link></li>
                    <li><Link to="/dashboard/user" className="sidenav-close"><i className="material-icons">people</i>Usuario</Link></li>
                    <li><div className="divider"></div></li>

                    <li><a href="!#" onClick={this.signOut} className="sidenav-close"><i className="material-icons">power_settings_new</i>Salir</a></li>
                </ul>
            </React.Fragment>
        )
    }
}

export default Navigation;