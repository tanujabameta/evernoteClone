import React, { useState } from 'react';
import { withStyles, Button } from "@material-ui/core";
import styles from "./styles";


const Folder = props =>
{
    const { classes } = props;
    const [name, setName] = useState(null);
    
    const [addingFolder, setAddingFolder] = useState(false);

    
    const newNoteBtnClick=()=>{
        setAddingFolder(!addingFolder);
        setName(null);
    }

    const updateName = n =>{
        setName(n);
    }

    const newFolder=()=>{
         props.newFolder(name);
         newNoteBtnClick();

    }
    return(
        <div className={classes.notes}>
            <h2>Make Folder</h2>
            <input className={classes.newFolderInput}
                   placeholder='Folder Name' type='text' 
                   onChange ={e => updateName(e.target.value)}/>
                   <Button className={classes.newFolderSubmitBtn}
                   onClick={newFolder}>Submit Folder</Button>
           
            </div>
            
        );
}

export default withStyles(styles)(Folder);
