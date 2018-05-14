import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {  
    transform(status:string): any {
        let response;
        switch(status){
            case 'ACTIVE' : response = 'ACTIVO'; break;
            case 'INACTIVE' : response = 'RETIRADO'; break;
            case 'DELETED' : response = 'ELIMINADO'; break;
        }
        return response;
    }
}