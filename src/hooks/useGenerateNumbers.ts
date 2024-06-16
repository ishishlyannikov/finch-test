import { useState } from 'react';
import { DataToSend, SelectedNumbers, WinningNumbers } from '../types';
import { generateUniqueNumbers } from '../utils/generateUniqueNumbers';
import { sendNumbersToServer } from '../api/sendNumbersToServer';

const initialSelectedNumbers = { field1: [], field2: null };
const initialWinningNumbers = { field1: [], field2: 0 };

type TGenerateNumbers = {
  generateNumbers: (type?: 'isWinning') => void;
  handleNumberSelect: (field: 'field1' | 'field2', number: number) => void;
  handleGenerateAndCheck: VoidFunction;
  isWinner: boolean;
};

export const useGenerateNumbers = (): TGenerateNumbers => {
  const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbers>(initialSelectedNumbers);
  const [winningNumbers, setWinningNumbers] = useState<WinningNumbers>(initialWinningNumbers);
  const [isWinner, setIsWinner] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState<SelectedNumbers>(initialSelectedNumbers);

  const handleNumberSelect = (field: 'field1' | 'field2', number: number) => {
    console.log(`Выбрано число ${number} для поля ${field}`);
    if (field === 'field1' && selectedNumbers.field1.length < 8) {
      if (!selectedNumbers.field1.includes(number)) {
        setSelectedNumbers((prevState) => ({
          ...prevState,
          field1: [...prevState.field1, number],
        }));
      }
    } else if (field === 'field2') {
      setSelectedNumbers((prevState) => ({
        ...prevState,
        field2: number,
      }));
    }
  };

  const generateNumbers = (type?: 'isWinning') => {
    const field1Numbers = generateUniqueNumbers(8, 19);
    const field2Number = Math.floor(Math.random() * 2) + 1;

    if (type === 'isWinning') {
      console.log(`Сгенерированные выигрышные номера: Поле 1 - ${field1Numbers.join(', ')}, Поле 2 - ${field2Number}`);
      setWinningNumbers({ field1: field1Numbers, field2: field2Number });
    } else {
      console.log(`Сгенерированные номера: Поле 1 - ${field1Numbers.join(', ')}, Поле 2 - ${field2Number}`);
      setRandomNumbers({ field1: field1Numbers, field2: field2Number });
    }
  };

  const resetGame = () => {
    setSelectedNumbers(initialSelectedNumbers);
    setRandomNumbers(initialSelectedNumbers);
    setWinningNumbers(initialWinningNumbers);
    setIsWinner(false);
  };

  const checkForWin = () => {
    const matchesField1 = randomNumbers.field1.filter((number) => winningNumbers.field1.includes(number)).length;
    const matchesField2 = randomNumbers.field2 === winningNumbers.field2 ? 1 : 0;
    const winner = matchesField1 >= 4 || (matchesField1 >= 3 && matchesField2 === 1);
    setIsWinner(winner);
    if (winner) {
      console.log('Поздравляем! Вы победили!');
    } else {
      console.log('К сожалению, вы не выиграли. Попробуйте ещё раз!');
    }
  };

  const handleGenerateAndCheck = () => {
    let numbersToSend = selectedNumbers;

    if (randomNumbers.field1.length > 0 || randomNumbers.field2 !== null) {
      numbersToSend = randomNumbers;
    }

    if (numbersToSend.field1.length < 8 || numbersToSend.field2 === null) {
      console.log('Введите все необходимые числа.');
      return;
    }

    generateNumbers('isWinning');
    checkForWin();
    resetGame();

    const dataToSend: DataToSend = {
      selectedNumber: {
        firstField: numbersToSend.field1,
        secondField: numbersToSend.field2 !== null ? [numbersToSend.field2] : [],
      },
      isTicketWon: isWinner,
    };
    sendNumbersToServer(dataToSend);
  };

  return {
    generateNumbers,
    handleNumberSelect,
    handleGenerateAndCheck,
    isWinner,
  };
};
