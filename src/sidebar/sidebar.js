import React, { useEffect, useState } from "react";
import { withStyles, Button, List, Divider } from "@material-ui/core";
import styles from "./styles";
import SidebarItemComponent from "./../sidebarItem/sidebaritem";

const SidebarComponent= props =>{
    const { classes, noteData, selectedNoteIndex } = props;
    const [addingNote, setAddingNotes] = useState(false);
    const [title, setTitle] = useState(null);
    const [selectedFolder, setFolder] = useState("root");

    useEffect(()=>{
      setTitle(title);
    },[title]);

    
    const newNoteBtnClick=()=>{
        setAddingNotes(!addingNote);
        setTitle(null);
    }

    const updateTitle = txt =>{
        setTitle(txt);
    }

    const newNote =() =>{
         props.newNote({title, selectedFolder});
         newNoteBtnClick();
    }

    const selectNote=(n,i,f)=>{
        props.selectNote(n, i,f);
    }

    const deleteNote = (folder,note) => {
        props.deleteNote(folder,note)
      };

    const deleteFolder= (folder)=>{
        props.deleteFolder(folder);
    }

    return(
        <div className={classes.sidebarContainer}>
            <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                 {addingNote?'Cancel':'New Note'}
            </Button>
            {addingNote && (
                <div>
                    <input className={classes.newNoteInput}
                     placeholder='Note Title' type='text' 
                     onKeyUp ={e => updateTitle(e.target.value)}/>
                    <select
                     onChange={e => setFolder(e.target.value)}>
                        {noteData.map((note, index) => {
                            return (
                                <option value={`${note["id"]}`} key={note[0]}>{note["id"]}</option>
                            );
                        })
                        }
                    </select>
                     <Button className={classes.newNoteSubmitBtn}
                      onClick={newNote}>Create Note</Button>
                </div>
            )}
            {
            <List>
                <SidebarItemComponent
                    noteData = {noteData}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={selectNote}
                    DeleteNote={deleteNote}
                    selectedFolder={selectedFolder}
                    deleteFolder={deleteFolder}
                    />
                    <Divider/>
            </List>
            }
        </div>
    );   
}
export default withStyles(styles)(SidebarComponent);
