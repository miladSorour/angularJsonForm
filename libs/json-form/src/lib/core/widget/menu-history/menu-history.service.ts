import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

export interface MenuHistory {
  url:string;
  name:string;
}

@Injectable({providedIn: "root"})
export class MenuHistoryService {
  menuHistories: MenuHistory[];
  historyObservable: Subject<MenuHistory[]>;

  constructor() {
    this.menuHistories = [];
    this.historyObservable = new Subject<MenuHistory[]>();
    this.historyObservable.subscribe(this.saveChanges);
    this.retrieveData();
  }

  addHistory(history: MenuHistory) {
    for(let i=0 ; i <this.menuHistories.length ; i++ ) {
      if(this.menuHistories[i].name == history.name){
        this.menuHistories.splice(i, 1);
        break;
      }
    }
    this.menuHistories.unshift(history);
    if(this.menuHistories.length >= 10)
      this.menuHistories.pop();
    this.historyObservable.next([...this.menuHistories]);
  }

  removeHistory(historyName:string) {
    this.menuHistories.forEach((his, i) => {
      if(his.name == historyName){
        this.menuHistories.splice(i, 1);
        this.historyObservable.next([...this.menuHistories]);
        return;
      }
    });
  }

  saveChanges = (histories: MenuHistory[]) => {
    this.menuHistories = [...histories];
    window.localStorage.setItem('histories', JSON.stringify(histories));
  };

  retrieveData(){
    let histories = window.localStorage.getItem('histories');
    if(histories != null){
      this.historyObservable.next(JSON.parse(histories));
    }
  }


}
