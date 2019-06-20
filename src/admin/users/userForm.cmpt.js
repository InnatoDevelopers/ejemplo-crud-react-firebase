import React, { Component } from 'react';
import LoadingCmpt from '../../generics/loading.cmpt';
import firebase from 'firebase';
import M from 'materialize-css';
import {Link} from 'react-router-dom';

class UserForm extends Component {

    state = {
        name: "",
        email: "",
        phone: "",
        loading: true
    }

    changeValues = (event) => {
        let { id, value } = event.target;

        this.setState({ [id]: value });
    }

    componentWillMount() {
        if (this.props.match) {
            let { id } = this.props.match.params;
            if (id) {
                this.getInfoUser(id)
            }else{
                this.setState({loading:false});
            }
        }
    }

    getInfoUser(id) {
        firebase.database().ref(`/users/${id}`).once('value', (snap) => {
            if (snap.val()) {
                let { name, email, phone } = snap.val();
                this.setState({ name, email, phone, id, loading: false }, () => {
                    M.updateTextFields();
                });
            } else {
                this.setState({ loading: false }, () => {
                    M.toast({ html: "No se encontro al usuario", classes: 'red darken-1' })
                });
            }
        });
    }

    submitForm=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        let ref = firebase.database().ref(`/users`);
        let data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email
        };

        if(this.state.id){
            firebase.database().ref(`/users/${this.state.id}`).update(data).then((result)=>{

                this.setState({loading:false},()=>{
                    M.updateTextFields();
                    M.toast({ html: "Se actualizo el usuario correctamente.", classes: 'green darken-1' });
                });
            
            }).catch((error)=>{
               // console.log(error);
                this.setState({loading:false},()=>{
                    M.updateTextFields();
                    M.toast({ html: "No se logro actualizar al usuario", classes: 'red darken-1' });
                });
             
            });
        }else{

            let key = ref.push().key;
            ref = firebase.database().ref(`/users/${key}`).set(data).then((result)=>{
                this.setState({loading:false,id:key},()=>{
                    M.updateTextFields();
                    M.toast({ html: "Se guardo el usuario correctamente.", classes: 'green darken-1' });
                });
            }).catch((error)=>{
                this.setState({loading:false},()=>{
                    M.updateTextFields();
                    M.toast({ html: "No se logro guardar al usuario", classes: 'red darken-1' })
                });
            });

            
        }

    }

    render() {
        if (this.state.loading) {
            return <LoadingCmpt />
        }
        return (
            <section id="userForm" className="container">
                <div className="row">
                    <div className="col s12 left-align">
                        <Link to={"/dashboard"}> <i className="material-icons cursor-pointer left">arrow_back</i> <i>Dashboard</i></Link>
                    </div>
                </div>
                <div className="row  z-depth-4">
                    <div className="col s12 center-align blue lighten-1">
                        <h6 className="white-text">{this.state.id ? "Edición de usuario" : "Nuevo Usuario"}</h6>
                    </div>
                    <form className="col s12" onSubmit={this.submitForm}>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="name" type="text" className="validate"
                                    value={this.state.name}
                                    onChange={this.changeValues}
                                />
                                <label htmlFor="name">Nombre:</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="text" className="validate"
                                    value={this.state.email}
                                    onChange={this.changeValues}
                                />
                                <label htmlFor="email">Correo electrónico:</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">local_phone</i>
                                <input id="phone" type="text" className="validate"
                                    value={this.state.phone}
                                    onChange={this.changeValues}
                                />
                                <label htmlFor="phone">Teléfono:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center-align">
                                <button type="submit" className="btn waves-effect blue lighten-1"><i className="material-icons left">send</i>Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default UserForm;