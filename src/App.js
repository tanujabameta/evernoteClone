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
  const [noteData, setNoteData] = useState(null);
  const [selectedFolder, setSelectedFolder]= useState(null);

  const [expanded, setExpanded] = useState(false);

 
  useEffect(()=>{
  axios.get('http://localhost:3000/data/')
    .then(resp=> setNoteData(resp.data))
  },[selectedNoteIndex,noteData]);

  
  const selectNote=(note, index, folder)=>
    {
      setSelectedNote(note);
      setSelectedNoteIndex(index);
      setSelectedFolder(folder);
  }

   const deleteNote= async (folder,note)=>
   {
        // setNoteData(noteData.filter(_note => _note !== note))
        // if(selectedNoteIndex === note){
        //     setSelectedNote(null);
        //     setSelectedNoteIndex(null);
        //  } else {
        // if (noteData.length > 1) 
        //  selectNote(noteData[selectedNoteIndex - 1], selectedNoteIndex - 1);
        // else {
        //   setSelectedNote(null);
        //   setSelectedNoteIndex(null);
        //   }
        // }
        const currentFolder = noteData.find((fol)=> fol.id === folder);    
        currentFolder["files"].splice(note,1);
        await axios.put(`http://localhost:3000/data/${folder}`,{"files": currentFolder['files']});
        setSelectedNote(null);
        setSelectedNoteIndex(null);
  }


  const newNote= async (data)=>{
    const {title, selectedFolder} = data;
    const note ={
      title: title,
      description: "Write something here.....",
      id: Math.floor((Math.random() * 100) + 1)
    };

    const currentFolder = noteData.find((folder) => folder.id === selectedFolder);
    const currentFolderIndex = noteData.indexOf(currentFolder);

    const updatedFolderFiles = [ ...currentFolder["files"], note];

    const updatedFolderData = await axios.put(`http://localhost:3000/data/${selectedFolder}`,{"files": updatedFolderFiles});
    console.log(updatedFolderData.data)
    const updatedNodeData = noteData.slice();
    updatedNodeData[currentFolderIndex] = updatedFolderData.data;
    setNoteData(updatedNodeData);
  }

  const noteUpdate= async (noteObj,ni,folder)=>{
    const currentFolder = noteData.find((fol) => fol.id === folder);
    currentFolder["files"].splice(ni,1,noteObj);
    await axios.put(`http://localhost:3000/data/${folder}`,{"files": currentFolder['files']});
  }

  const newFolder =(n)=>{
     axios.post(`http://localhost:3000/data/`, {"id":n,"files":[]})
  }

  const changeFolder = (oldFolder,newFolder)=>{
      noteUpdate(selectedNote,selectedNoteIndex,newFolder);
      deleteNote(oldFolder,selectedNote);
  }

  const getExpanded = (expand)=>{
    setExpanded(expand);
  }

  const deleteFolder= (folder)=> axios.delete(`http://localhost:3000/data/${folder}`);
   
  return (
    <div className='main'>
      <div className='slide'style={{display: expanded ? 'none' : 'block' }}>
        <SidebarComponent
          noteUpdate= {noteUpdate}
          deleteNote={deleteNote}
          newNote={newNote}
          selectNote={selectNote}
          noteData={noteData|| [] }
          selectedNoteIndex={selectedNoteIndex}
          deleteFolder={deleteFolder}
        />
        </div>
        {selectedNote ?
          <div className='editor'>
            <div>
              <EditorComponent
              noteUpdate= {noteUpdate}
              deleteNote={deleteNote}
              selectedNote={selectedNote}
              selectedNoteIndex={selectedNoteIndex}
              noteData={noteData || []}
              selectedFolder={selectedFolder}
              changeFolder={changeFolder}
              getExpanded={getExpanded}
              />
            </div>  
            <div className='folderDiv'><Button className='button' onClick={()=>{setSelectedNote(null)}}>Make Folders</Button></div>
            </div>:
            <Folder
            newFolder={newFolder}/>
            }
     </div> 
  );
}

export default App;
