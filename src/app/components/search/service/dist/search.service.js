"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this.searchClientListUrl = environment_1.environment.baseUrl + 'Teste/NA/pesquisa/{nome}';
        this.searchUrl = environment_1.environment.baseUrl + 'Teste/NA/pesquisa/cliente/{cpf}';
        this.searchEntityList = environment_1.environment.baseUrl + 'Teste/NA/entidade/busca';
        this.searchEntity = environment_1.environment.baseUrl + 'Teste/NA/entidade/busca/cnpj/{cnpj}';
        this.searchEntityByNameUrl = environment_1.environment.baseUrl + 'Teste/NA/entidade/busca/nome/{nome}';
        this.enrollListUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/lista/{idCliente}';
        this.enrollUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/busca/{idCliente}/{idEnroll}';
        this.searchStudentListUrl = environment_1.environment.baseUrl + 'Teste/NA/filiado/aluno/busca';
        this.searchTeacherListUrl = environment_1.environment.baseUrl + 'Teste/NA/filiado/professor/busca';
    }
    SearchService.prototype.getClientData = function (cpf) {
        var searchUrl = this.searchUrl.replace('{cpf}', cpf);
        return this.http.get(searchUrl).pipe(operators_1.map(function (responseJson) {
            var newClientJudoca = {
                "nome": responseJson.nome,
                "dataNasc": responseJson.aniversario,
                "dataCadastro": responseJson.dataCadastro,
                "cbj": responseJson.registroCbj,
                "tel1": responseJson.telefone1,
                "tel2": responseJson.telefone2,
                "email": responseJson.email,
                "cpf": responseJson.cpf,
                "rg": responseJson.rg,
                "org": responseJson.orgaoExp,
                "ob": (responseJson.observacao || responseJson.observacao == 'null') ? responseJson.observacao : ' ',
                "id": responseJson.id,
                "tipo": responseJson.tipo
            };
            return newClientJudoca;
        }));
    };
    SearchService.prototype.getClientList = function (nome) {
        var searchClientListUrl = this.searchClientListUrl.replace('{nome}', nome);
        return this.http.get(searchClientListUrl).pipe(operators_1.map(function (clientListJsonArray) {
            var newClientListArray = [];
            clientListJsonArray.forEach(function (clientJson) {
                var newClient = {
                    "nome": clientJson.nome,
                    "dataNasc": clientJson.aniversario,
                    "dataCadastro": clientJson.dataCadastro,
                    "cbj": clientJson.registroCbj,
                    "tel1": clientJson.telefone1,
                    "tel2": clientJson.telefone2,
                    "email": clientJson.email,
                    "cpf": clientJson.cpf,
                    "rg": clientJson.rg,
                    "org": clientJson.orgaoExp,
                    "ob": (clientJson.observacao || clientJson.observacao == 'null') ? clientJson.observacao : ' ',
                    "id": clientJson.id,
                    "tipo": clientJson.tipo
                };
                newClientListArray.push(newClient);
            });
            return newClientListArray;
        }));
    };
    SearchService.prototype.getEntityListByName = function (name) {
        var searchEntityByNameUrl = this.searchEntityByNameUrl.replace('{nome}', name);
        return this.http.get(searchEntityByNameUrl).pipe(operators_1.map(function (entityJsonArray) {
            var newEntityArray = [];
            entityJsonArray.forEach(function (entityJson) {
                var newEntity = {
                    "nome": entityJson.nome,
                    "id": entityJson.id,
                    "dataCadastro": entityJson.dataCadastro,
                    "cnpj": entityJson.cnpj
                };
                newEntityArray.push(newEntity);
            });
            return newEntityArray;
        }));
    };
    SearchService.prototype.getEntityList = function () {
        return this.http.get(this.searchEntityList).pipe(operators_1.map(function (entityJsonArray) {
            var newEntityArray = [];
            entityJsonArray.forEach(function (entityJson) {
                var newEntity = {
                    "nome": entityJson.nome,
                    "id": entityJson.id,
                    "dataCadastro": entityJson.dataCadastro,
                    "cnpj": entityJson.cnpj
                };
                newEntityArray.push(newEntity);
            });
            return newEntityArray;
        }));
    };
    SearchService.prototype.getEnrollList = function (idCliente) {
        var enrollListUrl = this.enrollListUrl.replace('{idCliente}', idCliente);
        return this.http.get(enrollListUrl).pipe(operators_1.map(function (enrollJSONArray) {
            var newEnrollArray = [];
            enrollJSONArray.forEach(function (enrollJSON) {
                var newEnroll = {
                    "data_final": enrollJSON.datA_FINAL,
                    "data_inicio": enrollJSON.datA_INICIO,
                    "empresa": enrollJSON.empresa,
                    "id": enrollJSON.id,
                    "id_entidade": enrollJSON.iD_ENTIDADE,
                    "id_filiado": enrollJSON.iD_FILIADO,
                    "nome": enrollJSON.nome
                };
                newEnrollArray.push(newEnroll);
            });
            return newEnrollArray;
        }));
    };
    SearchService.prototype.getEnroll = function (idEnroll, idCliente) {
        var enrollUrl = this.enrollUrl.replace('{idEnroll}', idEnroll).replace('{idCliente}', idCliente);
        return this.http.get(enrollUrl).pipe(operators_1.map(function (enrollJSON) {
            var newEnroll = {
                "data_final": enrollJSON.datA_FINAL,
                "data_inicio": enrollJSON.datA_INICIO,
                "empresa": enrollJSON.empresa,
                "id": enrollJSON.id,
                "id_entidade": enrollJSON.iD_ENTIDADE,
                "id_filiado": enrollJSON.iD_FILIADO,
                "nome": enrollJSON.nome
            };
            return newEnroll;
        }));
    };
    SearchService.prototype.getTeacherList = function () {
        return this.http.get(this.searchTeacherListUrl).pipe(operators_1.map(function (teacherListJsonArray) {
            var newTeacherListArray = [];
            teacherListJsonArray.forEach(function (teacherJson) {
                var newTeacher = {
                    "nome": teacherJson.nome,
                    "dataNasc": teacherJson.aniversario,
                    "dataCadastro": teacherJson.dataCadastro,
                    "cbj": teacherJson.registroCbj,
                    "tel1": teacherJson.telefone1,
                    "tel2": teacherJson.telefone2,
                    "email": teacherJson.email,
                    "cpf": teacherJson.cpf,
                    "rg": teacherJson.rg,
                    "org": teacherJson.orgaoExp,
                    "ob": (teacherJson.observacao || teacherJson.observacao == 'null') ? teacherJson.observacao : ' ',
                    "id": teacherJson.id,
                    "tipo": teacherJson.tipo
                };
                newTeacherListArray.push(newTeacher);
            });
            return newTeacherListArray;
        }));
    };
    SearchService.prototype.getStudentList = function () {
        return this.http.get(this.searchStudentListUrl).pipe(operators_1.map(function (studentListJsonArray) {
            var newStudentListArray = [];
            studentListJsonArray.forEach(function (studentJson) {
                var newStudent = {
                    "nome": studentJson.nome,
                    "dataNasc": studentJson.aniversario,
                    "dataCadastro": studentJson.dataCadastro,
                    "cbj": studentJson.registroCbj,
                    "tel1": studentJson.telefone1,
                    "tel2": studentJson.telefone2,
                    "email": studentJson.email,
                    "cpf": studentJson.cpf,
                    "rg": studentJson.rg,
                    "org": studentJson.orgaoExp,
                    "ob": (studentJson.observacao || studentJson.observacao == 'null') ? studentJson.observacao : ' ',
                    "id": studentJson.id,
                    "tipo": studentJson.tipo
                };
                newStudentListArray.push(newStudent);
            });
            return newStudentListArray;
        }));
    };
    SearchService.prototype.getEntity = function (cnpj) {
        var searchEntity = this.searchEntity.replace('{cnpj}', cnpj);
        return this.http.get(searchEntity).pipe(operators_1.map(function (entityJson) {
            var newEntity = {
                "nome": entityJson.nome,
                "id": entityJson.id,
                "dataCadastro": entityJson.dataCadastro,
                "cnpj": entityJson.cnpj
            };
            return newEntity;
        }));
    };
    SearchService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
