

const styles = theme => ({
    listItem: {
      cursor: "pointer",
      color: 'white'
    },
    textSection: {
      maxWidth: "85%"
    },
    deleteIcon: {
      color:'white',
      height:'17px',
      position: "absolute",
      right: "2px",
      top: "0px",
      "&:hover": {
        color: "red"
      }
    },
    clearIcon:{
      height:'17px',
      position: "relative",
      right:'0px !important',
      top:'0px',
      marginLeft:'240px',
      "&:hover": {
        color: "red"
      }
    
    },
    icon:{
      right:'0px'
    }
  });
  
  export default styles;
  