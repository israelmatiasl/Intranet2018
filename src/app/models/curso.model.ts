export class Course {
  constructor(
    public grade:string,
    public grade_year:string,
    public category:string,
    public name:string,
    public code?:string,
    public school?:string,
    public _id?:string
  ){ }
}
