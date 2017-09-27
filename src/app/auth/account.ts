export interface Permission {
    customer: boolean;
}

export class Account {
    email       : string;
    photoURL    : string;
    displayName : string;
    permissions : Permission;

    constructor(authData) {
        this.email          = authData.email
        this.photoURL       = authData.photoURL
        this.displayName    = authData.displayName
        this.permissions    = { customer: true }
    }

}
