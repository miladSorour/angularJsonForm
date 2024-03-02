import { Component, HostBinding } from '@angular/core';
import {Menu} from '@pnrng/json-form';
import {Router} from "@angular/router";
import {MenuService} from '@pnrng/json-form';

@Component({
  selector: 'app-notifications-sgs',
  templateUrl: './notifications-sgs.component.html',
})
export class NotificationsSgsComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  notifications: Menu[] | null;
  constructor(public menuService: MenuService,
              public router: Router,) {
              this.menuService.notifications().subscribe((res) => {
              this.notifications= res.body})}

  navigateTo(route: any) {
    this.router.navigate([route]);
  }

  getNotificationCount() {
    let count = 0;
    this.notifications?.forEach(n => {
      count += n.order;
    });
    return count;
  }

  reloadNotifications() {
    this.menuService.notifications().subscribe((res) => {
      this.notifications = res.body;
    });
  }
}
