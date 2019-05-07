import {brightOrange} from'./color';
import { COLOR_THEME, COLOR_YAQING} from '../constants';

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
    container_edit_button:{
        //styling self
        cursor:'pointer',
        //styling children
        display:'flex',
        flexDirection:'row',
        justifyCfontern:'flex-start',
        alignItems:'center',
      },
      icon_edit:{
        width:26,
        height:25,
      },
      label_edit:{
        marginleft: 15,
      },
      button_small_positive: {
        // self styles
        width: 193,
        height: 50,
        backgroundColor: COLOR_THEME,
        borderRadius: 5,
        cursor: 'pointer',
        // children styles
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button_small_negative: {
        // self styles
        width: 193,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        cursor: 'pointer',
        borderWidth: 1,
        borderColor: COLOR_YAQING,
        // children styles
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
}

export default styles;