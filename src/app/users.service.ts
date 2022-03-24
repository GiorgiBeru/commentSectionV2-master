import { Injectable } from '@angular/core';
import { Data } from '../app/app.model';
import { default as data } from '../data.json';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers(): Promise<Data> {
    return new Promise((resolve) => {
      return resolve(data);
    });
  }
}
