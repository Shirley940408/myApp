import React, { Component } from 'react';
import UserFetcher from '../component/UserFetcher';

export default class User extends Component{
  
  render(){
    const { id }= this.props.match.params;
    console.log(id);
    return(
      <div style={{width:50, height:50, backgroundColor:'red'}}>
      <UserFetcher id={id}>
      {user=>{
        return(
          <div>
            {JSON.stringify(user)}
          </div>
        )
      }}
      </UserFetcher>
      </div>
    );
  }
}
