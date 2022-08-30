import { TMember } from '../../infrastructure/api-platform';
import { IRole, isRole } from './role';
import { isTitle, ITitle } from './title';

//! нет поля отдел
export interface IUser extends TMember {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  title: ITitle;
  userRoles: IRole[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUser(obj: any): obj is IUser {
  return (
    obj &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.phoneNumber === 'string' &&
    typeof obj.isActive === 'boolean' &&
    isTitle(obj.title) &&
    (!obj.userRoles || !obj.userRoles[0] || isRole(obj.userRoles[0]))
  );
}
