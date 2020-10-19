import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { clienteJudocaInterface } from 'src/app/util/aluno';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  faSearch = faSearch;

  registerType : number = 0; //0 = Não definido, 1 = Aluno, 2 = Professor
  message : string = "Insira aqui imagem/título irado";

  searchText : string = "";
  newClient : clienteJudocaInterface = {
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

  constructor(
    private registerService : RegisterService,
    private Router : Router,
  ) { }

  ngOnInit(): void {
  }

  registerClient() : void {
    this.registerService.registerClient(this.newClient, this.registerType).subscribe( (responseJSON : any) => {
      if( responseJSON.id == -1 ) this.message = "CPF já cadastrado";
      else this.message = "Cliente cadastrado com sucesso!";    
    },
    () => {
      this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
    },
    () => {
      this.registerType = 0;
      
      this.newClient = {
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

      setTimeout(() => {
        this.message = "Insira aqui imagem/título irado";
      }, 10000);
    })
  }

  redirectTo() : void {
    this.Router.navigateByUrl('/search/'+this.searchText);
  }
}
