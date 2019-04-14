import React, { Component, Fragment } from 'react';
import { existance, validate } from '../util/validation';
import Header from '../component/Header';
import avatar_default from '../imgs/avatar_default.jpg';
import Seperator from '../component/Seperator';
import Question from '../component/Question';
import styles from './styles/Questions';
import { FloatButton } from '../component/Button';
import { connect } from 'react-redux';
import Button from '../component/Button';
import TextInput from '../component/TextInput';
import WhiteBlank from '../component/WhiteBlank';


class Questions extends Component {
    componentDidMount() {
        if (this.props.questions.length == 0) {
            this.props.getAllQuestions();
        }
    }
    render() {
        return (
            <div>
                <Header avatarSrc={avatar_default} />
                <QuestionList questions={this.props.questions} />
                <FloatButton />
                <CreateQuestionsContainer userToken={this.props.userToken} />
            </div>
        );
    }
}
// export default Questions;

let mapState = state => ({
    questions: state.questions,
});
let mapDispatch = dispatch => ({
    getAllQuestions: () => dispatch.questions.getAll(),
});
export default connect(mapState, mapDispatch)(Questions);

function QuestionList(props) {
    if (props.questions) {
        return props.questions.map((question) => {
            return (
                <>
                    <Question title={question.title} content={question.content} />
                    <Seperator />
                </>
            );
        });

    } else {
        return null;
    }
}

class CreateQuestion extends Component {
    static validation_items = {
        title: [existance],
        content: [existance],
    }
    state = {
        titleErr: '',
        contentErr: '',
        shouldShow:true,
    }
    input_values = {
        title: '',
        content: '',
    }
    onChange = ({ target: { id, value } }) => {
        this.input_values[id] = value;
        //live-change the property of the same name in the input_values    
    }
    onBlur = ({ target: { id, value } }) => {
        console.log('on blur', value);
        console.log(id);
        this.setState({
            [id + 'Err']: existance(value),
            //e.g if this id is 'title', then it will return emailErr:existance(value)
        })
    }
    onSubmit = () => {
        console.log('submitted');
        let _errMsgs = {};
        Object.keys(CreateQuestion.validation_items).forEach((value) => {
            // console.log(this.validation_items[value]);
            // console.log(this.input_values[value]);
            _errMsgs[`${value}Err`] = validate(CreateQuestion.validation_items[value], this.input_values[value])
        });
        if (this._checkErr()) {
            this.setState(_errMsgs);
        } else {
            this.props.create && this.props.create(
            this.input_values['title'], 
            this.input_values['content'],
            this.props.userToken,
            ()=>this.setState({shouldShow:false}),
            );
        }
    }
    _checkErr = obj => {
        for (let val in obj) {
            if (obj[val]) {
                return true;
            }
            return false;
        }
    }
    render() {

        if(this.state.shouldShow){
            return (<div
                style={styles.container_create_question}
                onClick={()=>this.setState({shouldShow:false,})}
            >
                <div
                    style={styles.panel_create_question}
                onClick={(event) => {
                    // console.log('I am inner component!');
                    event.stopPropagation();
                }}
                >
                    <WhiteBlank h={40} />
                    <TextInput id="title" style={styles.title_create_question} errMsg={this.state['titleErr']} onBlur={this.onBlur} onChange={this.onChange} placeholder="Title" />
                    <WhiteBlank h={8} />
                    <TextInput id="content" style={styles.content_create_question} errMsg={this.state['contentErr']} onBlur={this.onBlur} onChange={this.onChange} placeholder="Content" />
                    <div style={styles.blank} />
                    {/* <div style={{width:'50%',display:'flex', flexDirection:'row',justifyContent:'end', alignItems:'center',}}>
                <Button label="Ask" style={styles.button_create_question} onClick={this.onSubmit} />
                </div>                 */}
                    <div className="container-fluid ">
                        <div className="row w-100">
                            <div className="col-4"></div>
                            <div className="col-4"></div>
                            <div className="col-4">
                                <Button label="Ask" onClick={this.onSubmit} />
                            </div>
                        </div>
                    </div>
                    <WhiteBlank h={40} />
                </div>
            </div>
                );
        }else{
            return null;
        }  
    }
}

let mapStateCreateQuestion = state => ({
    questions: state.questions,
});
let mapDispatchCreateQuestion = dispatch => ({
    create: (title,content,user_token, success_callback) => dispatch.questions.create({title,content,user_token,success_callback})
});
const CreateQuestionsContainer = connect(null, mapDispatchCreateQuestion)(CreateQuestion);