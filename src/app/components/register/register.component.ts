import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { SearchService } from '../search/service/search.service';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, AfterViewInit {

  faSearch = faSearch;

  registerType : number = 0; //0 = Não definido, 1 = Aluno, 2 = Professor, 3 = update, 4 = entidade
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
    "tipo" : "",
  };

  newEntity : entidadeInterface = {
    "nome" : "",
    "cnpj" : "",
    "id" : "",
    "dataCadastro" : "",
  }

  constructor(
    private searchService : SearchService,
    private registerService : RegisterService,
    private Router : Router,
    private ActivatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.Router.url.slice(1,7) == 'update') {
      this.ActivatedRoute.params.subscribe( params => {
        if( params && params.cpf ) {
          this.registerType = 3;
          this.message = "Carregando dados do usuário";
          this.newClient = {
            "cbj" : "...",
            "cpf" : "...",
            "dataNasc" : "...",
            "email" : "...",
            "nome" : "...",
            "ob" : "...",
            "org" : "...",
            "rg" : "...",
            "tel1" : "...",
            "tel2" : "...",
            "tipo" : "...",
          };
          this.searchService.getClientData(params.cpf).subscribe( clientData => {
            this.message = '';
            this.newClient = clientData;
            this.newClient.dataNasc = this.newClient.dataNasc.slice(0,10)
          })
        }
      })
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('registerBody').style.height = window.innerHeight - 71 + 'px';
  }

  registerClient() : void {
    if( this.areInputsValid() ) {
      this.newClient.cpf = this.newClient.cpf.replace(/./g,'').replace(/-/g,'');
      this.registerService.registerClient(this.newClient, this.registerType).subscribe( (responseJSON : any) => {
        if( responseJSON.id == -1 ) this.message = "CPF já cadastrado";
        else this.message = "Cliente cadastrado com sucesso! ID de cadastro: " + responseJSON.id;    
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
          "tipo" : "",
        };

        setTimeout(() => {
          this.message = "Insira aqui imagem/título irado";
        }, 10000);
      })
    }
  }

  updateClient() : void {
    if( this.areInputsValid() ) {

      this.newClient.cpf = this.newClient.cpf.replace(/./g,'').replace(/-/g,'');
      this.registerService.updateClient(this.newClient).subscribe( (responseJson : any) => {
        this.message = "Perfil atualizado com sucesso!";
      },
      () => {
        this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
      },
      () => {
        scroll({
          top: 0,
          behavior: "smooth"
        });
      })
    }
  }

  registerEntity() : void {
    if( this.areInputsValid() ) {

      this.newClient.cpf = this.newClient.cpf.replace(/./g,'').replace(/-/g,'').replace(/\//g,'');
      this.registerService.registerEntity(this.newEntity).subscribe( (responseJSON : any) => {
        if( responseJSON.id == -1 ) this.message = "CNPJ já cadastrado";
        else this.message = "Entidade cadastrada com sucesso! Id do cadastro: " + responseJSON.id;  
      },
      () => {
        this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
      },
      () => {
        this.registerType = 0;
        
        this.newEntity = {
          "nome" : "",
          "cnpj" : "",
          "id" : "",
          "dataCadastro" : ""
        }

        setTimeout(() => {
          this.message = "Insira aqui imagem/título irado";
        }, 10000);
      })
    }
  }

  areInputsValid() : boolean {
    Array.from(document.getElementsByClassName('inputForm')).forEach( htmlElement => {
      htmlElement.classList.remove('invalid');
    });

    let passRegexCounter = 0;

    if(this.registerType == 1 || this.registerType == 2 || this.registerType == 3) {
      let phoneRegex = RegExp('^(\\([0-9]{2}\\))?[0-9]{4,5}-?[0-9]{4}$');
      let emailRegex = RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$');
      let cpfRegex = RegExp('^[0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}-?[0-9]{2}$');

      if( (<HTMLInputElement>document.getElementById('form-nome')).value ) passRegexCounter++; else document.getElementById('form-nome').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-dataNasc')).value ) passRegexCounter++; else document.getElementById('form-dataNasc').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-cbj')).value ) passRegexCounter++; else document.getElementById('form-cbj').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-rg')).value ) passRegexCounter++; else document.getElementById('form-rg').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-org')).value ) passRegexCounter++; else document.getElementById('form-org').classList.add('invalid');

      if(phoneRegex.test( (<HTMLInputElement>document.getElementById('form-tel1')).value ) ) passRegexCounter++; else document.getElementById('form-tel1').classList.add('invalid');
      if(phoneRegex.test( (<HTMLInputElement>document.getElementById('form-tel2')).value ) ) passRegexCounter++; else document.getElementById('form-tel2').classList.add('invalid');
      if(emailRegex.test( (<HTMLInputElement>document.getElementById('form-email')).value ) ) passRegexCounter++; else document.getElementById('form-email').classList.add('invalid');
      if(cpfRegex.test( (<HTMLInputElement>document.getElementById('form-cpf')).value ) ) passRegexCounter++; else document.getElementById('form-cpf').classList.add('invalid');

      return passRegexCounter == 10;
    }
    
    if(this.registerType == 4) {
      let cnpjRegex = RegExp('^[0-9]{2}\\.?[0-9]{3}\\.?[0-9]{3}\\/?[0-9]{4}-?[0-9]{2}$');

      if( (<HTMLInputElement>document.getElementById('form-entity-nome')).value ) passRegexCounter++; else document.getElementById('form-entity-nome').classList.add('invalid');
      if(cnpjRegex.test( (<HTMLInputElement>document.getElementById('form-entity-cnpj')).value ) ) passRegexCounter++; else document.getElementById('form-entity-cnpj').classList.add('invalid');
      
      return passRegexCounter == 2;
    }
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }
}
