import { AlertService } from './../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { PhotoService } from './../photo/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {
  checkboxValue = true;
  file: File;
  preview: string;
  photoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)]
    });
  }

  upload() {
    const description = this.photoForm.get('description').value;

    this.photoService
      .upload(description, this.checkboxValue, this.file)
      .subscribe(() => {
        this.alertService.success('Photo posted', true)
        this.router.navigate([''])
      });
  }

  handleFile(file: File){
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
