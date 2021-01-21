import './App.css';
import React, { useState, useEffect } from "react";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";
import Folder from './folder/folder';
import axios from 'axios';
import { Button } from "@material-ui/core";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [Fnames, setFName] = useState(null);

  useEffect(()=>{
  axios.get('http://localhost:3000/data')
    .then(resp=> setNotes(resp.data))
  },[selectedNoteIndex]);

  const selectNote=(note, index)=>{
    setSelectedNote(note);
    setSelectedNoteIndex(index)
  }

   const deleteNote= async note=>{
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter(_note => _note !== note))
    if(selectedNoteIndex === noteIndex){
      setSelectedNote(null);
      setSelectedNoteIndex(null);
    } else {
      if (notes.length > 1) {
        selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1);
      } else {
        setSelectedNote(null);
        setSelectedNoteIndex(null);
      }
    }
   axios.delete(`http://localhost:3000/data/${note.id}`)
  }
  const newNote= async title=>{
    const note ={
      folderName: title,
      files: [],
      id: Math.floor((Math.random() * 100) + 1)
    };
    const newFromDB = await axios.post(`http://localhost:3000/data/`,note);
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === `${note.id}`));
    console.log(newNoteIndex);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  }

  const noteUpdate=(id, noteObj)=>{
    console.log('update')
    //axios.put(`http://localhost:3000/data/${id}`,noteObj);
  }
  
  const newFolder=async Fname=>{
    const folder={
      name: Fname
    };
    await axios.post(`http://localhost:3000/folders/`, folder);
    setFName([...Fnames, folder])

  }

  return (
    <div className='main'>
        <div className='slide'>
        <SidebarComponent
          noteUpdate= {noteUpdate}
          deleteNote={deleteNote}
          newNote={newNote}
          selectNote={selectNote}
          notes={notes || []}
          selectedNoteIndex={selectedNoteIndex}
        />
        </div>
        {selectedNote &&
          <div className='editor'>
            <div>
              <EditorComponent
              noteUpdate= {noteUpdate}
              selectedNote={selectedNote}
              selectedNoteIndex={selectedNoteIndex}
              notes={notes|| []}
              />
            </div>  
            <div className='folderDiv'><Button className='button' onClick={()=>{setSelectedNote(null)}}>Make Folders</Button></div>
            </div>}
            {/* {/* // <Folder 
            // notes={notes || []}
            // newFolder={newFolder}
            // />} */}
     </div> 
  );
}

export default App;
