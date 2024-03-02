import {Injectable} from "@angular/core";
import {localStorageKeyEnum} from '../model/local-storage-key.enum';
import {StorageService} from './interface/i-storage.service';

@Injectable({providedIn: 'root'})
export class LocalStorageService implements StorageService {

	clearAll(): void {
		localStorage.clear()
	}

	get(key: localStorageKeyEnum): any | undefined {
		return localStorage.getItem(key);
	}

	has(key: localStorageKeyEnum): boolean {
		return false;
	}

	remove(key: localStorageKeyEnum): void {
		localStorage.removeItem(key)
	}

	set(key: localStorageKeyEnum, value: any): void {
		localStorage.setItem(key, value)
	}

	getAndRemove(key: localStorageKeyEnum) {
		const value = this.get(key);
		this.remove(key)
		return value;
	}
}
