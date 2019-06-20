import React, { Component } from 'react';
import firebase from 'firebase';
import Navigation from './nav.cmpt';
import './dashboard.css';
import AdminRouter from '../routing/admin.router';
import LoadingCmpt from '../generics/loading.cmpt';

class Dashboard extends Component {

    state = {
        user: null
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.history.push("/");
            } else {
                this.setState({ user });
                console.log(user.user);
            }
        });
    }


    render() {

        //Si aún no se encuentra el usuario en el state no se muestra retornara 
        if (!this.state.user) {
            return (
                <LoadingCmpt />
            )
        }

        return (
            <React.Fragment>
                <header>
                    <Navigation />
                </header>
                <main className="mainContent">
                    <AdminRouter />
                </main>
                <footer className="page-footer blue lighten-1">
                    <div className="container">
                        <div className="row">
                            <div className="col  s6">
                                <h6 className="white-text">¿Más ejemplos? Visita:</h6>
                                <ul>
                                    <li><a className="grey-text text-lighten-3"  href="https://innatodevelopers.com" target="_blank" rel="noopener noreferrer">Innato Developers</a></li>
                                    <li><a className="grey-text text-lighten-3"  href="https://github.com/InnatoDevelopers" target="_blank" rel="noopener noreferrer">GitHub Innato Developers</a></li>
                                </ul>
                            </div>
                            <div className="col s6">
                                <h6 className="white-text">Fuentes:</h6>
                                <ul>
                                <li><a className="grey-text text-lighten-3"  href="https://firebase.google.com/docs/web/setup?hl=es-419" target="_blank" rel="noopener noreferrer">Firebase</a></li>
                               
                                <li><a className="grey-text text-lighten-3"  href="https://es.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></li>
                                <li><a className="grey-text text-lighten-3"  href=" https://reacttraining.com/react-router/web/guides/quick-start" target="_blank" rel="noopener noreferrer">React Router</a></li>
                                    <li><a className="grey-text text-lighten-3"  href="https://materializecss.com" target="_blank" rel="noopener noreferrer">Materialize</a></li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            © 2019 Innato Developers
                            <a className="grey-text text-lighten-4 right" href="https://innatodevelopers.com" target="_blank" rel="noopener noreferrer">Innato Developers</a>
                        </div>
                    </div>
                </footer>

            </React.Fragment>
        )
    }
}

export default Dashboard;