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
            let request = axios({
                method: 'post',
                url : SERVER_ADDRESS + '/questions',
                headers:{
                  'Authorization': JSON.stringify({
                    user_token:{
                      user_id: payload.user_token.user_id,
                      key: payload.user_token.key,
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
                request.then((response)=>{
                if(response.status == 201) {
                  // payload.success_callback && payload.success_callback();
                    this.setState({should_redirect: true});
                }
                else{
                  alert('Unexpected error happened, please contact lalala@gmail.com');
                }
              })
              .catch((error)=>{
                alert('Unexpected error happened, please contact lalala@gmail.com');
              })
              // request.then((response)=>{
              //   console.log(response);
              //   if(response.status == 201 ){
              //     this.setState({should_redirect: true});
              //   }else if(response.status == 400){
              //     let error_first = response.data.errors[0];
              //     if(error_first.code == 'duplicated_field'){
              //       alert("The email has been registered!");
              //     }else{
              //       alert("Unexpected error happened, please contact lalala@gmail.com");
              //     }
              //   }
              // }, (error)=>{
              //   alert("Unexpected error happened, please contact lalala@gmail.com");
              // });
        }
    }),
}

