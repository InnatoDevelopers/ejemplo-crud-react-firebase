import React, { Component } from 'react';
import firebase from 'firebase';
import { loginWithEmailAndPassword } from './login.code';
import M from 'materialize-css';
import './login.css';


class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { email, password } = this.state;
        loginWithEmailAndPassword(email, password).then((user) => {
            if (user.user) {
                this.props.history.push("/dashboard");
            }
        }).catch((error) => {
            M.toast({ html: error.error, classes: 'red darken-1' })
        });
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push("/dashboard");
            }
        });
    }

    changeValues = (event) => {
        let { id, value } = event.target;

        this.setState({ [id]: value }, () => {
            M.updateTextFields();
        });
    }

    render() {
        return (
            <div className="container loginContainer">
                <div className="row login-content valign-wrapper">
                    <div className="col s12 login-body ">
                        <div className="col s12 center-align blue lighten-1 z-depth-4">
                            <h6 className="white-text">Iniciar Sesión</h6>
                        </div>
                        <form className="col s12 white z-depth-4" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="email" type="text" className="validate"
                                        value={this.state.email}
                                        onChange={this.changeValues}
                                    />
                                    <label htmlFor="email">Correo electrónico:</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input id="password" type="password" className="validate"
                                        value={this.state.password}
                                        onChange={this.changeValues}
                                    />
                                    <label htmlFor="password">Contraseña: </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 center-align">
                                    <button type="submit" className="btn waves-effect blue lighten-1"><i className="material-icons left">send</i>Entrar</button>
                                </div>
                            </div>
                        </form>
                        <div className="col s12 center-align blue lighten-1 z-depth-4 footerForm">

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;