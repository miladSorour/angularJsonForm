// @ts-nocheck
import {Injectable, isDevMode} from '@angular/core';
import {MenuHorizontalService} from '../../layout';
import {Menu} from '../../layout/services/menu-config.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../layout/services/local-storage.service';
import {localStorageKeyEnum} from '../../../../views/partials/model/local-storage-key.enum';


@Injectable({providedIn: 'root'})
export class RouterUtilsService {
	/*hasAccess: boolean;

	constructor(
		private menuService: MenuHorizontalService,
		private router: Router,
		private localStorageService: LocalStorageService) {
	}

	routeWithAuth(url: string, data?: object) {
		this.menuService.menuList$.subscribe(menu => {
			if (this.hasAccessToRoute(url, menu)) {
				this.router.navigate([url], {state: {data: data}}).then();
			}
		});
	}

	getDataFromRouter() {
		if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
			return this.router.getCurrentNavigation().extras.state.data;
		}
	}

	routeWithAuthOnNewTab(url: string, data?: object) {
		this.menuService.menuList$.subscribe(menu => {
			if (this.hasAccessToRoute(url, menu)) {
				let path = '';
				if (!isDevMode()) {
					path += window.location.pathname.split('/')[1] + url;
				} else {
					path = url;
				}
				this.localStorageService.set(localStorageKeyEnum.queryParam, JSON.stringify(data));
				const url1 = this.router.serializeUrl(this.router.createUrlTree([path]));
				window.open(url1, '_blank');
			}
		});
	}

	getDataFromRouterOnNewTab(): any {
		return JSON.parse(this.localStorageService.getAndRemove(localStorageKeyEnum.queryParam));
	}

	hasAccessToRoute(currentUrl: string, menuList: Menu[]): boolean {
		menuList.forEach(menu => {
			if (currentUrl === menu.page) {
				this.hasAccess = true;
			} else if (menu.children && menu.children.length > 0) {
				this.hasAccessToRoute(currentUrl, menu.children);
			}
		});
		return this.hasAccess;
	}
*/
}
