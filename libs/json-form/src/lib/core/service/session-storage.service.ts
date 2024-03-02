import {Injectable} from '@angular/core';
import {SessionStorageKeyEnum} from '../model/session-storage-key.enum';
import {StorageService} from './interface/i-storage.service';

@Injectable({providedIn: 'root'})
export class SessionStorageService implements StorageService {

  clearAll(): void {
    sessionStorage.clear();
  }

  get(key: SessionStorageKeyEnum): any | undefined {
    return sessionStorage.getItem(key);
  }

  has(key: SessionStorageKeyEnum): boolean {
    return false;
  }

  remove(key: SessionStorageKeyEnum): void {
    sessionStorage.removeItem(key);
  }

  set(key: SessionStorageKeyEnum, value: any): void {
    sessionStorage.setItem(key, value);
  }

  getAndRemove(key: SessionStorageKeyEnum): any | undefined {
    const value = this.get(key);
    this.remove(key);
    return value;
  }
}
