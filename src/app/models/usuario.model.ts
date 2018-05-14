export class Admin {
    constructor(
      public role:string,
      public name:string,
      public psurname:string,
      public msurname:string,
      public document:string,
      public gender:string,
      public birthday:Date,
      public address:string,
      public email:string,
      public username:string,
      public password:string,
      public hire_date:Date,
      public phone?:string,
      public cell_phone?:string,
      public image?:string,
      public status?:string,
      public created_by?:string,
      public created_at?:Date,
      public updated_by?:string,
      public updated_at?:Date,
      public _id?:string
    ) { }
}

export class Teacher {
    constructor(
      public name:string,
      public psurname:string,
      public msurname:string,
      public document:string,
      public grade:string,
      public career:string,
      public gender:string,
      public birthday:Date,
      public address:string,
      public email:string,
      public hire_date:Date,
      public phone?:string,
      public cell_phone?:string,
      public image?:string,
      public username?:string,
      public password?:string,
      public role?:string,
      public school?:string,
      public status?:string,
      public created_by?:string,
      public created_at?:Date,
      public updated_by?:string,
      public updated_at?:Date,
      public _id?:string
    ) { }
}

export class Tutor {
    constructor(
      public name:string,
      public psurname:string,
      public msurname:string,
      public document:string,
      public grade:string,
      public career:string,
      public gender:string,
      public birthday:Date,
      public address:string,
      public email:string,
      public username:string,
      public password:string,
      public hire_date:Date,
      public telephone?:string,
      public cellphone?:string,
      public image?:string,
      public role?:string,
      public school?:string,
      public status?:string,
      public created_by?:string,
      public created_at?:Date,
      public updated_by?:string,
      public updated_at?:Date,
      public _id?:string
    ) { }
}

export class Student {
    constructor(
      public role:string,
      public name:string,
      public psurname:string,
      public msurname:string,
      public document:string,
      public gender:string,
      public birthday:Date,
      public address:string,
      public email:string,
      public username:string,
      public password:string,
      public name_parent:string,
      public last_name_p_parent:string,
      public last_name_m_parent:string,
      public email_parent?:string,
      public cellphone_parent?:string,
      public telephone?:string,
      public cellphone?:string,
      public image?:string,
      public status?:string,
      public created_by?:string,
      public created_at?:Date,
      public updated_by?:string,
      public updated_at?:Date,
      public _id?:string
    ) { }
}

export class User {
    constructor(
      public _id:string,
      public role:string,
      public name:string,
      public psurname:string,
      public msurname:string,
      public document:string,
      public gender:string,
      public birthday:Date,
      public email:string,
      public image?:string,
  ) { }
}

export class Account {
    constructor(
      public username:string,
      public password:string
    ) { }
}