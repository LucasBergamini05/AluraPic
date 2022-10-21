import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

import { Photo } from './photo';
import { PhotoComments } from './photo-comments';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PhotoService {
  constructor(private http: HttpClient){}

  listFromUserPaginated(user: string, page: number){
    const params = new HttpParams().append('page', page.toString());

    return this.http
      .get<Photo[]>(`${API}/${user}/photos`, {params});
  }

  upload(description: string, allowComments: boolean, file: File){
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number){
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number){
    return this.http.get<PhotoComments[]>(API + '/photos/' + photoId + '/comments')
  }

  addComments(photoId: number, commentText: string){
    return this.http.post(API + '/photos/' + photoId + '/comments', {commentText})
  }

  removePhoto(photoId: number){
    return this.http.delete(API + '/photos/' + photoId);
  }

  like(photoId: number){
    return this.http.post(
      API + '/photos/' + photoId + '/like', {}, {observe: 'response'}
    )
    .pipe(map(res => true))
    .pipe(catchError(err => {
      return err.status == '304' ? of(false) : throwError(err);
    }));
  }
}
