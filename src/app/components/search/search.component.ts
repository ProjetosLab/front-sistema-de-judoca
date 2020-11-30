import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { matriculaInterface } from 'src/app/util/matricula';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  message : string = "Buscando...";
  customer : clienteJudocaInterface;
  customerList : clienteJudocaInterface[];
  entity : entidadeInterface;
  entityList : entidadeInterface[];
  teacherList : clienteJudocaInterface[];
  studentList : clienteJudocaInterface[];
  enrollList : matriculaInterface[];

  constructor(
    private ActivatedRoute : ActivatedRoute,
    private SearchService : SearchService,
    private Router : Router,
  ) { }

  ngOnInit(): void {
    this.resetSearch();
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }

  getCustomer(cpf : string): void {
    this.SearchService.getClientData(cpf).subscribe( res => {
      this.clearLists();
      this.customer = res;
      this.message = "Informações referente ao usuário " + res.nome;
      this.SearchService.getEnrollList(res.id).subscribe( res => {
        this.enrollList = res;
      })
    },
    () => {
      this.clearLists();
      this.message = "Houve um erro ao retornar as informações deste usuário, por favor contate os desenvolvedores responsáveis";
    })
  }

  getEntity(cnpj : string): void {
    this.SearchService.getEntity(cnpj).subscribe( res => {
      this.clearLists();
      this.entity = res;
      this.message = "Informações referente a entidade " + res.nome;
    })
  }

  clearLists(): void {
    this.customerList = null;
    this.customer = null;
    this.teacherList = null;
    this.studentList = null;
    this.enrollList = null;
    this.entityList = null;
    this.entity = null;
  }

  resetSearch(): void {
    this.clearLists();
    this.ActivatedRoute.params.subscribe( (params : any) => {
      if( params.nome != 'entities' && params.nome != 'student' && params.nome != 'teacher' ) {
        let hasCustomerList = false;
        let hasEntityList = false;
        this.SearchService.getClientList(params.nome).subscribe( res => {
            this.customerList = res;
            hasCustomerList = true;
        },
        () => {},
        () => {
          this.SearchService.getEntityListByName(params.nome).subscribe( res => {
            this.entityList = res;
            hasEntityList = true;
          },
          () => {},
          () => {
            if(hasCustomerList && hasEntityList) this.message = "Foram encontrados " + this.customerList.length + " clientes e " + this.entityList.length + " entidades com nome semelhante a " + params.nome;
            else if(hasCustomerList) this.message = "Foram encontrados " + this.customerList.length + " clientes com nome semelhante a " + params.nome;
            else if(hasEntityList) this.message = "Foram encontrados " + this.entityList.length + " entidades com nome semelhante a " + params.nome;
            else this.message = "Não foi encontrado nenhum resultado com nome semelhante a " + params.nome;
          })
        })

      } else if(params.nome == 'entities') {
        this.SearchService.getEntityList().subscribe( res => {
          this.entityList = res; this.message = "Existem " + this.entityList.length + " entidades cadastradas";
        });
      } else if(params.nome == 'student') {
        this.SearchService.getStudentList().subscribe( res => {
          this.studentList = res; this.message = "Existem " + this.studentList.length + " alunos cadastrados";
        })
      } else {
        this.SearchService.getTeacherList().subscribe( res => {
          this.teacherList = res; this.message = "Existem " + this.teacherList.length + " professores cadastrados";
        })
      }
    });
  }

}
