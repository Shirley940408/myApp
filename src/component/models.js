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
            let request=axios({
                method:'get',
                url : SERVER_ADDRESS + '/questions',
                });
            request.then((response)=>{
                dispatch.questions.set(response.data.questions);
            });
        },
        create(payload, state){
          console.log(payload);
          if(!state.user_token){
            alert("You have not login!");
            return;
          }
            let request = axios({
                method: 'post',
                url : SERVER_ADDRESS + '/questions',
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
                validateStatus: (status) =>{
                  if((status >=200 && status < 300) || (status >=400 || status <500) ){
                    return true;
                  }else{
                    return false;
                  }
                }
                });
              //   request.then((response)=>{
              //   if(response.status == 201) {
              //     // payload.success_callback && payload.success_callback();
              //       this.setState({should_redirect: true});
              //   }
              //   else{
              //     alert('Unexpected error happened, please contact lalala@gmail.com');
              //   }
              // })
              // .catch((error)=>{
              //   alert('Unexpected error happened, please contact lalala@gmail.com');
              // })
              request.then((response)=>{
                console.log(response);
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
              }, (error)=>{
                alert("Unexpected error happened, please contact lalala@gmail.com");
              });
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
      let request = axios({
        method: 'post',
        url : SERVER_ADDRESS + '/user_tokens',
        data: {
          credential: {
            email: payload.email,
            password: payload.password,
          }
        },
        validateStatus: (status) =>{
          if((status >=200 && status < 300) || (status >=400 || status <500) ){
            return true;
          }else{
            return false;
          }
        }
      });
      request.then((response)=>{
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
        }else{
          alert('Unexpected error happened, please contact lalala@gmail.com');
        }
      },()=>{
        alert('Unexpected error happened, please contact lalala@gmail.com');
      });
    }
  }),
}