import React, { useState } from 'react';
import './Form.css';

type PointType = 'origin' | 'waypoint' | 'destination';

interface Props {
  id: string;
  type: PointType;
  onAddClick: (name: string, type: PointType) => void;
  onEditClick: (id: string, name: string) => void;
  onDeleteClick: (id: string) => void;
}

export default function Form({ id, type, onAddClick, onEditClick, onDeleteClick }: Props) {
  const [inputText, setInputText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const isInvalidInput = (text: string) => {
    // 空文字とスペースのみを弾く
    if (!text || !text.match(/\S/g)) {
      return true;
    }
    return false;
  };

  const handleAddClick = () => {
    // 入力値のチェック
    if (isInvalidInput(inputText)) {
      alert('入力値が無効です。');
      return;
    }
    onAddClick(inputText, type);
    setIsSaved(true);
  };

  const handleEditClick = () => {
    // 入力値のチェック
    if (isInvalidInput(inputText)) {
      alert('入力値が無効です。');
      return;
    }
    onEditClick(id, inputText);
  };

  const handleDeleteClick = () => {
    onDeleteClick(id);
  };

  return (
    <li>
      <label htmlFor="pointNameInput">
        {type}
        <input
          type="text"
          id="pointNameInput"
          value={inputText}
          onChange={(e) => {
            handleChangeInputText(e);
          }}
        />
      </label>
      {isSaved ? (
        <>
          <button type="button" onClick={handleEditClick}>
            保存
          </button>
          {type === 'waypoint' ? (
            <button type="button" onClick={handleDeleteClick}>
              削除
            </button>
          ) : null}
        </>
      ) : (
        <button type="button" onClick={handleAddClick}>
          追加
        </button>
      )}
    </li>
  );
}
