
declare module 'moment' {
    function moment(p_date?:Date|string,p_format?:string):{
        format(p_format:string):string
        ,isValid():boolean
    };
    export = moment;
}
