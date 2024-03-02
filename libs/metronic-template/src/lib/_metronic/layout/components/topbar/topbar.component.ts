import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../core/layout.service';
import {AuthService, Menu, UserType} from '@pnrng/json-form';
import {MenuService} from '@pnrng/json-form';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  notifications: Menu[] | null;
  authUser: UserType;

  constructor(private layout: LayoutService,
              private authService: AuthService,
              public menuService: MenuService) {
    this.authUser = authService.currentUserValue
    this.menuService.notifications().subscribe((res) => {
      this.notifications = res.body
    })
  }

  getNotificationCount() {
    let count = 0;
    this.notifications?.forEach(n => {
      count += n.order;
    });
    return count;
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }
}
