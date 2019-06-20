import React,{Component} from 'react';
import { Route, Switch} from 'react-router-dom';

import UserForm from '../admin/users/userForm.cmpt';
import UsersList from '../admin/users/usersList.cmpt';

class AdminRouter extends Component{

    render(){
        return(
           
            <Switch>
                <Route path="/dashboard/user/:id?" component={UserForm} />
                <Route path="/dashboard" component={UsersList} />
            </Switch>
         
        )
    }

}

export default AdminRouter;