const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    titleInput: {
      height: '35px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: '100%',
      backgroundColor: 'black',
      color: 'white',
      paddingLeft: '50px'
    },
    editIcon: {
      position: 'absolute',
      top: '3px',
      color: 'white',
      width: '10',
      height: '10'
    },
    flex:{
      display:'flex',
      flexDirection:'row'
    },
    flexInput:{
      flex:19.5
    },
    flexIcon:{
      flex:0.5,
      color:'white',
      backgroundColor:'black'
    },
  });
  
  export default styles;
