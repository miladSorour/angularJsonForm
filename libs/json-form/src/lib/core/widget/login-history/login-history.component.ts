import {AfterViewInit, Component} from '@angular/core';
import {LoginHistoryService} from "./login-history.service";
import {LoginHistory} from "./login-history.model";
import {BehaviorSubject} from 'rxjs';
import { BrowserTypeEnum } from '../../enum/browser-type.enum';
import { ImageSource } from '../../enum/src-img';

@Component({
  selector: 'app-history1',
  templateUrl: './login-history.component.html',
})
export class LoginHistoryComponent implements AfterViewInit{
  loginHistory: BehaviorSubject<LoginHistory[]> = new BehaviorSubject<LoginHistory[]>([]);
  constructor(public loginHistoryService: LoginHistoryService) {

  }

  ngAfterViewInit(): void {
    this.loginHistoryService.list().subscribe((firstHistory) => {
      this.loginHistory.next(firstHistory)
    })
    }

  getBrowserImg(browserType: number | undefined){
    switch (browserType){
      case BrowserTypeEnum.CHROME_BROWSER:
        return ImageSource.Chrome_Browser;
      case BrowserTypeEnum.FIREFOX_BROWSER:
        return ImageSource.Firefox_Browser;
      case BrowserTypeEnum.OPERA_BROWSER:
        return ImageSource.Opera_Browser;
      case BrowserTypeEnum.INTERNET_EXPLORER_BROWSER:
        return ImageSource.Internet_Explorer_Browser;
      case BrowserTypeEnum.MICROSOFT_EDGE_BROWSER:
        return ImageSource.Microsoft_Edge_Browser;
      case BrowserTypeEnum.SAFARI_BROWSER:
        return ImageSource.Safari_Browser;
    }
  }
}


