import {Component, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges} from "@angular/core";
import {FormBuilder, NgControl} from "@angular/forms";
import {DigitalArchiveService} from "./digitalArchive.service";
import {DigitalArchiveModel} from "./digitalArchive.model";
import {saveAs} from "file-saver";
import {QueryResult} from "../../model/queryResult.model";
import {Pagination} from "../../model/pagination.model";
import {AppDigitalArchiveCardConfig} from "./app-digital-archive-card.config";
import { IconEnum } from "../../enum/icon.enum";
import { DownloadFileService } from "../../service/downloadFile.service";

@Component({
  selector: 'app-digital-archive-card',
  templateUrl: 'digital-archive-card.component.html',
  styleUrls: ['digitalArchive.component.css']
})
export class DigitalArchiveCardComponent implements OnInit {

  @Input() data         : AppDigitalArchiveCardConfig;
  checkedRows: number[] = []
  imgUrl: string;
  timeStamp: any;
  digitalArchiveList: any;
  entitySearch = new DigitalArchiveModel();
  pagination: Pagination = new Pagination('e.docIndex')
  size = 'sm';
  lightboxIndex: number;
  itemProperties: {
    key: string, // which property
    title?: string, // if you want to show label
    state?: boolean, // if you want to show label
  }[] = [
    {key: 'docTypeTopic', title: 'نوع سند', state: true},
    {key: 'classificationTopic', title: 'محرمانگی', state: false},
    {key: 'createdDate', title: 'تاریخ ثبت', state: false},
    {key: 'creatorUserCode', title: 'کاربر ثبت کننده', state: false},
    {key: 'organizationName', title: 'یگان ثبت کننده', state: false},
    {key: 'description', title: 'توضیحات سند', state: false},
  ];
  iconEnum = IconEnum;

  constructor(
    private digitalArchiveService: DigitalArchiveService,
    private downloadFileService: DownloadFileService,) {
  }

  ngOnInit(): void {
    this.entitySearch.personnelId =  this.data.personnelId
    this.entitySearch.deleted =  this.data.deleted;
    this.entitySearch.hierarchyCode =  this.data.hierarchyCode
    this.digitalArchiveService.getAllGridWithPagination(this.entitySearch, this.pagination)
      .subscribe((value: (QueryResult<DigitalArchiveModel>)) => {
        this.digitalArchiveList = value.entityList
      });
  }

  setStateOfChecking(id: number) {
    if (this.checkedRows.includes(id)) {
      this.checkedRows = this.checkedRows.filter(item => item != id);
    } else {
      this.checkedRows.push(id);
    }
  }

  openSlider(filecode: string): void {
    this.setLinkPicture('/api/DigitalArchive/getFile/' + filecode + '?fileCode=' + filecode);
  }

  setLinkPicture(url: string) {
    this.imgUrl = url;
    this.timeStamp = (new Date()).getTime();
  }

  checkRow(id: number) {
    return this.checkedRows.includes(id);
  }

  defaultImage(event: any, fileType: string) {
    if (fileType === 'pdf') {
      event.target.src = 'assets/img/pdf.jpg';
    } else if (fileType === 'docx' || fileType === 'doc') {
      event.target.src = 'assets/img/word.png';
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      event.target.src = 'assets/img/excel.png';
    } else if (fileType === 'ppt' || fileType === 'pps' || fileType === 'pptx') {
      event.target.src = 'assets/img/powerpoint.png';
    } else {
      event.target.src = 'assets/img/defaultImage.jpg';
    }
  }

  validateItems(itemProperties: { key?: string; title?: string; state?: boolean }[]) {
    return itemProperties.filter(p => p.state);
  }

  downloadFileByFileCode(fileCode: string, fileName: string) {
    this.downloadFileService.downloadFile('/api/DigitalArchive/downloadFile/' + fileCode).subscribe(
      (res: string | Blob) => {
        saveAs(res, fileName);
      });
  }

  onSuffixIconClicked() {
    console.log('jklh')
  }

  editDocumentDescription(doc: any) {
  }

  deleteDigitalArchiveById(id: number) {

  }

  restoreDigitalArchiveById(id: number) {

  }
}
