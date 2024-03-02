import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppDialogService} from "../dialog/service/app-dialog.service";
import {Router} from "@angular/router";
import {QueryResult} from "../../model/queryResult.model";
import {Pagination} from "../../model/pagination.model";
import {AppDialogModel} from "../dialog/models/app-dialog.model";
import {DialogSizeEnum} from "../dialog/models/dialog-size.enum";
import { TaskCount } from '../../model/task-count.model';
import { cartableTypeEnum } from '../../enum/cartable-type-enum';
import { CartableService } from '../../service/cartable.service';
import { Task } from '../../model/task.model';
import { CartablePathEnum } from '../../enum/page-type-enum';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit, OnDestroy {
  pagination = new Pagination('e.id');
  public userTasks: Task[];
  public groupTasks: Task[];
  public taskSearch: Task;
  public taskCount: TaskCount;
  public cartableType = cartableTypeEnum;
  public tabActivation = 'userTask'

  constructor(private cartableService: CartableService,
              private routerService: Router,
              private dialogService: AppDialogService) {
  }

  ngOnInit() {
    this.loadAllByType()
    this.getTaskCount();
  }

  /**
   * نمایش و بارگزاری اطلاعات کارتابل براساس سربرگ های 1-کارهای من 2 کارهای نقش من
   */
  loadAllByType() {
    // user issue
    this.cartableService.getAuthenticatedUserTasks(new Task(), this.pagination).subscribe((res: QueryResult<Task>) => {
      if (res.entityList) {
        this.userTasks = res.entityList!.slice(0, 4);
      }
    });
    // group issue
    this.cartableService.getGroupTasks(this.taskSearch, this.pagination).subscribe((res: QueryResult<Task>) => {
      if (res.entityList) {
        this.groupTasks = res.entityList!.slice(0, 4);
      }
    });

  }

  /**
   * نمایش و جزئیات (مشاهده و بررسی)
   * @param task Task
   */
  showConfirmModal(task: Task) {
    let path = CartablePathEnum.DASHBOARD;
    if (task.formKey) {
      this.routerService.navigate(['/cyber/' + task.formKey],
        {queryParams: {modelId: task.modelId, processInstanceId: task.processInstanceId, taskId: task.id, path: path}});
    } else {
      let status = false;
      const dialogConfig: AppDialogModel = {
        size: DialogSizeEnum.lg,
        dialogData: {task, status},
      }
      this.dialogService.openDialog(ConfirmationComponent, dialogConfig);
    }
  }

  /**
   * نمایش تعداد کارهای من و کارهای نقش من با متد زیر
   */
  getTaskCount() {
    this.cartableService.getTaskCount(new Task(), this.pagination).subscribe((res: TaskCount) => {
      this.taskCount = res;
    });
  }

  /**
   * نمایش و مشاهده فرم کارتابل
   */
  showAllTasks() {
    this.routerService.navigate(['/access-control/cartable']);
  }

  ngOnDestroy() {
  }
}
