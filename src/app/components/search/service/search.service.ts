import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  private searchUrl : string = environment.baseUrl + 'Teste/NA/pesquisa/{cpf}';
  private searchEntityList : string = environment.baseUrl + 'Teste/NA/entidade/busca';
  private enrollListUrl : string = environment.baseUrl + 'Teste/NA/Carteira/lista/{idCliente}';
  private enrollUrl : string = environment.baseUrl + 'Teste/NA/Carteira/busca/{idCliente}/{idEnroll}';

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
          "ob" : responseJson.observacao,
          "id" : responseJson.id,
          "tipo" : responseJson.tipo,
        }

        return newClientJudoca;
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
}
