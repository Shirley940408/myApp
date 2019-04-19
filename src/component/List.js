import React from 'react';
import Seperator from './Seperator';

function List({data,renderRow, renderEmpty = () => null}){
    if(data){
       return data.map((item,index) =>
         <>
         {renderRow(item, index)}
         {index!==data.length -1 && <Seperator/>}
         </>);
    }else{
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