import React, { Component } from 'react';
// import Signup from './SignInSignUp';
import SignInSignUp from './SignInSignUp';
import {Route, Switch, }from 'react-router-dom';
import Questions from './Questions';
class App extends Component {

  render() {
    return (  
      // <Signup/>
      // <Login/>
      // window.location.pathname === '/login' ? <Login /> :<Signup/>
      <Switch>      
      {/* <Route path='/Signup' component={Signup}/> */}
      <Route path='/questions' component={Questions}/>
      <Route path={['/login','/','/signup']} component={SignInSignUp}/>
      </Switch>
    );
  }
}
  // function Route(props){
  //   return window.location.pathname ? <props.component/>:null;
  // }


export default App;
