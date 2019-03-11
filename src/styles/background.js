import {brightOrange, lightGrey,darkGrey} from './color.js';

const styles={
    container:{
        // height:'100vh',
        // backgroundImage:'url('+bgpic+')',
        // backgroundPosition:'center',
    },
    container_class:`container-fluid position-relative p-0`,
                    
    image:{
        height:'100vh'
    },
    image_class:`postion-absolute w-100`,

    panel:{
        container:{top:'12.8%'},
        container_class:'container-fluid position-absolute text-center p-0',
        space:{
            height:'80.4%'
        },
        space_class:'row m-0 d-flex justify-content-center',
        footer:{
            backgroundColor:lightGrey,
            height:'19.6%',
                      
        },
        footer_class:'row m-0 align-items-center',
        footer_width:'col'
    },
    panel_row:{
        height:'58.5vh',width:'82.5vw'
    },
    panel_row_class:'row mx-auto',
    panel_col:{height:"100%"},
    panel_col_class:'col-lg-4 col-md-6 bg-white mx-auto p-0',
    text_title:{
        width:'100%',
        fontSize: 50,
        color:brightOrange,
        marginTop: '1em',
        fontFamily:'Russo One',
        marginBottom:0,
        marginLeft:'auto',
      
    },
    text_bottom_left:{
        fontSize:23,  
        color:darkGrey      
    },
    text_bottom_right:{
        fontSize:23,
        color:brightOrange      
    }
}

export default styles;