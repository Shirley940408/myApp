import React, { Fragment } from 'react';
import Seperator from './Seperator';

function List({ data, renderRow, keyExtractor, renderEmpty = () => null }) {
  if (data) {
    return data.map((item, index) =>
      <Fragment key={keyExtractor(item, index)}>
        {renderRow(item, index)}
        {index !== data.length - 1 && <Seperator />}
      </Fragment>);
  } else {
    return renderEmpty();
  }
}
export default List;
// if (props.questions) {
//     return props.questions.map((question) => {
//         return (
//             <>
//                 <Question title={question.title}  content={question.content} />
//                 <Seperator />
//             </>
//         );
//     });

// } else {
//     return null;
// }

// diff 算法 o(n^3)  --> o(n)

{/* <div>
  {true && <Question1 /> }
  <Question2 />
  <Question3 />
  <Question4 />
</div>

<div>
  {false && <Question1 /> }
  <Question2 />
  <Question3 />
  <Question4 />
</div> */}

{/* 

  <div>
    {
      [
      <Question1 />,
      <Question2 />,
      <Question3 />,
      <Question4 />
    ] // React.createElement([
      Question,
      Question,
      Question
    ])
    }
  </div>


[
  <Question1 />,
  <Question2 />,
  <Question3 />,
  <Question4 />
] 

--->
[
  <Question2 />,
  <Question3 />,
  <Question4 />
]  */}


// class Light extends Component {
//   state = {
//     is_good: false
//   }

//   getIsGood = () => {
//     setTimeout(() => this.setState({
//       is_good: true
//     }), 1000)
//   }

//   componentDidUpdate = (prevProps) => {
//     if (!prevProps.hasElectricity && this.props.hasElectricity) {
//       this.getIsGood()
//     }
//   }

//   render() {
//     const { hasElectricity } = this.props;
//     const condition = getCondition()
//     return condition ? '亮' : '灭'
//   }

//   getCondition = () => this.state.is_good && this.props.hasElectricity
// }

// <Light hasElectricity={true} />  // 亮 or 灭
