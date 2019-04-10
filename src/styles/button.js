import {brightOrange} from'./color';
import { COLOR_THEME } from '../constants';

const styles= {
    container_float_button:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:COLOR_THEME,
        position:'fixed',
        right:25,
        bottom:25,
        cursor:'pointer',
        //styling child
        display:'flex',
        flexDirection:'column',
        justifyContent:'Center',
        alignItems:'Center',
    },
    icon:{
        width:35,
        height:35,
    },
    style:{
        backgroundColor:brightOrange,
        maxHeight: 50,
        minHeight: 20,
        width:'77.2%',
        outline:'none',
        color: 'white',
        borderRadius: 5,
        fontSize: 25,
        marginBottom:15
    },
    // className:'btn text-white mb-3 b-0 p-0'
}

export default styles;