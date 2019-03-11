import { brightOrange,lightGrey } from './color.js';
const styles={
    container:{

    },
    border:0,
    // borderBottom:'1px solid #D8D8D8',
    padding:0,
    height:'29px',
    fontSize:'29px',
    width:'100%',
    // margin:0,
    marginBottom:'5px',
    // line:{
    //     // padding:'2px',
    //     marginLeft:'auto',
    //     marginRight:'auto',
    //     // border:'1px solid #D8D8D8',
    //     width:'100%',
    // },
    errorBlock:{
        // marginLeft:'auto',
        // marginRight:'auto',
        display:'inline-flex',
        justifyContent:'start',
        width:'100%',
        height:16.5,
        fontSize:12,
        fontFamily:'Roboto-Regular',
    },
    line: (err) => ({
        border:'0.5px solid' + (err ? brightOrange:lightGrey),
        marginLeft:'auto',
        marginRight:'auto',
        width:'100%',
    }),

}
export default styles;