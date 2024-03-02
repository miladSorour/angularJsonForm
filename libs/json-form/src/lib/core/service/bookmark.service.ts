import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface Bookmark {
  url: string;
  name: string;
}

@Injectable({providedIn: "root"})
export class BookmarkService {
  public bookmarks: Bookmark[];
  public bookmarkObservable: Subject<Bookmark[]>;

  constructor() {
    this.bookmarks = [];
    this.bookmarkObservable = new Subject<Bookmark[]>();
    this.bookmarkObservable.subscribe(this.saveChanges);
    this.retrieveData();
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.bookmarkObservable.next([...this.bookmarks]);
  }

  removeBookmark(bookmarkName: string) {
    this.bookmarks.forEach((bm, i) => {
      if (bm.name == bookmarkName) {
        this.bookmarks.splice(i, 1);
        this.bookmarkObservable.next([...this.bookmarks]);
        return;
      }
    });
  }

  isBookmarked = (bookmarkName: string): boolean => {
    for (let bm of this.bookmarks) {
      if (bm.name === bookmarkName) {
        return true;
      }
    }
    return false;
  }

  saveChanges = (bookmarks: Bookmark[]) => {
    this.bookmarks = [...bookmarks];
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  retrieveData() {
    let bookmarks = window.localStorage.getItem('bookmarks');
    if (bookmarks != null) {
      this.bookmarkObservable.next(JSON.parse(bookmarks));
    }
  }
}
