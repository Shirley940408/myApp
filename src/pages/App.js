import React, { Component } from 'react';
// import Signup from './SignInSignUp';
import SignInSignUp from './SignInSignUp';
import {Route, Switch, Redirect,BrowserRouter }from 'react-router-dom';
import Questions from './Questions';
class App extends Component {

  state={
    user_token: null,
  }
  render() {
    return (
 
      <BrowserRouter>
        <>
          <Switch>
            <Route path="/questions" render={() => <Questions userToken={this.state.user_token} />} />
            <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp onLogin={this.onLogin} />} />
            <Redirect to="/login"/>
          </Switch>
          {/* <Popups ref={register} /> */}
        </>
      </BrowserRouter>

    );
  }
  onLogin=(user_token)=>{
    this.setState({user_token});
  }
}
  // function Route(props){
  //   return window.location.pathname ? <props.component/>:null;
  // }


export default App ;
