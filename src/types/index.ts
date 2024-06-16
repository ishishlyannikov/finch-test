export type SelectedNumbers = {
  field1: number[];
  field2: number | null;
};

export type WinningNumbers = {
  field1: number[];
  field2: number;
};

export type DataToSend = {
  selectedNumber: {
    firstField: number[];
    secondField: number[];
  };
  isTicketWon: boolean;
};
