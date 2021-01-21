import React from 'react';
import { withStyles, ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import ClearIcon from '@material-ui/icons/Clear';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const SidebarItemComponent=props=>{

    const {note, index, selectedNoteIndex, classes, DeleteNote} = props; 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const selectNote=(n,i)=>{
        console.log('note selected');
        console.log(n,i);
        props.selectNote(n,i);
    }
    const ShowItem = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    const DeleteItem=(n)=>{
        return DeleteNote(n);
    }
    return(
    <div key={index}>
    <ListItem className={classes.listItem}>
        <div className={classes.textSection} >
            {/* <FolderOpenIcon/> */}
            <ListItemText primary={note.folderName}/>
                {note.files.map((note, index)=>{
                return(
                <div key={note.id} onClick={()=>selectNote(note, index)} >
                 <ListItem  className={classes.listItem}  selected={selectedNoteIndex===index}>
                     <ListItemText primary= {note.title}/>
                     <ClearIcon className={classes.clearIcon} onClick={()=>DeleteItem(note)}/>
                 </ListItem>
                 </div>
                
                 )})}
                 
            </div>
        <MoreHorizIcon className={classes.deleteIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={ShowItem}/>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Add a File</MenuItem>
        <MenuItem onClick={handleClose}>Delete the Folder</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ListItem>
    </div>
    )
}

export default withStyles(styles)(SidebarItemComponent);
