import React, { Component } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import avatar_default from '../imgs/avatar_default.jpg';
import Seperator from '../component/Seperator';
import Question from '../component/Question';
 class Questions extends Component{
     state={
         questions:null,
     }
    componentDidMount(){
        let request=axios({
        method:'get',
        url:'https://big-fish-luqiuyuan.herokuapp.com/questions',
        });

        request.then((response)=>{
            this.setState({
                questions: response.data.questions,
            });
        });
    }
    render(){
        return(
            <div>
                <Header avatarSrc={avatar_default}/>
                <QuestionList questions={this.state.questions}/>            
            </div>
        );   


    }
}
export default Questions;

function QuestionList(props){
    if(props.questions){
       return props.questions.map((question)=>{
            return(
                <>
                <Question title={question.title} content={question.content}/>
                <Seperator/>   
                </>    
            );
       });

    }else{
        return null;
    }
}