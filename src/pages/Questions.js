import React, { Component } from 'react';

import Header from '../component/Header';
import avatar_default from '../imgs/avatar_default.jpg';
import Seperator from '../component/Seperator';
import Question from '../component/Question';
import {connect} from 'react-redux';
 class Questions extends Component{
    componentDidMount(){
        if(this.props.questions.length == 0){
            this.props.getAllQuestions();
        }
    }
    render(){
        return(
            <div>
                <Header avatarSrc={avatar_default}/>
                <QuestionList questions={this.props.questions}/>            
            </div>
        );   


    }
}
// export default Questions;

let mapState = state =>({
    questions: state.questions,
});
let mapDispatch = dispatch =>({
    getAllQuestions: () => dispatch.questions.getAll(),
});
export default connect(mapState,mapDispatch)(Questions);

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