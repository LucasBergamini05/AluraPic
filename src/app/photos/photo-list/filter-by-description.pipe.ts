import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../photo/photo';

@Pipe({
  name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {

  transform(photos: Photo[], filterDescription: string): any {
    filterDescription = filterDescription.trim().toLowerCase();

    if(filterDescription)
      return photos.filter(photo => {
        return photo.description.toLowerCase().includes(filterDescription);
      });

    return photos;
  }
}
