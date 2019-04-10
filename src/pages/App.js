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
      {/* // <Signup/>
      // <Login/>
      // window.location.pathname === '/login' ? <Login /> :<Signup/> */}
      {/* {this.state.user_token ? */}
      <Switch>      
      {/* <Route path='/Signup' component={Signup}/> */}
      <Route path='/questions' render={()=><Questions userToken ={this.state.user_token}/>}/>
      <Redirect to ='/questions'/>
      </Switch>
      {/* : */}
      {/* <Switch> */}
      {/* <Route path={['/login','/','/signup']} component={SignInSignUp}/> */}
      {/* <Route exact path={['/login','/','/signup']} render={()=><SignInSignUp onLogin ={this.onLogin}/>}/>
      <Redirect to='/login' />
      </Switch> */}

      {/* } */}
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


export default App;
