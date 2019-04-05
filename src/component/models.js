
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
                url:'https://big-fish-luqiuyuan.herokuapp.com/questions',
                });
        
                request.then((response)=>{
                    dispatch.questions.set(response.data.questions);
                });
        }
    }),

}

export const user_toke={
    state:null,
}