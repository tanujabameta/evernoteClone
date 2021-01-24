import React from 'react';
import { withStyles, ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import ClearIcon from '@material-ui/icons/Clear';

const SidebarItemComponent=props=>{

    const {noteData, index, selectedNoteIndex, classes, selectedFolderIndex} = props; 

    const selectNote=(n,i,f)=>{
        props.selectNote(n,i,f);
    }
     const deleteFolder = (folder) => {
        props.deleteFolder(folder);
      };
    
    const DeleteNote=(folder,n)=>{
        props.DeleteNote(folder,n);
    }
    return(
    <div key={index}>
    {noteData.map((folder,index)=>{
      return(<div key={index}>
        <ListItem className={classes.listItem} selected={selectedFolderIndex===index}>
        <div className={classes.textSection} >
          <ListItemText primary={folder["id"]}/>
          {folder["files"].map((note,index)=>{
            return(
              <div key={note.id} onClick={()=>selectNote(note, index,folder["id"])} >
                  <ListItem  className={classes.listItem}  selected={selectedNoteIndex===index}>
                    <ListItemText primary= {note.title}/>
                      <ClearIcon className={classes.clearIcon} onClick={()=>DeleteNote(folder["id"],index)}/>
                    </ListItem>
              </div>
            )
          })} 
        </div>
      <DeleteIcon className={classes.deleteIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={()=>deleteFolder(folder["id"])}/>
  </ListItem>
  </div>)
    })}
    </div>
    )}


export default withStyles(styles)(SidebarItemComponent);
