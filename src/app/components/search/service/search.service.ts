import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { matriculaInterface } from 'src/app/util/matricula';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchClientListUrl : string = environment.baseUrl + 'Teste/NA/pesquisa/{nome}';
  private searchUrl : string = environment.baseUrl + 'Teste/NA/pesquisa/cliente/{cpf}';
  private searchEntityList : string = environment.baseUrl + 'Teste/NA/entidade/busca';
  private searchEntity : string = environment.baseUrl + 'Teste/NA/entidade/busca/cnpj/{cnpj}';
  private searchEntityByNameUrl : string = environment.baseUrl + 'Teste/NA/entidade/busca/nome/{nome}';
  private enrollListUrl : string = environment.baseUrl + 'Teste/NA/Carteira/lista/{idCliente}';
  private enrollUrl : string = environment.baseUrl + 'Teste/NA/Carteira/busca/{idCliente}/{idEnroll}';
  private searchStudentListUrl : string = environment.baseUrl + 'Teste/NA/filiado/aluno/busca';
  private searchTeacherListUrl : string = environment.baseUrl + 'Teste/NA/filiado/professor/busca';

  constructor(
    private http : HttpClient,
  ) { }

  getClientData(cpf : string) : Observable<clienteJudocaInterface> {
    let searchUrl = this.searchUrl.replace('{cpf}', cpf);
    return this.http.get<JSON>(searchUrl).pipe(
      map( ( responseJson : any ) => {
        let newClientJudoca : clienteJudocaInterface = {
          "nome" : responseJson.nome,
          "dataNasc" : responseJson.aniversario,
          "dataCadastro" : responseJson.dataCadastro,
          "cbj" : responseJson.registroCbj,
          "tel1" : responseJson.telefone1,
          "tel2" : responseJson.telefone2,
          "email" : responseJson.email,
          "cpf" : responseJson.cpf,
          "rg" : responseJson.rg,
          "org" : responseJson.orgaoExp,
          "ob" : (responseJson.observacao || responseJson.observacao == 'null')? responseJson.observacao : ' ',
          "id" : responseJson.id,
          "tipo" : responseJson.tipo,
        }

        return newClientJudoca;
      })
    )
  }

  getClientList(nome : string) : Observable<clienteJudocaInterface[]> {
    let searchClientListUrl = this.searchClientListUrl.replace('{nome}', nome);
    return this.http.get<JSON>(searchClientListUrl).pipe(
      map( (clientListJsonArray : any) => {
        let newClientListArray : clienteJudocaInterface[] = [];

        clientListJsonArray.forEach( clientJson => {
          let newClient : clienteJudocaInterface = {
            "nome" : clientJson.nome,
            "dataNasc" : clientJson.aniversario,
            "dataCadastro" : clientJson.dataCadastro,
            "cbj" : clientJson.registroCbj,
            "tel1" : clientJson.telefone1,
            "tel2" : clientJson.telefone2,
            "email" : clientJson.email,
            "cpf" : clientJson.cpf,
            "rg" : clientJson.rg,
            "org" : clientJson.orgaoExp,
            "ob" : (clientJson.observacao || clientJson.observacao == 'null')? clientJson.observacao : ' ',
            "id" : clientJson.id,
            "tipo" : clientJson.tipo,
          }

          newClientListArray.push(newClient);
        });

        return newClientListArray;
      })
    )
  }

  getEntityListByName(name : string) : Observable<entidadeInterface[]> {
    let searchEntityByNameUrl = this.searchEntityByNameUrl.replace('{nome}', name);
    return this.http.get<JSON>(searchEntityByNameUrl).pipe(
      map( (entityJsonArray : any) => {
        let newEntityArray : entidadeInterface[] = [];
        entityJsonArray.forEach( (entityJson : any) => {
          let newEntity : entidadeInterface = {
            "nome" : entityJson.nome,
            "id" : entityJson.id,
            "dataCadastro" : entityJson.dataCadastro,
            "cnpj" : entityJson.cnpj
          }

          newEntityArray.push(newEntity);
        });

        return newEntityArray;
      })
    )
  }

  getEntityList() : Observable<entidadeInterface[]> {
    return this.http.get<JSON>(this.searchEntityList).pipe(
      map( (entityJsonArray : any) => {
        let newEntityArray : entidadeInterface[] = [];
        entityJsonArray.forEach( (entityJson : any) => {
          let newEntity : entidadeInterface = {
            "nome" : entityJson.nome,
            "id" : entityJson.id,
            "dataCadastro" : entityJson.dataCadastro,
            "cnpj" : entityJson.cnpj
          }

          newEntityArray.push(newEntity);
        });

        return newEntityArray;
      })
    )
  }

  getEnrollList(idCliente : string) : Observable<matriculaInterface[]> {
    let enrollListUrl = this.enrollListUrl.replace('{idCliente}', idCliente);
    return this.http.get<JSON>(enrollListUrl).pipe(
      map( (enrollJSONArray : any) => {
        let newEnrollArray : matriculaInterface[] = [];

        enrollJSONArray.forEach( enrollJSON => {
          let newEnroll : matriculaInterface = {
            "data_final" : enrollJSON.datA_FINAL,
            "data_inicio" : enrollJSON.datA_INICIO,
            "empresa" : enrollJSON.empresa,
            "id" : enrollJSON.id,
            "id_entidade" : enrollJSON.iD_ENTIDADE,
            "id_filiado" : enrollJSON.iD_FILIADO,
            "nome" : enrollJSON.nome,
          }

          newEnrollArray.push(newEnroll);
        });

        return newEnrollArray;
      })
    )
  }

  getEnroll(idEnroll : string, idCliente : string) : Observable<matriculaInterface> {
    let enrollUrl = this.enrollUrl.replace('{idEnroll}', idEnroll).replace('{idCliente}', idCliente);
    return this.http.get<JSON>(enrollUrl).pipe(
      map( (enrollJSON : any) => {
        let newEnroll : matriculaInterface = {
          "data_final" : enrollJSON.datA_FINAL,
          "data_inicio" : enrollJSON.datA_INICIO,
          "empresa" : enrollJSON.empresa,
          "id" : enrollJSON.id,
          "id_entidade" : enrollJSON.iD_ENTIDADE,
          "id_filiado" : enrollJSON.iD_FILIADO,
          "nome" : enrollJSON.nome,
        }

        return newEnroll;
      })
    )
  }

  getTeacherList() : Observable<clienteJudocaInterface[]> {
    return this.http.get<JSON>(this.searchTeacherListUrl).pipe(
      map( (teacherListJsonArray : any) => {
        let newTeacherListArray : clienteJudocaInterface[] = [];

        teacherListJsonArray.forEach( teacherJson => {
          let newTeacher : clienteJudocaInterface = {
            "nome" : teacherJson.nome,
            "dataNasc" : teacherJson.aniversario,
            "dataCadastro" : teacherJson.dataCadastro,
            "cbj" : teacherJson.registroCbj,
            "tel1" : teacherJson.telefone1,
            "tel2" : teacherJson.telefone2,
            "email" : teacherJson.email,
            "cpf" : teacherJson.cpf,
            "rg" : teacherJson.rg,
            "org" : teacherJson.orgaoExp,
            "ob" : (teacherJson.observacao || teacherJson.observacao == 'null')? teacherJson.observacao : ' ',
            "id" : teacherJson.id,
            "tipo" : teacherJson.tipo,
          }

          newTeacherListArray.push(newTeacher);
        });

        return newTeacherListArray;
      })
    )
  }

  getStudentList() : Observable<clienteJudocaInterface[]> {
    return this.http.get<JSON>(this.searchStudentListUrl).pipe(
      map( (studentListJsonArray : any) => {
        let newStudentListArray : clienteJudocaInterface[] = [];

        studentListJsonArray.forEach( studentJson => {
          let newStudent : clienteJudocaInterface = {
            "nome" : studentJson.nome,
            "dataNasc" : studentJson.aniversario,
            "dataCadastro" : studentJson.dataCadastro,
            "cbj" : studentJson.registroCbj,
            "tel1" : studentJson.telefone1,
            "tel2" : studentJson.telefone2,
            "email" : studentJson.email,
            "cpf" : studentJson.cpf,
            "rg" : studentJson.rg,
            "org" : studentJson.orgaoExp,
            "ob" : (studentJson.observacao || studentJson.observacao == 'null')? studentJson.observacao : ' ',
            "id" : studentJson.id,
            "tipo" : studentJson.tipo,
          }

          newStudentListArray.push(newStudent);
        });

        return newStudentListArray;
      })
    )
  }

  getEntity(cnpj : string) : Observable<entidadeInterface> {
    let searchEntity = this.searchEntity.replace('{cnpj}',cnpj);

    return this.http.get<JSON>(searchEntity).pipe(
      map( (entityJson : any) => {
        let newEntity : entidadeInterface = {
          "nome" : entityJson.nome,
          "id" : entityJson.id,
          "dataCadastro" : entityJson.dataCadastro,
          "cnpj" : entityJson.cnpj
        }

        return newEntity
      })
    )
  }
}
