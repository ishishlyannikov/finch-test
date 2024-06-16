import { DataToSend } from '../types';

export const sendNumbersToServer = (data: DataToSend, attempts = 0) => {
  fetch('/finch-test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      const random = Math.random();
      if (response.ok || random > 0.5) {
        window.alert('Данные успешно отправлены');
      } else {
        throw new Error(`Сервер вернул ошибку ${response.status}`);
      }
    })
    .catch((error) => {
      if (attempts < 2) {
        setTimeout(() => sendNumbersToServer(data, attempts + 1), 2000);
      } else {
        window.alert(`Ошибка при отправке данных: ${error}`);
      }
    });
};
