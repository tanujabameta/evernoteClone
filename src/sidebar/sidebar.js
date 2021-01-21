import React, { useEffect, useState } from "react";
import { withStyles, Button, List, Divider } from "@material-ui/core";
import styles from "./styles";
import SidebarItemComponent from "./../sidebarItem/sidebaritem";

const SidebarComponent= props =>{
    const { classes, notes, selectedNoteIndex } = props;
    const [addingNote, setAddingNotes] = useState(false);
    const [title, setTitle] = useState(null);

    useEffect(()=>{
      setTitle(title);
    },[title])
    
    const newNoteBtnClick=()=>{
        console.log('new note');
        setAddingNotes(!addingNote);
        setTitle(null);
    }

    const updateTitle = txt =>{
        setTitle(txt);
        console.log(txt);
    }

    const newNote =() =>{
        //console.log(title, addingNote)
         props.newNote(title);
         newNoteBtnClick();
    }

    const selectNote=(n,i)=>{
        props.selectNote(n, i);
    }

    const deleteNote = (note) => {
        props.deleteNote(note)
      };

    return(
        <div className={classes.sidebarContainer}>
            <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                 {addingNote?'Cancel':'New Folder'}
            </Button>
            {addingNote && (
                <div>
                    <input className={classes.newNoteInput}
                     placeholder='Folder Name' type='text' 
                     onKeyUp ={e => updateTitle(e.target.value)}/>
                     <Button className={classes.newNoteSubmitBtn}
                      onClick={newNote}>Create Folder</Button>
                </div>
            )}
            {
            <List>{notes.map((note, index)=>{
                return(
                    <div key={index}>
                        <SidebarItemComponent
                        note= {note}
                        index={index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={selectNote}
                        DeleteNote={deleteNote}
                        />
                        <Divider/>
                    </div>
                )
            })}</List>
            }
        </div>
    );   
}
export default withStyles(styles)(SidebarComponent);
