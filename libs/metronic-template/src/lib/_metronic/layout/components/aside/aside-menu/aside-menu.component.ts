import { Component, Input, OnInit } from '@angular/core';
import { IconEnum, MenuService } from '@pnrng/json-form';
import { MenuHistoryService } from '@pnrng/json-form';
import { Menu } from '@pnrng/json-form';
import { AsideMenuService } from "./aside-menu.service";
import { MetroincService } from '../../../metroinc.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion='';
  appPreviewChangelogUrl='';
  appProduction='';
  public menuItems: Menu[];
  public searchMenuItems: Menu[];
  public searchKey: string = '';
  iconEnum = IconEnum;
  @Input() menuListDemo = [];

  constructor(public menuService: MenuService,
    private menuHistoryService: MenuHistoryService,
    private asideMenuService: AsideMenuService,
    private environmentService:MetroincService) {
  }

  ngOnInit() {
    this.loadMenu();
    this.appAngularVersion = this.environmentService.environment.appVersion;
    this.appPreviewChangelogUrl = this.environmentService.environment.appPreviewChangelogUrl;
    this.appProduction = this.environmentService.environment.production;  
  }

  loadMenu() {
    if (this.menuListDemo && this.menuListDemo.length > 0) {
      this.menuItems = this.menuListDemo;
    } else {
      this.asideMenuService.getMenuList().subscribe((res) => {
        this.menuItems = [...res.body];        
        this.menuItems= this.menuItems.map(item=>{
          if(item.id===30001){
            item.children=[
              {
                "id": 300011,
                "title": "گفتگوی خصوصی",
                "route": "/apps/chat/private-chat",
                "order": 1,
                "enabled": true,
                "cssClass": null,
                "parentId": 1,
                "children": [],
              },
              {
                "id": 300012,
                "title": "گفتگوی گروهی",
                "route": "/apps/chat/group-chat",
                "order": 2,
                "enabled": true,
                "cssClass": null,
                "parentId": 1,
                "children": [],
              },
            ]
          }
          return item
        });

        this.searchMenuItems = [...this.menuItems];
        this.asideMenuService.getSearchInput().subscribe(res => {
          this.searchKey = res;
          this.searchMenuItems = this.searchFilter(res, this.menuItems);
        })
      })
    }
  }

  addToHistory(name: string, url: string) {
    if (url) {
      this.menuHistoryService.addHistory({ url: url, name: name });
    }
  }

  searchFilter(search: string, directories: Menu[]) {
    let results: Menu[] = []
    for (const directory of directories) {
      if (directory.route && directory?.title!.indexOf(search) !== -1) {
        results.push(directory);
      }
      if (directory.children !== null && directory?.children!.length > 0) {
        const childSearch = this.searchFilter(search, directory?.children!)
        if (childSearch !== undefined) {
          results = results.concat(childSearch);
        }
      }
    }
    return results;
  }

  isSearch(): boolean {
    const search = this.searchKey
    const result = typeof search === 'string' ? search.trim() : ''
    return result.trim().length <= 0;
  }
}
