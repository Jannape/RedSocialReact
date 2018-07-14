import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import { DB_CONFIG } from './config/config.js';
import 'firebase/database';
import Note from './Note/Note.jsx';
import NoteForm from './NoteForm/NoteForm.jsx';

class App extends Component {
  //para guardar notas
  constructor() {
    super();
    this.state = {
      notes: [
        // { noteId: 1, noteContent: 'note 1' },
        // { noteId: 2, noteContent: 'note 2' },
        // { noteId: 3, noteContent: 'note 3' },
        // { noteId: 4, noteContent: 'note 4' }
      ]
    };
    this.app = firebase.initializeApp(DB_CONFIG);//requerir la conexion a firebase
    this.db = this.app.database().ref().child('notes');//que todas las notas que guardo
    // se guarde en una coleccion llamada notes
    this.addNote = this.addNote.bind(this);//para el scope//alcanze//tmb se puede hacer mediante una fx anonima
    this.removeNote = this.removeNote.bind(this);

  }
  componentDidMount() {//metodo despues que se haya cargado en la vista
    //traer datos y cargarlos
    const { notes } = this.state;//quiero del estado las notas

    //********************************CHILD_ADDED********************************/
    this.db.on('child_added', snap => {//recibe un conjunto de datos que se han actualizado
      notes.push({
        noteId: snap.key,//firebase le agrega una clave
        noteContent: snap.val().noteContent// el contenido quiero almacenarlo en el estado,
        //de sus valores el not contente
      })
      this.setState({ notes });//actualizando el estado notes :notes
    });

      //********************************CHILD_REMOVE********************************/
    this.db.on('child_removed', snap => {
      for (let index = 0; index < notes.length; index++) {
        if (notes[index].noteId = snap.key) {
          notes.splice(index, 1);
        }
        
      }
      this.setState({ notes });
    });

  }//metodo del componente

  //********************************CREANDO FUNCIONES *********************************/
  removeNote(noteId) {
    //localizando el hijo  y buscarlo por el id
    this.db.child(noteId).remove();

  }
  addNote(note) {
    // let {notes}=this.state;//obten las notas desde el estado
    // notes.push({
    //   noteId:notes.length+1,
    //   noteContent:note
    // });

    // this.setState({ notes });
    this.db.push().set({ noteContent: note });//de la base de datos bamos a insertar un nuevo dato
  }
  //*********************************************************************************/

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          {/* <h1>Mi primera App</h1> */}
        </div>
         <div className="notesFooter"></div>
        <NoteForm addNote={this.addNote} />
        <div className="notesBody">
          {
            this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.noteId}
                  key={note.noteId}
                  removeNote={this.removeNote}
                />
              )
            })
          }
        </div>
       
      </div>
    );
  }
}

export default App;
