type TUAResponseStatus = {
  [status: number]: string;
};

export const choiceUAResponseStatus: TUAResponseStatus = {
  400: 'Помилка вводу даних',
  404: 'Немає даних',
  422: 'Помилка обробки даних',
  500: 'Внутрішня помилка сервера',
};

export const FAILED_TO_FETCH = "Помилка зв'зку";
