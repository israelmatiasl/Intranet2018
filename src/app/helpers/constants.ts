export const API_URL:string = 'http://localhost:3300/api';

export const searchUser:any = [
    { id: 'username', text: 'Código' },
    { id: 'document', text: 'Documento' },
    { id: 'psurname', text: 'Apellido' }
    //{ id: 'grade', text: 'Grado' }
];

export const statusUser:any = [
    { id: 'ACTIVE', text: 'ACTIVOS' },
    { id: 'INACTIVE', text: 'INACTIVOS' },
    { id: 'DELETED', text: 'ELIMINADOS' },
];

export const filterRoom:any = [
    {id: 'code', text: 'CODIGO'},
    {id: 'name', text:'NOMBRE'}
];

export const studieGrades:any = [
    'BACHILLER',
    'UNIVERSITARIO',
    'LICENCIADO',
    'DOCTORADO',
    'OTRO'
];

export class Build {
    public static buildSearchUser() {
        return searchUser;
    }

    public static buildStatusUser() {
        return statusUser;
    }

    public static buildFilterRoom() {
        return filterRoom;
    }

    public static buildStudieGrades() {
        return studieGrades;
    }
}