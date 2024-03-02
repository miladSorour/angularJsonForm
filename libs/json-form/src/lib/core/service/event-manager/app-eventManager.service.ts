import {Observable, Observer} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AppEventContentModel} from './app-event-content.model';

@Injectable({providedIn: 'root'})
export class AppEventManagerService {

	observable: Observable<AppEventContentModel<any> | string>;
	observer: Observer<AppEventContentModel<any> | string>;

	constructor() {
		this.observable = Observable.create((observer: any) => {
			this.observer = observer;
		}).pipe(share());
	}

	/**
	 * Method to broadcast the event to observer
	 */
	broadcast(event: any) {
		if (this.observer) {
			this.observer.next(event);
		}
	}

	/**
	 * Method to subscribe to an event with callback
	 */
	subscribe(eventName: string, callback: any) {
    return this.observable
      .pipe(filter((event) => {
        if (typeof event === 'string') {
          return event === eventName;
        }
        return event.name === eventName;
      }), map((event) => {
        if (typeof event !== 'string') {
          // return event.content;
          return event;
        }
      }))
      .subscribe(callback);
	}

	/**
	 * Method to unsubscribe the subscription
	 */
	destroy(subscriber: any) {
		subscriber.unsubscribe();
	}
}
