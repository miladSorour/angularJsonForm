import {Component, OnInit, HostBinding, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {MenuHistoryService} from "../menu-history.service";
import { IconEnum } from "../../../enum/icon.enum";
import { Bookmark, BookmarkService } from "../../../service/bookmark.service";

@Component({
  selector: 'app-menu-history-inner',
  templateUrl: 'menu-history-inner.component.html'
})

export class MenuHistoryInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  @HostBinding('attr.data-kt-bookmark-element') dataKtSearch = 'content';
  iconEnum = IconEnum;
  historySub: Subscription;

  constructor(public menuHistoryService: MenuHistoryService,
              public bookmarkService: BookmarkService) {
    this.historySub = this.bookmarkService.bookmarkObservable.subscribe(this.updateBookmarks)
  }

  updateBookmarks = (bookmarks: Bookmark[]) => {
  }

  ngOnInit(){
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

}
