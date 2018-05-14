export class Clase {
    constructor(
      public section:string,
      public room:string,
      public course:string,
      public teacher:string,  
      public user_create?:string,
      public date_create?:Date,
      public user_update?:string,
      public date_update?:Date,
      public _id?:string
    ) { }
}