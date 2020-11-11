import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import CloseButton from '../CloseButton'


import Badge from '../Badge';

import './List.scss';

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem
}) => {
  const removeList = item => {
      axios.delete('http://0.0.0.0:8888/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active || (activeItem && activeItem.id === item.id)
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.notes && ` (${item.notes.length})`}
          </span>
          { isRemovable && (
            <CloseButton onClick={() => removeList(item)} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
