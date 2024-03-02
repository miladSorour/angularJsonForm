import {ServiceLocator} from '../service/locator.service';
import {LayoutUtilsService, MessageType} from '../service/layout-utils.service';

export function notifySuccess(message: string) {
  const layoutUtilsService = ServiceLocator.injector.get(LayoutUtilsService);
  layoutUtilsService.showActionNotification(message, MessageType.Create);
}

export function notifyError(message: string) {
  const layoutUtilsService = ServiceLocator.injector.get(LayoutUtilsService);
  layoutUtilsService.showActionNotification(message, MessageType.Error);
}

export function notifyInfo(message: string) {
  const layoutUtilsService = ServiceLocator.injector.get(LayoutUtilsService);
  layoutUtilsService.showActionNotification(message, MessageType.Info);
}
