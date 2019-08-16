import { Key } from 'selenium-webdriver';

export class User {
    constructor(public email: string, public name: string,
                private password: string) {}

    matches(another: User): boolean {
        return another !== undefined && another.email === this.email 
            && another.password === this.password
    }
}

export const users: {[key: string]: User} = {
    "netososilva@gmail.com": new User('netososilva@gmail.com', 'Neto', '123'),
    "camillam.s@gmail.com": new User('camillam.s@gmail.com', 'Camilla', '123')
}