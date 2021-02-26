import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import debouce from "../helpers";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditIcon from '@material-ui/icons/Edit';
import classes from "./styles";
import FormControl from '@material-ui/core/FormControl';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const EditorComponent= props=>{
    const { classes, selectedNote, selectedNoteIndex, noteData, selectedFolder, getExpanded} = props;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [newFolder, setNewFolder] = useState('');
    const [expand, setExpand]= useState(true);


    //will work on component update
    useEffect(() => {
        setTitle(selectedNote.title);
        setText(selectedNote.description);
        setExpand(expand);
        console.log('index' + selectedNoteIndex, "folder"+ selectedFolder, 'expand', expand );
      },[selectedFolder,selectedNoteIndex,expand]);

    useEffect(() => {
        update()
      }, [text,title])
    
    //on change function for editor
    const handleOnChange =  (e,editor)=>{
        const data=  editor.getData() ;
        setText(data);
    } 

    //update the  data after certain time
    const update = debouce(()=>{
        props.noteUpdate({title:title, description:text},selectedNoteIndex,selectedFolder)
    }, 1500);


    const updateTitle = txt => {
        setTitle(txt);
      };

    const folderChange= async(event)=>{
        await setNewFolder(event.target.value);
        changeFolder(selectedFolder,event.target.value);        
    }

    const changeFolder= (selectedFolder, newFolder)=>{
        props.changeFolder(selectedFolder, newFolder);
    }

    const expandEditor=()=>{
        if(expand===false)
          setExpand(true);
        else
          setExpand(false);
      getExpanded(expand);
    }

    return(
        <div className={classes.editorContainer}>
            <EditIcon className={classes.editIcon} />
            <div className={classes.flex}>
                <div className={classes.flexInput}>
                <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
                onChange={e => updateTitle(e.target.value)}/>
                </div>
                {expand?
                <div className={classes.flexIcon} onClick={expandEditor}><FullscreenIcon/></div>:
                <div className={classes.flexIcon} onClick={expandEditor}><FullscreenExitIcon/></div>
                }
             </div>
                <FormControl className={classes.formControl}>
                     <InputLabel id="demo-simple-select-label">{`${selectedFolder}`}</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newFolder}
                        onChange={folderChange}
                      >
                     {noteData.map((note, index) => {
                            return (
                                <MenuItem key={index} value={`${note["id"]}`} >{`${note["id"]}`}</MenuItem>
                            );
                        })
                        }
                    </Select>
                </FormControl>
            <CKEditor 
                editor={ ClassicEditor } 
                data={text} 
                className={classes.editor} 
                onReady={ editor => {
                // You can store the "editor" and use when it is needed.     
                }}
                onChange={handleOnChange} 
            />   
         </div>
    )
};

export default withStyles(styles)(EditorComponent);
