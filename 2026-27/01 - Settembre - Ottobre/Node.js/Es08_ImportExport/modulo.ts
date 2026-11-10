export const PI:any = 3.14;
export let months:string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function SayHi(name:any):string{ 
    return ("Hello, " + name);
}

export class User{
    public title:string;
    public name:string;
    
    constructor(title:string, name:string){
        this.title = title;
        this.name = name;
    }

    public concat(){
        return this.title + " " + this.name;
    }
}