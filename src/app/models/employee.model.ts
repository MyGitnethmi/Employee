import {DateArray} from 'ngx-bootstrap/chronos/types';
import {DateInput} from 'ngx-bootstrap/chronos/test/chain';

export class Employee{
  id: number;
  name: string;
  gender: string;
  email?: string;
  phoneNumber?: number;
  contactPreference: string;
  dateOfBirth: Date;
  department: string;
  isActive: boolean;
  photoPath?: string;
  password: string;
  confirmPassword: string;
}
