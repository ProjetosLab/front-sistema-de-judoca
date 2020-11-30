import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { matriculaInterface } from 'src/app/util/matricula';
import { SearchService } from '../search/service/search.service';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, AfterViewInit {

  faSearch = faSearch;

  registerType : number = 0; //0 = Não definido, 1 = Aluno, 2 = Professor, 3 = update customer, 4 = entidade, 5 = matricula, 6 = atualizar matricula, 7 = update entity
  message : string = "Selecione uma opção";
  EntityList : entidadeInterface[] = [];

  searchText : string = "";
  newMatricula : matriculaInterface = {
    "data_final" : "",
    "data_inicio" : "",
    "empresa" : "",
    "id" : "",
    "id_entidade" : "",
    "id_filiado" : "",
    "nome" : "",
    "meses" : "",
  }
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
    this.searchService.getEntityList().subscribe( entityList => this.EntityList = entityList );

    if(this.Router.url.slice(1,14) == 'update/enroll') {
      this.ActivatedRoute.params.subscribe( params => {
        if( params && params.idEnroll ) {
          this.registerType = 6;
          this.message = "Carregando dados da matrícula";
          this.newMatricula = {
            "data_final" : "...",
            "data_inicio" : "...",
            "empresa" : "...",
            "id" : "...",
            "id_entidade" : "...",
            "id_filiado" : "...",
            "nome" : "...",
          }
        }
        
        this.searchService.getEnroll(params.idEnroll, params.idCliente).subscribe( enroll => this.newMatricula = enroll );
      })
    } else if(this.Router.url.slice(1,9) == 'update/1') {
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
    } else if(this.Router.url.slice(1,9) == 'update/2') {
      this.ActivatedRoute.params.subscribe( params => {
        if( params && params.cnpj ) {
          this.message = "Carregando dados da entidade";
          this.registerType = 7;
          this.newEntity = {
            "id" : "...",
            "nome" : "...",
            "dataCadastro" : "...",
            "cnpj" : "..."
          }
          this.searchService.getEntity(params.cnpj).subscribe( entityData => {
            this.message = '';
            this.newEntity = entityData;
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
          this.message = "Selecione uma opção";
        }, 10000);
      })
    }
  }

  updateClient() : void {
    if( this.areInputsValid() ) {

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

  updateEntity() : void {
    if( this.areInputsValid() ) {
      this.registerService.updateEntity(this.newEntity).subscribe( () => {
        this.message = "Entidade atualizada com sucesso!";
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

      this.registerService.registerEntity(this.newEntity).subscribe( (responseJSON : any) => {
        if( responseJSON.id == -1 ) this.message = "CNPJ já cadastrado";
        else this.message = "Entidade cadastrada com sucesso! Id do cadastro: " + responseJSON.id;
        this.searchService.getEntityList().subscribe( entityList => this.EntityList = entityList );
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
          this.message = "Selecione uma opção";
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
      let phoneRegex = RegExp('^[0-9]{8,9}$');
      let emailRegex = RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$');
      let cpfRegex = RegExp('^[0-9]{11}$');

      if( (<HTMLInputElement>document.getElementById('form-nome')).value ) passRegexCounter++; else document.getElementById('form-nome').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-dataNasc')).value ) passRegexCounter++; else document.getElementById('form-dataNasc').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-cbj')).value ) passRegexCounter++; else document.getElementById('form-cbj').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-rg')).value ) passRegexCounter++; else document.getElementById('form-rg').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-org')).value ) passRegexCounter++; else document.getElementById('form-org').classList.add('invalid');

      if(phoneRegex.test( (<HTMLInputElement>document.getElementById('form-tel1')).value ) ) passRegexCounter++; else document.getElementById('form-tel1').classList.add('invalid');
      if(phoneRegex.test( (<HTMLInputElement>document.getElementById('form-tel2')).value ) ) passRegexCounter++; else document.getElementById('form-tel2').classList.add('invalid');
      if(emailRegex.test( (<HTMLInputElement>document.getElementById('form-email')).value ) ) passRegexCounter++; else document.getElementById('form-email').classList.add('invalid');
      if(cpfRegex.test( (<HTMLInputElement>document.getElementById('form-cpf')).value ) ) passRegexCounter++; else document.getElementById('form-cpf').classList.add('invalid');

      return passRegexCounter == 9;
    }
    
    if(this.registerType == 4 || this.registerType == 7) {
      let cnpjRegex = RegExp('^[0-9]{12,16}$');

      if( (<HTMLInputElement>document.getElementById('form-entity-nome')).value ) passRegexCounter++; else document.getElementById('form-entity-nome').classList.add('invalid');
      if(cnpjRegex.test( (<HTMLInputElement>document.getElementById('form-entity-cnpj')).value ) ) passRegexCounter++; else document.getElementById('form-entity-cnpj').classList.add('invalid');
      
      return passRegexCounter == 2;
    }

    if(this.registerType == 5) {
      if( (<HTMLInputElement>document.getElementById('form-client-id')).value ) passRegexCounter++; else document.getElementById('form-client-id').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-client-month')).value ) passRegexCounter++; else document.getElementById('form-client-month').classList.add('invalid');
      if( (<HTMLInputElement>document.getElementById('form-entity-id')).value != '-1' ) passRegexCounter++; else document.getElementById('form-entity-id').classList.add('invalid');

      return passRegexCounter == 3;
    }
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }

  enrollClient() : void {
    if( this.areInputsValid() ) {
      this.registerService.enrollClient(this.newMatricula.id_filiado, this.newMatricula.id_entidade, this.newMatricula.meses).subscribe( (responseJSON : any) => {
        if( responseJSON ) this.message = "Cliente matriculado com sucesso!";
        else this.message = "Cliente já matriculado!";
      },
      () => {
        this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
      },
      () => {
        this.registerType = 0;
        
        this.newMatricula = {
          "data_final" : "",
          "data_inicio" : "",
          "empresa" : "",
          "id" : this.newMatricula.id,
          "id_entidade" : "",
          "id_filiado" : "",
          "nome" : "",
          "meses" : "",
        }

        setTimeout(() => {
          this.message = "Selecione uma opção";
        }, 10000);
      })
    }
  }

  renewClient() : void {
    this.registerService.renewEnroll(this.newMatricula.id, this.newMatricula.meses).subscribe( res => {
      this.message = "Expiração da matrícula atualizada com sucesso";
    },
    () => {
      this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
    },
    () => {
      this.registerType = 0;
      this.newMatricula = {
        "data_final" : "",
        "data_inicio" : "",
        "empresa" : "",
        "id" : this.newMatricula.id,
        "id_entidade" : "",
        "id_filiado" : "",
        "nome" : "",
        "meses" : "",
      }

      //this.redirectTo('register');
    })
  }

}
