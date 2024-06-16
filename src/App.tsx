import React from 'react';
import GameFields from './components/game-fields/game-fields';
import { useGenerateNumbers } from './hooks/useGenerateNumbers';

function App() {
  const { generateNumbers, handleNumberSelect, handleGenerateAndCheck, isWinner } = useGenerateNumbers();

  return (
    <>
      <h1>Билет 1</h1>
      <button onClick={() => generateNumbers()}>✨</button>

      <GameFields handleNumberSelect={handleNumberSelect} />

      <button onClick={handleGenerateAndCheck}>Показать результат</button>
      {isWinner && <p>Поздравляем! Вы победили!</p>}
    </>
  );
}

export default App;
