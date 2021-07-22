import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInformationDTO } from 'src/app/models/dtos/AuthInformationDTO';
import { AuthGuardService } from 'src/app/services/AuthGuard.service';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  @ViewChild(NgForm) formLogin!: NgForm;

  public email!: string;
  public password!: string;

  ngOnInit(): void {
  }

  Entrar_Click(): void {

    this.authService.Login(this.email, this.password).subscribe({
      next: (authInformationDTO: AuthInformationDTO) => {
        AuthGuardService.token = authInformationDTO.token;
        AuthGuardService.tokenExpirationDate = authInformationDTO.expirationDate;

        this.router.navigate(['home']);
      }
    });
  }

}
