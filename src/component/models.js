import {SERVER_ADDRESS} from '../constants';
import axios from 'axios';
export const questions = {
    state: [],
    reducers:{
        set(state,payload){
            return payload;
        }
    },
    effects:dispatch=>({
        getAll(payload,state){
          callAPI({
          method: 'get',
          uri: '/questions',
          }).then(
            response=>{
              dispatch.questions.set(response.data.questions);
            }
          )
        },
        create(payload, state){
          console.log(payload);
          if(!state.user_token){
            alert("You have not login!");
            return;
          }
          callAPI({
            method: 'post',
            uri: '/questions',
            headers:{
              'Authorization': JSON.stringify({
                user_token:{
                  user_id: state.user_token.user_id,
                  key: state.user_token.key,
                }
              }),
            },
            data: {
              question: {
                title: payload.title,
                content:payload.content,
              }
            },
            errHandler: status => status == 400,
          }).then(
            response =>{
              if(response.status == 201 ){
                payload.success_callback && payload.success_callback();
                dispatch.questions.getAll();
                // this.setState({should_redirect: true});
              }else if(response.status == 400){
                let error_first = response.data.errors[0];
                if(error_first.code == 'duplicated_field'){
                  alert("The email has been registered!");
                }else{
                  alert("Unexpected error happened, please contact lalala@gmail.com");
                }
              }
            }
          )
        }
    }),
}

export const user_token = {
  state: null,
  reducers:{
    set(state,payload){
      return payload;
    }
  },
  effects: dispatch=>({
    create(payload,state){
      callAPI({
        uri:'/user_tokens',
        method:'post',
        data: {
          credential: {
            email: payload.email,
            password: payload.password,
          }
        },
        errHandler: status => status == 400
      }).then(
        response => {
          if(response.status == 201) {
            dispatch.user_token.set(response.data.user_token);
            payload.success_callback && payload.success_callback();
          }else if(response.status == 400){
            let error_first = response.data.errors[0];
            if(error_first.code == 'invalid_credential'){
              alert('Email or password is wrong!');
            }else{
              alert('Unexpected error happened, please contact lalala@gmail.com');
            }
          }
        }
      )
    }
  }),
}


export const users={
  state: {},
  reducers:{
    set(state,payload){
      let state_new = {...state, [payload.id]: payload };
      return state_new;//need to be written as pure function
    }
  },
  effects: dispatch =>({
    create(payload,state){
      callAPI({
        method: 'post',
        uri:'/users',
        data: {
          user: {
            email: payload.email,
            password: payload.password,
            name: payload.name,
          }
        },
        errHandler: status => status == 400,
      }).then(
        response => {
          if(response.status == 201 ){
            alert("register successful!");
            payload.success_callback && payload.success_callback();
            dispatch.users.set(response.data.user);
          }else if(response.status == 400){
            let error_first = response.data.errors[0];
            if(error_first.code == 'duplicated_field'){
              alert("The email has been registered!");
            }else{
              alert("Unexpected error happened, please contact lalala@gmail.com");
            }
          }
        }
      )
    }    
  })
}
function callAPI({uri, method='get', data, errHandler=()=>false, headers,}){
  const request = axios({
    method,
    url : SERVER_ADDRESS + uri,
    data,
    headers,
    validateStatus: (status) =>{
      if((status >=200 && status < 300) || errHandler(status) ){
        return true;
      }else{
        return false;
      }
    }
  });
  return request.catch((error)=>{
    alert("Unexpected error happened, please contact lalala@gmail.com")
  });
}

