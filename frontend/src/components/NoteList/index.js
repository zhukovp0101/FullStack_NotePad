import React from "react";
import axios from "axios";

import { Link } from 'react-router-dom';

import editSvg from '../../assets/img/edit.svg';

import './NoteList.scss';

import AddNoteForm from './AddNoteForm';

import Note from "./Note";

const NoteList = ({
  list,
  onEditTitle,
  onAddNote,
  onRemovenote,
  onEditnote,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://0.0.0.0:8888/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };

  return (
    <div className="notes">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="notes__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>

      <div className="notes__items">
        {list.notes &&
          list.notes.map((note) => (
            <Note
              key={note.id}
              list={list}
              onEdit={onEditnote}
              onRemove={onRemovenote}
              {...note}
            />
          ))}
        <AddNoteForm key={list.id} list={list} onAddNote={onAddNote} />
      </div>
    </div>
  );
};

export default NoteList;
