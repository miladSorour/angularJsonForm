import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import { AuthService } from "../service/auth.service";

@Directive({selector: '[hasAuthority]'})
export class HasAuthorityDirective {

  private authorities: string[];

  constructor(private authService: AuthService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set hasAuthority(value: string | string[] | undefined) {
    if (value) {
      this.authorities = typeof value === 'string' && value!== '' ? [<string>value] : [...value];
    }
    this.updateView();
  }

  private updateView(): void {
    if (!this.authorities) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.authService.hasAnyAuthority(this.authorities).then((result) => {
        this.viewContainerRef.clear();
        if (result) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
    }
  }
}
