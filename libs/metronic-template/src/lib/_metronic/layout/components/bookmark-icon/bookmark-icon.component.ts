import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Bookmark, BookmarkService} from "../../core/bookmark.service";
import {Subscription} from "rxjs";
import { IconEnum } from "@pnrng/json-form";

@Component({
  selector: 'app-bookmark-icon',
  templateUrl: 'bookmark-icon.component.html'
})

export class BookmarkIconComponent implements OnInit, OnDestroy{
  @Input() name: string | any;
  @Input() url: string | any;
  isBookamarked: boolean;
  bookmark: Bookmark;
  bookmarkSubscription: Subscription;
  iconEnum = IconEnum;

  constructor(public bookmarkService: BookmarkService) {
  }

  ngOnInit(){
    this.bookmarkSubscription = this.bookmarkService.bookmarkObservable.subscribe(this.subscribeBookmark);
    this.bookmark = { name: this.name, url: this.url };
    this.isBookamarked = this.bookmarkService.isBookmarked(this.name);
  }

  ngOnDestroy(): void {
    this.bookmarkSubscription.unsubscribe();
  }

  handleBookmark(){
    if(this.isBookamarked) {
      this.bookmarkService.removeBookmark(this.bookmark.name);
    } else {
      this.bookmarkService.addBookmark(this.bookmark);
    }
  }

  subscribeBookmark = (bookmarks: Bookmark[]) => {
    this.isBookamarked = this.bookmarkService.isBookmarked(this.name);
  }
}
