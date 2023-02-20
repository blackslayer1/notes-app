import './App.scss';
import { useState, useEffect } from 'react';
import Header from './Header';
import Note from './Note';
import Notes from './Interface';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function App() {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [shouldRun, setShouldRun] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => { 
      Array.from(document.getElementsByClassName('noteEditDate')).map((element)=>{
        var numb = element.innerHTML.match(/\d/g);
        var number = parseInt(numb!.join(""));
        number+=1;
        element.innerHTML=`Last edited ${number < 4 ? number : "a few"} seconds ago`;
      })
    }, 1000); 
    return () => clearInterval(interval); 
  }, []); 

  const createNote = () => {
    const noteInput = (document.getElementById('noteInput')! as HTMLInputElement).value;
    const title = (document.getElementById('title')! as HTMLTextAreaElement).value;
    let lastEdit = `Last edited 0 seconds ago`;
    let dateCreated = "1/1/2000 at 12:00 PM";
    setNotes([...notes, {title: title, text: noteInput, lastEdit: lastEdit, dateCreated: dateCreated, id: Math.random()}]);
    document.getElementById('createNoteModal')!.style.display="none";
  }

  const edit = (id: number) => {
    const noteInput = document.getElementById('noteInput' + id)! as HTMLTextAreaElement;
    const title = document.getElementById('title' + id)! as HTMLInputElement;
    const editButton = document.getElementById('edit' + id)! as HTMLInputElement;
    const saveButton = document.getElementById('save' + id)! as HTMLInputElement;
    title.readOnly=false;
    noteInput.readOnly=false;
    editButton.style.visibility="hidden";
    saveButton.style.visibility="visible";
  }

  const save = (id: number) => {
    const noteInput = document.getElementById('noteInput' + id)! as HTMLTextAreaElement;
    const title = document.getElementById('title' + id)! as HTMLInputElement;
    const editButton = document.getElementById('edit' + id)! as HTMLInputElement;
    const saveButton = document.getElementById('save' + id)! as HTMLInputElement;
    const noteTitle = document.getElementById('noteTitle' + id)! as HTMLInputElement;
    const noteEditDate = document.getElementById('noteEditDate' + id)! as HTMLInputElement;
    title.readOnly=true;
    noteInput.readOnly=true;
    editButton.style.visibility="visible";
    saveButton.style.visibility="hidden";
    noteTitle.innerHTML=title.value;
    noteEditDate.innerHTML="Last edited 0 seconds ago";
  }

  const deleteNote = (id: number) => {
      setShouldRun(false);
      setNotes(notes.filter((note)=>{
        return note.id !== id;
      }))
  }

  return (
    <div className="App">
      <Header />
      <div className="heading">
        <div>
        <input type="text" className="filter" placeholder='Filter todos' />
        <select id="sort">
          <option value="1">Sort by last edited</option>
          <option value="2">Sort by alphabet</option>
          <option value="3">Sort by last created</option>
          <option value="4">Sort by longest</option>
        </select>
        <SettingsBrightnessIcon className="darkMode" />
        </div>
      </div>
      <div className="container">
      <div id="createNoteModal" className="modal">
      <div className="modal-content">
      <span className="close" onClick={()=>{document.getElementById('createNoteModal')!.style.display="none"}}>&times;</span>
      <input type="text" className="title" id="title" placeholder="Note Title" style={{width: "58.5%", marginLeft: "20px", padding: "10px", fontSize: "20px", outline: "none"}} />
      <br /><br />
      <textarea className="noteInput" id="noteInput" placeholder="Type note..." style={{width: '60%', height: "200px", resize: "none", fontSize: "15px", outline: "none"}}></textarea>
      <br /><br />
      <button className="createNote" onClick={createNote}>Add Note</button>
      </div>
      </div>
        <div className="notes">
        {notes.map((note)=>{
          return <>
          <Note title={note.title} lastEdit={note.lastEdit} id={note.id} dateCreated={note.dateCreated} deleteNote={deleteNote} shouldRun={shouldRun} key={note.id} />
          <div id={'noteModal' + note.id} className="modal">
              <div className="modal-content">
                <span className="close" onClick={()=>{document.getElementById('noteModal' + note.id)!.style.display="none"}}>&times;</span>
                <input type="text" placeholder={note.title} id={"title" + note.id} className="title" style={{width: "58.5%", marginLeft: "20px", padding: "10px", fontSize: "20px", outline: "none"}} readOnly/>
                <br /><br />
                <textarea id={"noteInput" + note.id} className="noteInput" placeholder="Type note..." style={{width: '60%', height: "200px", resize: "none", fontSize: "15px", outline: "none"}} readOnly>{note.text}</textarea>
                <br />
                <div className="buttons">
                <button className="edit" id={"edit" + note.id} onClick={()=>{edit(note.id)}}>Edit</button>
                <button className="save" id={"save" + note.id} onClick={()=>{save(note.id)}}>Save</button>
                <ContentCopyIcon className="copyContent" />
                </div>
            </div>
        </div>
          </>
        })}

        </div>
        <button className="add" onClick={()=>{document.getElementById('createNoteModal')!.style.display="block"}}>Create Note</button>
      </div>
    </div>
  );
}

export default App;
