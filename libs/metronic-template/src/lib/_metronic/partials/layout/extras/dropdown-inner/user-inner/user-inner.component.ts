import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService, LayoutUtilsService, MessageType, TranslationService, UserRole, UserService, UserType} from  '@pnrng/json-form';
import { MetroincService } from '../../../../../layout/metroinc.service';
const TXT_CHANGE_USER_ROLE = 'تغییر نقش با موفقیت انجام شد';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  private unsubscribe: Subscription[] = [];
  language: LanguageFlag;
  langs = languages;
  authUser: UserType;
  public roles: UserRole[];
  public currentRole : UserRole;
  appProduction='';

  constructor(private authService: AuthService,
              private layoutUtilsService: LayoutUtilsService,
              private userService: UserService,
              private translationService: TranslationService,
              private environmentService:MetroincService) {
    this.authUser = authService.currentUserValue

  }

  ngOnInit(): void {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.loadUserRole();
    this.appProduction = this.environmentService.environment.production;  
  }

  loadUserRole() {
    this.userService.getUserRoles().subscribe((response: UserRole[]) => {
      this.roles = response;
      this.currentRole = this.roles.find(r => r.isCurrent)!;
    });
  }

  changeRole(userRoleId: any) {
    this.userService.changeUserRole(userRoleId!).subscribe((res) => {
      this.layoutUtilsService.showActionNotification(TXT_CHANGE_USER_ROLE, MessageType.Info);
      this.loadUserRole();
    })
  }

  logout() {
    this.authService.logout();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'fa',
    name: 'فارسی',
    flag: './assets/media/flags/iran.svg',
  },
];
