import React, { useState, useEffect } from 'react';
import { withStyles, Button, List, Divider } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from "./styles";
import axios from 'axios';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const Folder = props =>
{
    const { classes, notes, fnames, selectedNoteIndex } = props;
    const [check, setCheck]= useState(false);
    const [name, setName] = useState(null);
    
    const [addingFolder, setAddingFolder] = useState(false);

    
    const newNoteBtnClick=()=>{
        console.log('new note');
        setAddingFolder(!addingFolder);
        setName(null);
    }

    const updateName = n =>{
        setName(n);
        console.log(n);
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
                   onKeyUp ={e => updateName(e.target.value)}/>
                   <Button className={classes.newFolderSubmitBtn}
                   onClick={newFolder}>Submit Folder</Button>
            <div className={classes.list}>
            <div className={classes.folderList}>
                <List 
                    className={classes.folderNames}>
                    {fnames.map((name, index)=>{
                    return(
                        <div key={index} className={classes.folderName}>
                            <FolderOpenIcon/><span className={classes.folderName}>{name.name}</span><HighlightOffIcon className={classes.delete}/>
                         {/* <Divider className={classes.divider}/> */}
                        </div>
                        )
                    })}</List>
            </div>

            <div className={classes.notesList}>
            <List>
                {notes.map((note, index)=>{
                return(
                    <div key={index}>
                        <FormControlLabel
                        value={note.id}
                        control={<Checkbox color="primary" onChange={e => {
                            console.log(e.target.checked,{note});
                            setCheck(e.target.checked);
                          }}/>}
                        label={note.title}
                        labelPlacement="end"
                        />
                        <Divider className={classes.divider}/>
                    </div>
                    )
                })}</List> 
            </div>
            </div>
            </div>
            
        );
}

export default withStyles(styles)(Folder);
