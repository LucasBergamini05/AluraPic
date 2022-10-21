import { switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoComments } from '../../photo/photo-comments';
import { PhotoService } from '../../photo/photo.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './photo-comments.component.html',
  styleUrls: [ 'photo-comments.component.css' ],
  selector: 'ap-photo-comments'
})
export class PhotoCommentsComponent implements OnInit{

  @Input() photoId: number;
  comments$: Observable<PhotoComments[]>;
  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formbuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);

    this.commentForm = this.formbuilder.group({
      comment: ['', [Validators.maxLength(300), Validators.required]]
    });
  }

  save() {
    const commentText = this.commentForm.get('comment').value;
    this.comments$ = this.photoService
      .addComments(this.photoId, commentText)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {
        this.commentForm.reset();
        alert('Comentário adicionado com sucesso');
      }))
  }
}
