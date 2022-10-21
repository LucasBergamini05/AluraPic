import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertService } from './../../shared/components/alert/alert.service';
import { Photo } from './../photo/photo';
import { PhotoService } from './../photo/photo.service';

@Component({
  templateUrl: './photo-details.components.html'
})
export class PhotoDetailsComponent implements OnInit{

  photoId: number;
  photoComments: number;
  photo$: Observable<Photo>;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.photoId = params.photoId;
      this.photo$ = this.photoService.findById(this.photoId);

      this.photo$.subscribe(photo=>{
        this.photoComments = photo.comments
      }, err => {
        console.log(err);
        this.router.navigateByUrl('not-found')
      })
    })
  }

  removePhoto(){
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
        this.alertService.success('Photo deleted', true);
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
        this.alertService.warning('Could not delete the photo')
      })
  }

  like(photo: Photo){
    this.photoService.like(photo.id)
      .subscribe(liked => {
        this.photo$ = this.photoService.findById(photo.id);
      })
  }
}
