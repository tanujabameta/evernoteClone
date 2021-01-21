import React, { useState, useEffect, useRef, useMemo } from "react";
import borderColorIcon from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import debouce from "../helpers";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditIcon from '@material-ui/icons/Edit';
import classes from "./styles";
const EditorComponent= props=>{
    const { classes, selectedNote, selectedNoteIndex, notes } = props;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
     const [id, setId] = useState("");

    //will work on component update
    useEffect(() => {
        setTitle(selectedNote.title);
        setText(selectedNote.description);
        setId(selectedNote.id);
        console.log(selectedNoteIndex);
      },[selectedNoteIndex]);

    
    useEffect(() => {
        console.log(text);
        console.log(title);
        update()
      }, [text,title])
    
    //on change function for editor
    const handleOnChange =  (e,editor)=>{
        const data=  editor.getData() ;
        console.log(data); //Rahul
        setText(data);
    } 

    //update the  data after certain time
    const update = debouce(()=>{
        console.log('updating db', text);
        props.noteUpdate(id, {title:title, description:text})
    }, 1500);


    const updateTitle = txt => {
        setTitle(txt);
        //update();
      };

    return(
        <div className={classes.editorContainer}>
            <EditIcon className={classes.editIcon} />
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
                onChange={e => updateTitle(e.target.value)}/>
            <CKEditor 
                editor={ ClassicEditor } 
                data={text} 
                className={classes.editor} 
                onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );     
                }}
                onChange={handleOnChange} 
            />   
         </div>
    )
};

export default withStyles(styles)(EditorComponent);
