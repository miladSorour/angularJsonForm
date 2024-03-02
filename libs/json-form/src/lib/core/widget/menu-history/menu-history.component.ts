import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {MenuHistoryService} from "./menu-history.service";
import { IconEnum } from "../../enum/icon.enum";
import { Bookmark, BookmarkService } from "../../service/bookmark.service";

@Component({
  selector: 'app-menu-history',
  templateUrl:'menu-history.component.html'
})

export class MenuHistoryComponent implements OnInit, OnDestroy{
  historySub: Subscription;
  iconEnum = IconEnum;


  constructor(public menuHistoryService: MenuHistoryService,
              public bookmarkService: BookmarkService,) {
    this.historySub = this.bookmarkService.bookmarkObservable.subscribe(this.updateBookmarks);
  }

  updateBookmarks = (bookmarks: Bookmark[]) => {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.historySub.unsubscribe();
  }

  addToHistory(name: string, url: string) {
    if (url) {
      // this.router.navigate([url]);
      this.menuHistoryService.addHistory({url: url, name: name});
    }
  }

  getIndexColor(i: number) {
    if( i%4 == 0) {
      return 'text-success'
    } else if (i%4 == 1){
      return 'text-primary'
    }else if (i%4 == 2) {
      return 'text-warning'
    }else {
      return 'text-danger'
    }
  }

  getIndexBgColor(i: number) {
    if( i%4 == 0) {
      return 'bg-danger'
    } else if (i%4 == 1){
      return 'bg-primary'
    }else if (i%4 == 2) {
      return 'bg-warning'
    }else {
      return 'bg-success'
    }
  }
}
