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
                <footer>

                </footer>

            </React.Fragment>
        )
    }
}

export default Dashboard;