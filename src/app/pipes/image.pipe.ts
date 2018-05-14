import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'image'
  })
  export class ImagePipe implements PipeTransform {
  
    transform(image:string, gender:string, role:string): any {
        let path;
        if (isNullOrUndefined(image)) {
            let name;
            if (role == 'USER_STUDENT'){
                if (gender == 'M') { name = 'boy.png' } 
                else { name = 'girl.png' }
            }
            else {
                if (gender == 'M') { name = 'man.png' } 
                else { name = 'woman.png' }
            }
            path = `assets/images/users/${name}`;
        }
        else {
            path = image;
        }
        
        return path;
    }
  }
  