import {AfterViewInit, Component, HostBinding} from "@angular/core";
import {LoginHistoryService} from "../login-history.service";
import {LoginHistory} from "../login-history.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login-history-inner',
  templateUrl: 'login-history-inner.component.html'
})
export class LoginHistoryInnerComponent implements AfterViewInit {
  loginHistory: BehaviorSubject<LoginHistory[]> = new BehaviorSubject<LoginHistory[]>([]);
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  @HostBinding('attr.data-kt-bookmark-element') dataKtSearch = 'content';

  constructor(public loginHistoryService: LoginHistoryService) {

  }

  ngAfterViewInit(): void {
    this.loginHistoryService.list().subscribe((firstHistory) => {
      this.loginHistory.next(firstHistory)
    })
  }

  getBrowserImg(browserType: number | undefined){
    switch (browserType){
      case 0:
        return 'assets/media/logos/Google_Chrome_icon.svg.png';
      case 1:
        return 'assets/media/logos/Google_Chrome_icon.svg.png';
      case 2:
        return 'assets/media/logos/Firefox_logo,_2019.svg.png';
      case 3:
        return 'assets/media/logos/Opera_icon.svg.png';
      case 4:
        return 'assets/media/logos/Internet_Explorer_logo.svg.png';
      case 5:
        return 'assets/media/logos/Microsoft_Edge_logo.svg.png';
      case 6:
        return 'assets/media/logos/Safari_browser_logo.svg.png';
    }
  }

  getBGColor(i: number) {
    if( i%4 == 0) {
      return 'bg-success'
    } else if (i%4 == 1){
      return 'bg-primary'
    }else if (i%4 == 2) {
      return 'bg-warning'
    }else {
      return 'bg-danger'
    }
  }
}
