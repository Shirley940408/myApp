import React from 'react';
import Question from '../component/Question';
import List from '../component/List';
import Answer from '../component/Answer';
import { connect } from 'react-redux';
import WhiteBlank from '../component/WhiteBlank';
import { existance, validate } from '../util/validation';
import TextInput from '../component/TextInput';
import Text from '../component/TextCostume';
import question_styles from './styles/QuestionList';
import styles from './styles/Answers';
import Button ,{ FloatButton } from '../component/Button';

export class Answers extends React.Component {

  state = {
    should_show_answer_box: false,
    err_msg: '',
    new_answer: ''
  }

  componentDidMount() {
    const { match: { params: { question_id } }, getAnswers } = this.props
    getAnswers(question_id)
  }

  clickAdd = () => {
    this.setState({
      should_show_answer_box: true
    })
  }

  onAnswerChange = ({ target: { value } }) => {
    this.setState({
      err_msg: '',
      new_answer: value
    })
  }

  onBlur = ({ target: { value } }) => {
    const err_msg = validate(existance, value)
    if (err_msg) {
      this.setState({ err_msg })
    }
  }

  clear = () => this.setState({
    err_msg: '',
    new_answer: '',
    should_show_answer_box: false
  })

  onSubmit = () => {
    const { new_answer } = this.state
    const {
      addAnswer,
      getAnswers,
      match: { params: { question_id } }
    } = this.props
    const err_msg = validate(existance, new_answer)
    if (err_msg) {
      this.setState({ err_msg })
    }
    else {
      addAnswer({ question_id, content: new_answer })
        .then(() => {
          this.clear()
          getAnswers(question_id)
        })
    }
  }


  render() {
    const { question, answers } = this.props
    const { should_show_answer_box, new_answer, err_msg } = this.state
    return (
      <>
        <div style={question_styles.question_list_container}>
          {question && <Question
            id={question.id}
            title={question.title}
            content={question.content}
            style={question_styles.question}
          />}
        </div>

        <WhiteBlank h={20} />

        {
          should_show_answer_box && <>
            <div style={styles.answer_box}>
              <TextInput style={styles.new_answer_content} errMsg={err_msg} value={new_answer} name="answer" placeholder="Write your answer..." onChange={this.onAnswerChange} />
              <WhiteBlank h={164} />
              <Button label="Answer" style={styles.submit_btn} onClick={this.onSubmit} />
            </div>
            <WhiteBlank h={20} />
          </>
        }

        <div style={question_styles.question_list_container}>
          <List
            data={answers}
            renderEmpty={() => <Text type="light">no more answers</Text>}
            keyExtractor={item => item.id}
            renderRow={({ id, content, user_id, created_at, number_of_likes }) =>
              <Answer
                key={id}
                style={question_styles.question}
                content={content}
                userID={user_id}
                createAt={created_at}
                numOfLikes={number_of_likes}
              />}
          />
        </div>

        <FloatButton style={question_styles.button_add} onClick={this.clickAdd} />
      </>
    )
  }
}

const mapstate = (state, own_props) => ({
  question: state.questions.find(q => q.id == own_props.match.params.question_id),
  answers: state.answers[own_props.match.params.question_id]
})

const mapDispatch = dispatch => ({
  getAnswers: question_id => dispatch.answers.getAnswers(question_id),
  addAnswer: ({ question_id, content }) => dispatch.answers.create({ question_id, content })
})


export default connect(mapstate, mapDispatch)(Answers)