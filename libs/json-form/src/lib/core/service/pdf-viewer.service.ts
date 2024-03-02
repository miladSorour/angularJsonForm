import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppDialogService} from "../widget/dialog/service/app-dialog.service";
import {AppDialogModel} from "../widget/dialog/models/app-dialog.model";
import {DialogSizeEnum} from "../widget/dialog/models/dialog-size.enum";
import {PdfViewerComponent} from "../widget/pdf-viewer/pdf-viewer.component";

@Injectable({providedIn: 'root'}
)
export class PdfViewerService {

  constructor(private http: HttpClient,
              private appDialogService: AppDialogService) {
  }

  openPdfViewer(url: string, downloadFileName?: string) {
    if (downloadFileName) {
      downloadFileName = 'report.pdf'
    }
    const dialogModel: AppDialogModel = {
      size: DialogSizeEnum.lg,
      dialogData: {"url": url, "downloadFileName": downloadFileName},
    }
    this.appDialogService.openDialog(PdfViewerComponent, dialogModel)
  }
}
