import React, { Component } from 'react';
import firebase from 'firebase';
import LoadingCmpt from '../../generics/loading.cmpt';
import M from 'materialize-css';
import { Link } from 'react-router-dom';


class UsersList extends Component {

    state = {
        users: [],
        loading: true
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.fixed-action-btn');
         M.FloatingActionButton.init(elems, {});
    }


    componentWillMount() {
        //Obtiene todos los usuarios de la base de datos.
        firebase.database().ref("/users").on('value', (snap) => {
            if (snap.val()) {
                let users = [];
                snap.forEach((value, index) => {
                    let user = value.val();
                    user.id = value.key;
                    users.push(user);
                });
                this.setState({ users, loading: false });
            } else {
                this.setState({ loading: false });
            }
        })

    }


    render() {
        if (this.state.loading) {
            return <LoadingCmpt />
        }

        return (
            <div className="container">

                <div className="row  z-depth-4">
                    <div className="col s12 center-align blue lighten-1">
                        <h6 className="white-text">Usuarios</h6>
                    </div>
                    <div className="row">

                        <table className="highlight">
                            <thead>
                                <tr>
                                    <th className="center-align hide-on-small-only">Nombre</th>
                                    <th className="center-align">Correo</th>
                                    <th className="center-align hide-on-small-only">Teléfono</th>
                                    <th className="center-align">Editar</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    this.state.users.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="center-align hide-on-small-only">{value.name}</td>
                                                <td>{value.email}</td>
                                                <td className="center-align hide-on-small-only">{value.phone}</td>
                                                <td className="center-align ">
                                                    <Link to={`/dashboard/user/${value.id}`} className="btn-flat waves-effect waves-light">
                                                        <i className="material-icons cursor-pointer ">edit</i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <Link to="/dashboard/user" className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
            </div>
        )
    }


}


export default UsersList;