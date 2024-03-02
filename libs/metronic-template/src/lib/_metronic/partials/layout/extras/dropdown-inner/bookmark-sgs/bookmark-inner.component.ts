import {Component, OnInit, HostBinding, OnDestroy} from "@angular/core";
import {Bookmark, BookmarkService} from "../../../../../layout/core/bookmark.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookmark-inner',
  templateUrl: 'bookmark-inner.component.html',
})

export class BookmarkInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  @HostBinding('attr.data-kt-bookmark-element') dataKtSearch = 'content';
  bookmarkSub: Subscription;

  constructor(public bookmarkService: BookmarkService) {
    this.bookmarkSub = this.bookmarkService.bookmarkObservable.subscribe(this.updateBookmarks);
  }

  updateBookmarks = (bookmarks: Bookmark[]) => {
  }

  ngOnInit(){
  }

  ngOnDestroy(){
    this.bookmarkSub.unsubscribe();
  }
}
