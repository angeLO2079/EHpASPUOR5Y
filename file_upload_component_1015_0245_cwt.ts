// 代码生成时间: 2025-10-15 02:45:33
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FileUpload, FileUploadOptions, FileUploadState } from 'apollo-angular/upload';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  // Form group for file upload
  fileUploadForm: FormGroup;

  // GraphQL mutation for file upload
  fileUploadMutation = gql`
    mutation UploadFile($file: Upload!) {
      uploadFile(file: $file) {
        filename
        mimetype
        encoding
        path
      }
    }
  `;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  // Handle file change event
  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.fileUploadForm.get('file')!.setValue(file);
    }
  }

  // Upload file to server
  uploadFile(): void {
    if (this.fileUploadForm.valid) {
      const file: File = this.fileUploadForm.get('file')!.value as File;
      const fileUpload: FileUpload = new FileUpload(file, FileUploadState.PENDING);
      const options: FileUploadOptions = {
        file: fileUpload,
        fieldName: 'file',
        metadata: {
          filename: file.name,
          mimetype: file.type
        }
      };

      this.apollo.mutate({
        mutation: this.fileUploadMutation,
        // Pass the options to Apollo
        variables: { file: this.fileUpload(options) },
      }).pipe(
        finalize(() => {
          // Reset form after upload
          this.fileUploadForm.reset({
            file: null,
          });
        }),
      ).subscribe({
        next: (response) => {
          // Handle successful upload
          console.log('File uploaded successfully:', response);
        },
        error: (error) => {
          // Handle error in file upload
          console.error('Error uploading file:', error);
        }
      });
    } else {
      // Handle form validation errors
      console.error('Form is not valid');
    }
  }

  // Private method to create FileUploadObservable
  private fileUpload(options: FileUploadOptions): Observable<FileUploadState> {
    return Observable.create((observer) => {
      const formData = new FormData();
      formData.append(options.fieldName, options.file.variable, options.file.name);
      formData.append('metadata', JSON.stringify(options.metadata));

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (response.ok) {
          observer.next(FileUploadState.DONE);
          observer.complete();
        } else {
          observer.error(new Error('Failed to upload file'));
        }
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}
