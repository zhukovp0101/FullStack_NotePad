import React, { useState } from 'react';
import axios from 'axios';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button'

import addSvg from '../../assets/img/add.svg';

const AddNoteForm = ({ list, onAddNote }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addnote = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
    };
    setIsLoading(true);
    axios
      .post('http://0.0.0.0:8888/notes', obj)
      .then(({ data }) => {
        onAddNote(list.id, data);
        toggleFormVisible();
      })
      .catch(e => {
        alert('Ошибка при добавлении заметки!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="notes__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="notes__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая заметка</span>
        </div>
      ) : (
        <div className="notes__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Имя заметки"
            onChange={e => setInputValue(e.target.value)}
          />
          <Button disabled={isLoading} onClick={addnote} variant='outlined' style={{ color: green[500] }}>
            {isLoading ? 'Добавление...' : 'Добавить заметку'}
          </Button>
          <Button onClick={toggleFormVisible} variant='outlined' style={{ color: grey[500] }}>
            Отмена
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddNoteForm;
