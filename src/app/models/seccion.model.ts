import { Tutor } from "./usuario.model";

export class Section {
    constructor(
      public type:string,
      public grade:string,
      public grade_year:string,
      public letter:string,
      public max:number,
      public current:number,
      public year:number,
      public tutor?:string,
      public code?:string,
      public school?:string,
      public _id?:string
    ) { }
}

export class _Section {
  constructor(
    public type:string,
    public grade:string,
    public grade_year:string,
    public letter:string,
    public max:number,
    public current:number,
    public year:number,
    public tutor?:Tutor,
    public code?:string,
    public school?:string,
    public _id?:string
  ) { }
}

export class Grade {
    constructor(
      public name:string,
      public _id?:string
    ) { }
}

export class Year {
    constructor(
      public grade:string,
      public name:string,
      public _id?:string
    ) { }
}
