import {Component, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {DownloadFileService} from "../../service/downloadFile.service";
import {BaseDialogComponentModel} from "../../model/base-dialog-component.model";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: 'pdf-viewer.component.html'
})
export class PdfViewerComponent extends BaseDialogComponentModel<string> implements OnInit {

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: { pdfSrc: any; refresh: () => void; };
  apiAddress: string;
  downloadFileName: string;

  constructor(private downloadFileService: DownloadFileService,
              public injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.apiAddress = this.dialogConfig.dialogData;
    this.downloadFileName = this.dialogConfig.dialogData['downloadFileName'];
    this.downloadFileService.downloadFile(this.apiAddress).subscribe(
      (res: string) => {
        this.pdfViewerOnDemand.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerOnDemand.refresh();    // Ask pdf viewer to load/refresh pdf
      }
    );
  }

}
