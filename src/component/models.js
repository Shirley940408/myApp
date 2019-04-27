import { SERVER_ADDRESS } from '../constants';
import axios from 'axios';
import { get } from 'https';
export const questions = {
  state: [],
  reducers: {
    set(state, payload) {
      return payload;
    },
    // setOne(state,payload){
    //    index=state.findIndex(question=>{
    //     return question.id == payload.id;
    //   });
    //   let state_new = [...state];
    //   if(index > -1){
    //     state_new[index] = payload;
    //   }
    // }
  },
  effects: dispatch => ({
    getAll(payload, state) {
      callAPI({
        method: 'get',
        uri: '/questions',
        headers:{
          Authorization:JSON.stringify({user_token: state.user_token})
        },
      }).then(
        response => {
          dispatch.questions.set(response.data.questions);
        }
      )
    },
    // async get(payload,rootState){
    //   const response =callAPI({
    //     uri:`/questions/${question_id}`
    //   })
    // },
    create(payload, state) {
      console.log(payload);
      if (!state.user_token) {
        alert("You have not login!");
        return;
      }
      callAPI({
        method: 'post',
        uri: '/questions',
        headers: {
          'Authorization': JSON.stringify({
            user_token: {
              user_id: state.user_token.user_id,
              key: state.user_token.key,
            }
          }),
        },
        data: {
          question: {
            title: payload.title,
            content: payload.content,
          }
        },
        errHandler: status => status == 400,
      }).then(
        response => {
          if (response.status == 201) {
            payload.success_callback && payload.success_callback();
            dispatch.questions.getAll();
            // this.setState({should_redirect: true});
          } else if (response.status == 400) {
            let error_first = response.data.errors[0];
            if (error_first.code == 'duplicated_field') {
              alert("The email has been registered!");
            } else {
              alert("Unexpected error happened, please contact lalala@gmail.com");
            }
          }
        }
      )
    },
    async like({question_id,success_callback},rootState){
      const response = await callAPI({
        method:'post',
        uri:`/questions/${question_id}/like`,
        headers:{
          Authorization:JSON.stringify({user_token: rootState.user_token})
        },
        errHandler: status =>status == 404||status == 400
      });
      if(response.status === 201){
        success_callback && success_callback();
      }
     },
     async dislike({question_id,success_callback},rootState){
      const response = await callAPI({
        method:'delete',
        uri:`/questions/${question_id}/like`,
        headers:{
          Authorization:JSON.stringify({user_token: rootState.user_token})
        },
        errHandler: status =>status == 404||status == 400
      });
      if(response.status === 200){
        success_callback && success_callback();
      }
     },
  }),
}

export const user_token = {
  state: JSON.parse(localStorage.getItem('user_token')),
  reducers: {
    set(state, payload) {
      return payload;
    }
  },
  effects: dispatch => ({
    create(payload, state) {
      callAPI({
        uri: '/user_tokens',
        method: 'post',
        data: {
          credential: {
            email: payload.email,
            password: payload.password,
          }
        },
        errHandler: status => status == 400
      }).then(
        response => {
          if (response.status == 201) {
            dispatch.user_token.set(response.data.user_token);
            localStorage.setItem('user_token', JSON.stringify(response.data.user_token));
            payload.success_callback && payload.success_callback();
          } else if (response.status == 400) {
            let error_first = response.data.errors[0];
            if (error_first.code == 'invalid_credential') {
              alert('Email or password is wrong!');
            } else {
              alert('Unexpected error happened, please contact lalala@gmail.com');
            }
          }
        }
      )
    }
  }),
}


export const users = {
  state: {},
  reducers: {
    set(state, payload) {
      let state_new = { ...state, [payload.id]: payload };
      return state_new;//need to be written as pure function
    }
  },
  effects: dispatch => ({
    async getUser(user_id,state){
      const response = await callAPI({
        uri:'/users/'+ user_id,
        headers:{
          Authorization: JSON.stringify({
            user_token:{
              user_id: state.user_token.user_id,
              key:state.user_token.key,
            },
          })
        }
      });
      dispatch.users.set(response.data.user);
    },
    create(payload, state) {
      callAPI({
        method: 'post',
        uri: '/users',
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
          if (response.status == 201) {
            alert("register successful!");
            payload.success_callback && payload.success_callback();
            dispatch.users.set(response.data.user);
          } else if (response.status == 400) {
            let error_first = response.data.errors[0];
            if (error_first.code == 'duplicated_field') {
              alert("The email has been registered!");
            } else {
              alert("Unexpected error happened, please contact lalala@gmail.com");
            }
          }
        }
      )
    },
  })
}
function callAPI({ uri, method = 'get', data, errHandler = () => false, headers, }) {
  const request = axios({
    method,
    url: SERVER_ADDRESS + uri,
    data,
    headers,
    validateStatus: (status) => {
      if ((status >= 200 && status < 300) || errHandler(status)) {
        return true;
      } else {
        return false;
      }
    }
  });
  return request.catch((error) => {
    alert("Unexpected error happened, please contact lalala@gmail.com")
  });
}

export const answers= {
  state:{},
  reducers: {
    update(state, payload){
      return {
        ...state,
        ...payload,
      }
    }
  },
  effects: dispatch =>({
    async getAnswers(question_id,rootState){
      const response = await callAPI({
        uri:`/questions/${question_id}/answers`,
        user_token: rootState.user_token,
        headers:{
          Authorization: JSON.stringify({user_token: rootState.user_token})
        },
        errHandler: status =>status == 404
      })
      if(response.status == 200){
        dispatch.answers.update({
          [question_id]:response.data.answers
        })
      }
    },
     async create({ question_id, content }, rootState){
       const response = await callAPI({
         method :'post',
         uri:`/questions/${question_id}/answers`,
         headers:{
           Authorization:JSON.stringify({user_token: rootState.user_token})
         },
         data:{
           answer:{
             content
           }
         }
       })
       return response.data
     },
     async like({question_id},rootState){
      const response = await callAPI({
        method:'post',
        uri:`/questions/${question_id}/like`,
        headers:{
          Authorization:JSON.stringify({user_token: rootState.user_token})
        },
        errHandler: status =>status == 404||status == 400
      });
     },
     async dislike({question_id},rootState){
      const response = await callAPI({
        method:'delete',
        uri:`/questions/${question_id}/like`,
        headers:{
          Authorization:JSON.stringify({user_token: rootState.user_token})
        },
        errHandler: status =>status == 404||status == 400
      });
     },
  })
}
