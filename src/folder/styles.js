const styles = theme => ({
    notes:{
      width:'70%',
      marginTop:'3%'
    },
    divider:{
      width:'50%'
    },
    list:{
      display:'flex',
      flexDirection: 'row'
    },
    delete:{
      color:'grey',
      marginLeft:'4%',
      paddingTop:'5% !important'
    },
    folderName:{
      marginTop:'-10px'
    },
    folderList:{
      flex:1
    },
    notesList:{
      flex:1,      
      marginTop: '10%',

    },
    newFolderInput: {
      width: '80%',
      margin: '0px',
      height: '35px',
      outline: 'none',
      border: 'none',
      paddingLeft: '5px',
      '&:focus': {
        outline: '2px solid rgba(81, 203, 238, 1)'
      }
    },
    newFolderSubmitBtn:{
      width: '200px',
      backgroundColor: 'grey',
      marginTop:'10px',
      height:'30px'
    },
    folderNames:{
      marginTop: '10%'
    },
    folderName:{
      marginTop: '3%'
    }
  });
  
  export default styles;
