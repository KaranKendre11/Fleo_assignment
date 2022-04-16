export class GitModel{
    
    name : string;
    full_name:string;
    description:string;
    owner_login:string;
    stargazers_count:number;
    forks_count:number;
    language:string;

    constructor(){
        this.name = '';
        this.full_name = '';
        this.description = '';
        this.owner_login = '';
        this.stargazers_count = 0;
        this.forks_count = 0;
        this.language = '';
    }
}