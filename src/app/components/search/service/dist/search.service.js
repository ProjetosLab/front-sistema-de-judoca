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
        this.searchUrl = environment_1.environment.baseUrl + 'Teste/NA/pesquisa/{cpf}';
        this.searchEntityList = environment_1.environment.baseUrl + 'Teste/NA/entidade/busca';
        this.enrollListUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/lista/{idCliente}';
        this.enrollUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/busca/{idCliente}/{idEnroll}';
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
                "ob": responseJson.observacao,
                "id": responseJson.id,
                "tipo": responseJson.tipo
            };
            return newClientJudoca;
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
    SearchService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
