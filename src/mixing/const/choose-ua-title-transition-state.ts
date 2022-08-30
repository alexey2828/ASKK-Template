import { TTitleEnToUa } from '../../infrastructure/interface';

export enum ETransitionsMixing {
  TRANSITION = 'lorem ipsum',
}

export enum ETransitionsUK {
  TRANSITION = 'lorem ipsum',
}

export const chooseTransitionsUa: TTitleEnToUa = {
  TRANSITION: TRANSITION
};

enum EStateUK {
  STATE = 'lorem ipsum',
}

export enum EState {
  STATE = 'lorem ipsum',
}

export const chooseStateUa: TTitleEnToUa = {
  STATE: STATE
};

export const choiceColorState: TTitleEnToUa = {
  STATE: 'rgb(27, 151, 245)', // (голубой)
};
