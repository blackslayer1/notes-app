import './Note.scss';
import { useState } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelIcon from '@mui/icons-material/Label';

interface Notes{
  title: string,
  lastEdit: string,
  dateCreated: string
  id: number,
  deleteNote(id: number): void,
  shouldRun: boolean
}

const Note = ({ title, lastEdit, dateCreated, id, deleteNote, shouldRun }: Notes) => {
const [run, setRun] = useState<boolean>(shouldRun);

  const createNotes = () => {
    if(run === true){
      document.getElementById('noteModal' + id)!.style.display="block";
    }
    setRun(true);
  }
  
  const pinNote = (id: number) => {
    const note = document.getElementById('note' + id)!;
    const pinIcon = document.getElementById('pinIcon' + id)!;
    if(run === true){
    if(pinIcon.style.color !== 'black'){
    note.style.position="fixed";
    note.style.width="100%";
    note.style.top="200px";
    pinIcon.style.color="black";
  } else {
    note.style.position="static";
    pinIcon.style.color="gray";
  }
}
  setRun(true);
  }

  return (
  <div className="note" id={"note" + id} onClick={createNotes}>
    <div className="text">
    <h2 id={'noteTitle' + id}>{title}</h2>
    <div>
    <h3 id={'noteEditDate' + id} className="noteEditDate" style={{marginRight: '30px'}}>{lastEdit}</h3>
    <h3>{dateCreated}</h3>
    </div>
    </div>
    <div className="icons">
    <PushPinIcon onClick={()=>{pinNote(id)}} className="pinIcon icon" id={'pinIcon'+id} />
    <DeleteIcon onClick={()=>{deleteNote(id)}} className="deleteIcon icon" />
    <LabelIcon className="labelIcon icon" />
    </div>
  </div>
  )
}

export default Note
