// *******************creando un componente****************************
//Cada componente debe ir con su clase de react
import React, { Component } from 'react';
import './Note.css';
//heredar atributos de react
//**********************clase y su constructor***************************** */
class Note extends Component {
    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
    }
    //***************+render: pintar las notas en pantalla****************************
    handleRemove(id) {
        const response = window.confirm('seguro de eliminar?');
        if (response) {
            this.props.removeNote(id);
        }
        return;
    }
    render() {
        return (
            <div className="Note">
                <span onClick={() => this.handleRemove(this.noteId)}>&times;</span>
                <p>{this.noteContent}</p>

            </div>
        )
    }
}
export default Note;