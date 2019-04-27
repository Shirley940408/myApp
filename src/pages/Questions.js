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
import List from '../component/List';
import Answers from './Answers'
import { Route, Switch, withRouter } from 'react-router-dom';
import Answer from '../component/Answer';

class Questions extends Component {
    componentDidMount() {
        if (this.props.questions.length == 0) {
            this.props.getAllQuestions();
        }
    }
    render() {
        return (
            <>
                <Header avatarSrc={avatar_default} />
                <Switch>
                    <Route path='/questions/:question_id' render={(props) => {
                        return <div style={styles.AnswerListContainer}>
                            <Answers {...props} />
                        </div>
                    }} />
                    <Route path='/questions' render={() => {
                        return <div style={styles.questionListContainer}>
                            <QuestionList questions={this.props.questions} />
                            <FloatButton onClick={() => {
                                this._create_question_ref && this._create_question_ref.show();
                            }} />
                        </div>

                    }} />
                </Switch>

                <CreateQuestionsContainer
                    ref={this._createQuestionRef}
                    userToken={this.props.userToken} />
            </>
        );
    }
    _createQuestionRef = ref => {
        this._create_question_ref = ref
    }
    //被改变状态的组件传地址，改变别的组件状态的组件接地址
}
// export default Questions;

let mapState = state => ({
    questions: state.questions,
});
let mapDispatch = dispatch => ({
    getAllQuestions: () => dispatch.questions.getAll(),
});
export default withRouter(connect(mapState, mapDispatch)(Questions));
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
function QuestionList(props) {
    const { questions } = props;
    // console.log(question)
    return <List
        data={questions}
        keyExtractor={item => item.id}
        renderRow={question => {
            // console.log('question key', question.id)
            return <Question
                id={question.id}
                title={question.title}
                content={question.content}
                numOfLikes={question.number_of_likes}
                liked={question.liked}
            />
        }} />

}

class CreateQuestion extends Component {
    static validation_items = {
        title: [existance],
        content: [existance],
    }
    state = {
        titleErr: '',
        contentErr: '',
        shouldShow: false,
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
    show = () => {
        this.setState({ shouldShow: true });
    }
    hide = () => {
        this.setState({ shouldShow: false });
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
                this.hide,
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

        if (this.state.shouldShow) {
            return (<div
                style={styles.container_create_question}
                onClick={() => this.setState({ shouldShow: false, })}
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
        } else {
            return null;
        }
    }
}

let mapStateCreateQuestion = state => ({
    questions: state.questions,
});
let mapDispatchCreateQuestion = dispatch => ({
    create: (title, content, success_callback) => dispatch.questions.create({ title, content, success_callback })
});
const CreateQuestionsContainer = connect(null, mapDispatchCreateQuestion, null, { forwardRef: true })(CreateQuestion);