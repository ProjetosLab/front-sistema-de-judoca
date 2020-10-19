import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clienteJudocaInterface } from 'src/app/util/aluno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl : string = environment.baseUrl + 'Teste/NA/pesquisa/{cpf}';

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
        }

        return newClientJudoca;
      })
    )
  }
}
