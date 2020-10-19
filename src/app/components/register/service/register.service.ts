import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clienteJudocaInterface } from 'src/app/util/aluno';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private clientRegisterUrl : string = environment.baseUrl + 'Teste/NA/{registerType}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';

  constructor(
    private http : HttpClient,
  ) { }

  registerClient(newClient : clienteJudocaInterface, registerType : number) : Observable<JSON> {

    let clientRegisterUrl = this.clientRegisterUrl
      .replace('{nome}', newClient.nome)
      .replace('{dataNasc}', newClient.dataNasc)
      .replace('{cbj}', newClient.cbj)
      .replace('{tel1}', newClient.tel1)
      .replace('{tel2}', newClient.tel2)
      .replace('{email}', newClient.email)
      .replace('{cpf}', newClient.cpf)
      .replace('{rg}', newClient.rg)
      .replace('{org}', newClient.org);
      newClient.ob ? clientRegisterUrl = clientRegisterUrl.replace("{ob?}", newClient.ob) : clientRegisterUrl = clientRegisterUrl.replace("/{ob?}", "");
    
    if( registerType == 1 ) clientRegisterUrl = clientRegisterUrl.replace('{registerType}','aluno');
    else if( registerType == 2 ) clientRegisterUrl = clientRegisterUrl.replace('{registerType}','professor');

    return this.http.get<JSON>(clientRegisterUrl);
  }
}
