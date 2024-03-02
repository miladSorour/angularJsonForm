import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

export interface History {
  url: string;
  name: string;
}

@Injectable({providedIn: "root"})
export class HistoryService {
  histories: History[];
  historyObservable: Subject<History[]>;

constructor() {
  this.histories = [];
  this.historyObservable = new Subject<History[]>;
}
}
