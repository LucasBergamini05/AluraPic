import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = []
  row: Photo[][] = []

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos)
      this.row = this.groupColumns();
  }

  private groupColumns(){
    const col: Photo[][] = []
    for (let i = 0; i < this.photos.length; i+=3) {
      col.push(this.photos.slice(i, i+3));
    }
    return col
  }
}
