import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import * as URLString from '../../apppath.items';

const urlUpload:string = URLString.URL_UPLOAD;

interface FormData {
  concurrency: number;
  autoUpload: boolean;
  verbose: boolean;
}

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html'
})
export class FileuploadComponent implements OnInit {
  formData: FormData;
  files: UploadFile[];
  filescompleted: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  urlUploadFolder:string = URLString.URL_UPLOAD_FOLDER;

  constructor() {
    this.formData = {
      concurrency: 1,
      autoUpload: false,
      verbose: true
    };

    this.files = [];
    this.filescompleted = []
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }


  ngOnInit() {
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {

    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      this.filescompleted.push(output.file);
      this.removeFile(output.file.id);
    }

  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: urlUpload,
      method: 'POST',
      concurrency: this.formData.concurrency
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

}
