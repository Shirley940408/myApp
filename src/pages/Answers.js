import React from 'react';
import Question from '../component/Question';
import List from '../component/List';
import Answer from '../component/Answer';
import { connect } from 'react-redux';
import WhiteBlank from '../component/WhiteBlank';
class Answers extends React.Component{
  render(){
    const {
      answers
    }= this.props;
    return(
      <>
      <Question/>
      <WhiteBlank h={20}/>
      <List
      data={[]}
      renderRow={answer => <Answer/>}
      />
      </>
    );
  }
}
const mapState = (state, own_props) =>({
  answers: state.answers[own_props.qID]
})
export default connect(mapState)(Answers);