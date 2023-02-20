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

  return (
  <div className="note" onClick={createNotes}>
    <div className="text">
    <h2 id={'noteTitle' + id}>{title}</h2>
    <div>
    <h3 id={'noteEditDate' + id} className="noteEditDate" style={{marginRight: '30px'}}>{lastEdit}</h3>
    <h3>{dateCreated}</h3>
    </div>
    </div>
    <div className="icons">
    <PushPinIcon className="pinIcon" />
    <DeleteIcon onClick={()=>{deleteNote(id)}} className="deleteIcon" />
    <LabelIcon className="labelIcon" />
    </div>
  </div>
  )
}

export default Note
