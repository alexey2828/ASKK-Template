import { EntityList } from './model/entity-list';

export interface IListItem<T> {
  data: T;
  onPress: () => void;
}

export { EntityList };
