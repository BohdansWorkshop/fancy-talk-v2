import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    userName: string;
    constructor(private authService: AuthService, private router: Router) { }
    ngOnInit(): void {
        if (localStorage.getItem('nickname')) {
            this.router.navigate(['/chat']);
        }
    }

    signIn() {
        this.authService.signIn(this.userName)
            .subscribe(
                (nickname: any) => {
                    localStorage.setItem('nickname', nickname);
                    this.router.navigate(['/chat']);
                },
                (err: any) => {
                    console.log(err)
                }
            );
    }
}