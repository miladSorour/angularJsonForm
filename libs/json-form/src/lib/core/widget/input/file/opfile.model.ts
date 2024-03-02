
export class OPFile {
    constructor(
        public file?: File,
        public fileCode?: string,
        public fileName?: string,
        public fileType?: string
    ) {
        this.fileCode = '-1';
        this.fileName = '';
    }
}
