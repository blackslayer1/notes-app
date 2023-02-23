import './App.scss';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Header from './Header';
import Note from './Note';
import Notes from './Interface';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Filter{
  word: string,
  id: number
}

function App() {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [notes2, setNotes2] = useState<Notes[]>([]);
  const [shouldRun, setShouldRun] = useState<boolean>(true);
  const [darkThemeIsOn, setDarkThemeIsOn] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [run, setRun] = useState<number>(0);

  function formatAMPM(date: any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const darkTheme = (dark: boolean) => {
    const heading = Array.from(document.getElementsByTagName('header')!)[0] as HTMLHeadElement;
    const select = Array.from(document.getElementsByTagName('select')!)[0] as HTMLSelectElement;
    const buttons = Array.from(document.getElementsByTagName('button')!);
    const modals = Array.from(document.getElementsByClassName('modal-content'));
    const close = Array.from(document.getElementsByClassName('close'));
    const input = Array.from(document.getElementsByTagName('input'));
    const textarea = Array.from(document.getElementsByTagName('textarea'));
    const h3 = Array.from(document.getElementsByTagName('h3'));
    const note = Array.from(document.getElementsByClassName('note'));
    const icons = Array.from(document.getElementsByClassName('icon'));
    var primary = "#43799d";

    if(dark === true){
      document.getElementById('darkMode')!.style.color="white";
      document.getElementById('heading')!.style.background="gray";
      document.getElementById('heading')!.style.border="none";
      document.body.style.background="rgb(51, 51, 51)";
      heading.style.background='black';
      select.style.background="rgb(51, 51, 51)";
      select.style.color="white";
      buttons.map((button)=>{
        button.style.background='gray';
      })
      modals.map((modal)=>{
        (modal as HTMLDivElement).style.background="black";
        (modal as HTMLDivElement).style.border="none";
      })
      close.map((elem)=>{
        (elem as HTMLSpanElement).style.color="gray";
      })
      input.map((elem)=>{
        (elem as HTMLInputElement).style.background="rgb(51, 51, 51)";
        (elem as HTMLInputElement).style.color="white";
        (elem as HTMLInputElement).style.border="none";
      })
      textarea.map((elem)=>{
        (elem as HTMLTextAreaElement).style.background="rgb(51, 51, 51)";
        (elem as HTMLTextAreaElement).style.color="white";
        (elem as HTMLTextAreaElement).style.border="none";
      })
      note.map((elem)=>{
        (elem as HTMLDivElement).style.background="gray";
        (elem as HTMLDivElement).style.color="white";
        (elem as HTMLDivElement).style.border="none";
      })
      h3.map((elem)=>{
        (elem as HTMLHeadElement).style.color="white";
      })
      icons.map((elem)=>{
        (elem as HTMLButtonElement).style.color="white";
      })
    } else {
      document.getElementById('darkMode')!.style.color="black";
      document.getElementById('heading')!.style.background="#f7f7f7";
      document.getElementById('heading')!.style.border="1px rgb(214, 214, 214) solid";
      document.body.style.background="white";
      heading.style.background=primary;
      select.style.background="white";
      select.style.color="black";
      buttons.map((button)=>{
        button.style.background=primary;
      })
      modals.map((modal)=>{
        (modal as HTMLDivElement).style.background="white";
        (modal as HTMLDivElement).style.border="1px solid #888";
      })
      close.map((elem)=>{
        (elem as HTMLSpanElement).style.color="#aaa";
      })
      input.map((elem)=>{
        (elem as HTMLInputElement).style.background="white";
        (elem as HTMLInputElement).style.color="black";
        (elem as HTMLInputElement).style.border="1px rgb(214, 214, 214) solid";
      })
      textarea.map((elem)=>{
        (elem as HTMLTextAreaElement).style.background="white";
        (elem as HTMLTextAreaElement).style.color="black";
        (elem as HTMLTextAreaElement).style.border="1px rgb(214, 214, 214) solid";
      })
      note.map((elem)=>{
        (elem as HTMLDivElement).style.background="#f7f7f7";
        (elem as HTMLDivElement).style.color="black";
        (elem as HTMLDivElement).style.border="1px rgb(214, 214, 214) solid";
      })
      icons.map((elem)=>{
        (elem as HTMLButtonElement).style.color="gray";
      })
      h3.map((elem)=>{
        (elem as HTMLHeadElement).style.color="black";
      })
      document.getElementById('h3')!.style.color="white";
    }
  }

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
    if(noteInput !== '' && title !== ''){
    let lastEdit = `Last edited 0 seconds ago`;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let dateCreated = mm + '/' + dd + '/' + yyyy + ' at ' + formatAMPM(today);
    setNotes([...notes, {title: title, text: noteInput, lastEdit: lastEdit, dateCreated: dateCreated, id: Math.random()}]);
    document.getElementById('createNoteModal')!.style.display="none";
    } else {
      alert("Title and note input can't be blank");
    }
  }

  const edit = (id: number) => {
    const noteInput = document.getElementById('noteInput' + id)! as HTMLTextAreaElement;
    const title = document.getElementById('title' + id)! as HTMLInputElement;
    const editButton = document.getElementById('edit' + id)! as HTMLInputElement;
    const saveButton = document.getElementById('save' + id)! as HTMLInputElement;
    title.readOnly=false;
    title.style.border="1px solid black";
    noteInput.readOnly=false;
    noteInput.style.border="1px solid black";
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
    if(noteInput.value !== '' && title.value !== ''){
    title.readOnly=true;
    title.style.border="none";
    noteInput.readOnly=true;
    noteInput.style.border="none";
    editButton.style.visibility="visible";
    saveButton.style.visibility="hidden";
    noteTitle.innerHTML=title.value;
    noteEditDate.innerHTML="Last edited 0 seconds ago";
    } else {
      alert("Title and note input can't be blank");
    }
  }

  const deleteNote = (id: number) => {
      setShouldRun(false);
      setNotes(notes.filter((note)=>{
        return note.id !== id;
      }))
  }

   const copyToClipBoard = (id: number) => {
    const text = document.getElementById('noteInput' + id)!.innerHTML;
    try{
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  }

  const darkMode = () => {
    if(darkThemeIsOn === false){
      darkTheme(true);
      setDarkThemeIsOn(true);
    } else {
      darkTheme(false);
      setDarkThemeIsOn(false);
    }
  }

  useEffect(()=>{
    switch(sort){
      case 'alphabet':
      notes.sort((a, b) => a.title.localeCompare(b.title));
      break;
      case 'shortest':
        notes.sort(function(a, b) {
          return a.text.length + b.text.length;
        });
      break;
      case 'longest':
        notes.sort(function(a, b) {
          return a.text.length - b.text.length;
        });
      break;
    }
  }, [sort])

  const onFocus = () => {
    document.onkeypress = function (e) {
      e = e || window.event;
      if(e.keyCode === 13){
        let filter = document.getElementById('filter')! as HTMLInputElement;
        setFilters([...filters, {word: filter.value, id: Math.random()}]);
      }
  };
  }

  const removeFilter = (id: number) => {
    setFilters(filters.filter((filter)=>{
      return filter.id !== id;
    }))
  }

  useEffect(()=>{
    if(run < 2){
      setNotes2(notes);
    }
    setRun(run+1);

    if(filters.length > 0){
      let words: string[] = [];
      filters.map((filter)=>{
        words.push(filter.word);
      })
      setNotes(notes.filter((note)=>{
        return words.includes(note.title)
      }))
    } else {
      setNotes(notes2);
    }
  }, [filters])

  return (
    <div className="App">
      <Header />
      <div className="heading" id="heading">
        <div>
        <input type="text" className="filter" id="filter" placeholder='Filter todos' onFocus={onFocus}/>
        <select id="sort" onChange={(e: ChangeEvent<HTMLSelectElement>)=>{setSort(e.target.value);}}>
          <option value="alphabet" selected>Sort by alphabet</option>
          <option value="shortest">Sort by shortest</option>
          <option value="longest">Sort by longest</option>
        </select>
        <SettingsBrightnessIcon className="darkMode" id="darkMode" onClick={darkMode} />
        </div>
      </div>
      <div className="container">
      <div style={{position: "relative", right: '550px', color: "gray"}}>
      <span>Word Filter: </span>
      {filters.length > 0 ? filters.map((filter) => {
        return <button className="filterWord" id={(filter.id).toString()} onClick={()=>{removeFilter(filter.id)}}>{filter.word}</button>
      }) : "None"}
      </div>
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
                <input type="text" placeholder={note.title} id={"title" + note.id} className="title" style={{width: "58.5%", marginLeft: "20px", padding: "10px", fontSize: "20px", border: 'none', outline: "none"}} readOnly/>
                <br /><br />
                <textarea id={"noteInput" + note.id} className="noteInput" placeholder="Type note..." style={{width: '60%', height: "200px", resize: "none", fontSize: "15px", border: 'none', outline: "none"}} readOnly>{note.text}</textarea>
                <br />
                <div className="buttons">
                <button className="edit" id={"edit" + note.id} onClick={()=>{edit(note.id)}}>Edit</button>
                <button className="save" id={"save" + note.id} onClick={()=>{save(note.id)}}>Save</button>
                <ContentCopyIcon className="copyContent" onClick={()=>{copyToClipBoard(note.id)}} />
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