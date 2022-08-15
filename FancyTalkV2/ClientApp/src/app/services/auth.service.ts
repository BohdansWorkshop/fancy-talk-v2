import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceConstants } from "./service.constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    signIn(userName: string) {
        return this.httpClient.post(
            ServiceConstants.AuthRoute,
            { userName },
            { responseType: 'text' }
        );
    }

    signOut() {
        return this.httpClient.get(ServiceConstants.SignoutRoute);
    }
}

