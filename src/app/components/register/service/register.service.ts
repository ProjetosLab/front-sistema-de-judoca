import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alunoInterface } from 'src/app/util/aluno';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerStudentUrl : string = environment.baseUrl + (environment.port ? ':' + environment.port : '') + '/api/Teste/NA/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';

  constructor(
    private http : HttpClient,
  ) { }

  registerStudent(newStudent : alunoInterface) : Observable<string> {
    let registerStudentUrl = this.registerStudentUrl
      .replace('{nome}', newStudent.nome)
      .replace('{dataNasc}', newStudent.dataNasc)
      .replace('{cbj}', newStudent.cbj)
      .replace('{tel1}', newStudent.tel1)
      .replace('{tel2}', newStudent.tel2)
      .replace('{email}', newStudent.email)
      .replace('{cpf}', newStudent.cpf)
      .replace('{rg}', newStudent.rg)
      .replace('{org}', newStudent.org);
    newStudent.ob ? registerStudentUrl.replace('{ob?}', newStudent.ob) : registerStudentUrl.replace('/{ob?}', '');

    return this.http.get<string>(registerStudentUrl);
  }
}
