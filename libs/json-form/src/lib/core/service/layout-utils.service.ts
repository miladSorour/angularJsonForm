// Angular
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// Partials for CRUD
import {Route} from "@angular/router";
import {ToastrService} from "ngx-toastr";

export enum MessageType {
  Create,
  Read,
  Update,
  Delete,
  Error,
  Info
}

@Injectable({providedIn: 'root'})
export class LayoutUtilsService {
  /**
   * Service constructor
   *
   * @param dialog: MatDialog
   * @param toast: ToasterService
   */
  constructor(private toast: ToastrService) {
  }

  /**
   * Showing (Mat-Snackbar) Notification
   *
   * @param _message
   * @param _type
   * @param _duration
   * @param _showCloseButton
   * @param _showUndoButton
   * @param _verticalPosition
   */
  showActionNotification(
    _message: string,
    _type: MessageType = MessageType.Create,
    _duration: number = 5000,
    _showCloseButton: boolean = false,
    _showUndoButton: boolean = false,
    _verticalPosition: 'top' | 'bottom' = 'top'
  ) {
    switch (_type) {
      case MessageType.Create: {
        this.toast.success(_message);
        break;
      }
      case MessageType.Delete: {
        this.toast.success(_message);
        break;
      }
      case MessageType.Update: {
        this.toast.success(_message);
        break;
      }
      case MessageType.Error: {
        this.toast.error(_message);
        break;
      }
      case MessageType.Info: {
        this.toast.info(_message);
        break;
      }
    }
  }

  /**
   * Returns Module's child route
   *
   * @param pathName: string
   * @param routerChildren: Route[]
   * @Return componentPath: string
   */
  getComponentRoutePath(pathName: string, routerChildren: Route[]) {
    let componentPath = '';
    routerChildren.forEach(route => {
      if (route.path == pathName) {
        componentPath = '/digital-associate/' + route.path;
      }
    });
    return componentPath;
  }
}
