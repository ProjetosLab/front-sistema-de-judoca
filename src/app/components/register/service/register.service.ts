import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alunoInterface } from 'src/app/util/aluno';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private studentRegisterUrl : string = environment.baseUrl + 'Teste/NA/aluno/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';
  private teacherRegisterUrl : string = environment.baseUrl + 'Teste/NA/professor/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';

  constructor(
    private http : HttpClient,
  ) { }

  registerStudent(newStudent : alunoInterface) : Observable<string> {
    let studentRegisterUrl = this.studentRegisterUrl
      .replace('{nome}', newStudent.nome)
      .replace('{dataNasc}', newStudent.dataNasc)
      .replace('{cbj}', newStudent.cbj)
      .replace('{tel1}', newStudent.tel1)
      .replace('{tel2}', newStudent.tel2)
      .replace('{email}', newStudent.email)
      .replace('{cpf}', newStudent.cpf)
      .replace('{rg}', newStudent.rg)
      .replace('{org}', newStudent.org);
    newStudent.ob ? studentRegisterUrl.replace("{ob?}", newStudent.ob) : studentRegisterUrl.replace("/{ob?}", "");

    console.log(studentRegisterUrl);

    return this.http.get<string>(studentRegisterUrl);
  }

  registerTeacher(newStudent : alunoInterface) : Observable<string> {
    let teacherRegisterUrl = this.teacherRegisterUrl
      .replace('{nome}', newStudent.nome)
      .replace('{dataNasc}', newStudent.dataNasc)
      .replace('{cbj}', newStudent.cbj)
      .replace('{tel1}', newStudent.tel1)
      .replace('{tel2}', newStudent.tel2)
      .replace('{email}', newStudent.email)
      .replace('{cpf}', newStudent.cpf)
      .replace('{rg}', newStudent.rg)
      .replace('{org}', newStudent.org);
    newStudent.ob ? teacherRegisterUrl.replace("{ob?}", newStudent.ob) : teacherRegisterUrl.replace("/{ob?}", "");

    return this.http.get<string>(teacherRegisterUrl);
  }
}
