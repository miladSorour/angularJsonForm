import {BaseEntity} from './baseEntity.model';


export class Menu extends BaseEntity<number> {
    constructor(public title?: string,
                public route?: string,
                public route2?: string,
                public order?: number | any,
                public enabled?: boolean,
                public cssClass?: string,
                public parentId?: number,
                public parentTitle?: string,
                public routerLinkActive ?: boolean,
                public children ?: Menu[],
                public isCollapsed?: boolean
    ) {
        super();
        this.title = '';
        this.route = '';
        this.route2 = '';
        this.order = -1;
        this.enabled = true;
        this.cssClass = '';
        this.parentId = -1;
        this.parentTitle = '';
        this.children = [];
        this.routerLinkActive = false;
        this.isCollapsed = false;
    }

}
