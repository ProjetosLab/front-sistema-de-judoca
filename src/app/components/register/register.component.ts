import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { alunoInterface } from 'src/app/util/aluno';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerType : number = 0; //0 = Não definido, 1 = Aluno, 2 = Professor
  newStudent : alunoInterface = {
    "cbj" : "",
    "cpf" : "",
    "dataNasc" : "",
    "email" : "",
    "nome" : "",
    "ob" : "",
    "org" : "",
    "rg" : "",
    "tel1" : "",
    "tel2" : "",
  };

  areInputValid : number;
  message : string = "";

  constructor(
    private registerService : RegisterService,
  ) { }

  ngOnInit(): void {
  }

  registerStudent() : void {
    this.areInputValid = 0;

    let dateRegex = new RegExp('^[0-9]{4}/[0-9]{2}/[0-9]{2}$');
    let emailRegex = new RegExp('^[a-zA-Z0-9\\-_!#$%&\\(\\).\\?]+@[a-zA-Z0-9]{2,26}(\\.|[a-zA-Z]{2,26}){1,7}$');
    let phoneNumberRegex = new RegExp('^(\\+?\\d{2,3})?(\\d{2,3}|\\(\\d{2,3}\\))?\\d?\\d{4}-?\\d{4}$');

    if ( !this.newStudent.nome ) this.toggleClass('nome', 'mistake', true); else { this.toggleClass('nome', 'mistake', false); this.areInputValid++ };
    if ( !this.newStudent.cbj ) this.toggleClass('cbj', 'mistake', true); else { this.toggleClass('cbj', 'mistake', false); this.areInputValid++ };
    if( !this.newStudent.cpf ) this.toggleClass('cpf', 'mistake', true); else { this.toggleClass('cpf', 'mistake', false); this.areInputValid++ };
    if( !this.newStudent.rg ) this.toggleClass('rg', 'mistake', true); else { this.toggleClass('rg', 'mistake', false); this.areInputValid++ };
    if( !this.newStudent.org ) this.toggleClass('org', 'mistake', true); else { this.toggleClass('org', 'mistake', false); this.areInputValid++ };
    if( (!this.newStudent.dataNasc || !dateRegex.test( this.newStudent.dataNasc )) ) this.toggleClass('dataNasc', 'mistake', true); else { this.newStudent.dataNasc = this.newStudent.dataNasc.replace('/','-').replace('/','-'); this.toggleClass('dataNasc', 'mistake', false); this.areInputValid++ };
    if( (!this.newStudent.tel1 || !phoneNumberRegex.test( this.newStudent.tel1 )) ) this.toggleClass('tel1', 'mistake', true); else { this.toggleClass('dataNasc', 'mistake', false); this.areInputValid++ }; 
    if( (!this.newStudent.tel2 || !phoneNumberRegex.test( this.newStudent.tel2 )) ) this.toggleClass('tel2', 'mistake', true); else { this.toggleClass('dataNasc', 'mistake', false); this.areInputValid++ };
    if( (!this.newStudent.email || !emailRegex.test( this.newStudent.email )) ) this.toggleClass('email', 'mistake', true); else { this.toggleClass('dataNasc', 'mistake', false); this.areInputValid++ };
    
    this.registerService.registerStudent(this.newStudent).subscribe( () => {
      this.registerType = 0;
      this.message = "Aluno cadastrado";
      setTimeout(() => {
        this.message = "";
      }, 10000);
    },
    () => {
      this.registerType = 0;
      this.message = "Ocorreu um erro no cadastro do aluno";
      setTimeout(() => {
        this.message = "";
      }, 10000);
    })
  }

  toggleClass(id : string, className : string, toAdd : boolean) : void {
    if( toAdd ) document.getElementById(id).classList.add(className);
    else document.getElementById(id).classList.remove(className);
  }
}
