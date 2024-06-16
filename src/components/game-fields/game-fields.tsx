import React from 'react';

type TFirstFieldProps = {
  handleNumberSelect: (field: 'field1' | 'field2', number: number) => void;
};

function GameFields({ handleNumberSelect }: TFirstFieldProps) {
  return (
    <>
      <p>Поле 1: Отметьте 8 чисел</p>
      <div>
        {[...Array(19)].map((_, i) => (
          <button key={i + 1} onClick={() => handleNumberSelect('field1', i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      <p>Поле 2: Отметьте 1 число</p>
      <div>
        {[1, 2].map((number) => (
          <button key={number} onClick={() => handleNumberSelect('field2', number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
}

export default GameFields;
