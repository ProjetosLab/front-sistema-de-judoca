"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var RegisterService = /** @class */ (function () {
    function RegisterService(http) {
        this.http = http;
        this.clientRegisterUrl = environment_1.environment.baseUrl + 'Teste/NA/{registerType}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';
        this.clientUpdateUrl = environment_1.environment.baseUrl + 'Teste/NA/atualizar/{id}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}/{tipo}';
        this.entityRegisterUrl = environment_1.environment.baseUrl + 'Teste/NA/entidade/{nome}/{cnpj}';
        this.entityUpdateUrl = environment_1.environment.baseUrl + 'Teste/NA/entidade/atualizar/{id}/{nome}/{data}/{cnpj}';
        this.enrollClientUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/{idCliente}/{idEntidade}/{mes}';
        this.renewEnrollUrl = environment_1.environment.baseUrl + 'Teste/NA/Carteira/Renova/{idCliente}/{mes}';
    }
    RegisterService.prototype.registerClient = function (newClient, registerType) {
        var clientRegisterUrl = this.clientRegisterUrl
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
        if (registerType == 1)
            clientRegisterUrl = clientRegisterUrl.replace('{registerType}', 'aluno');
        else if (registerType == 2)
            clientRegisterUrl = clientRegisterUrl.replace('{registerType}', 'professor');
        return this.http.get(clientRegisterUrl);
    };
    RegisterService.prototype.updateClient = function (client) {
        var clientUpdateUrl = this.clientUpdateUrl
            .replace('{id}', client.id)
            .replace('{nome}', client.nome)
            .replace('{dataNasc}', client.dataNasc)
            .replace('{cbj}', client.cbj)
            .replace('{tel1}', client.tel1)
            .replace('{tel2}', client.tel2)
            .replace('{email}', client.email)
            .replace('{cpf}', client.cpf)
            .replace('{rg}', client.rg)
            .replace('{org}', client.org)
            .replace('{tipo}', client.tipo);
        client.ob ? clientUpdateUrl = clientUpdateUrl.replace("{ob?}", client.ob) : clientUpdateUrl = clientUpdateUrl.replace("{ob?}", "null");
        return this.http.get(clientUpdateUrl);
    };
    RegisterService.prototype.registerEntity = function (newEntity) {
        var entityRegisterUrl = this.entityRegisterUrl
            .replace('{nome}', newEntity.nome)
            .replace('{cnpj}', newEntity.cnpj);
        return this.http.get(entityRegisterUrl);
    };
    RegisterService.prototype.enrollClient = function (idClient, idEntity, months) {
        var enrollClientUrl = this.enrollClientUrl.replace('{idCliente}', idClient).replace('{idEntidade}', idEntity).replace('{mes}', months);
        return this.http.get(enrollClientUrl);
    };
    RegisterService.prototype.renewEnroll = function (idEnroll, months) {
        var renewEnrollUrl = this.renewEnrollUrl.replace('{idCliente}', idEnroll).replace('{mes}', months);
        return this.http.get(renewEnrollUrl);
    };
    RegisterService.prototype.updateEntity = function (entity) {
        var entityUpdateUrl = this.entityUpdateUrl
            .replace('{id}', entity.id)
            .replace('{data}', entity.dataCadastro)
            .replace('{cnpj}', entity.cnpj)
            .replace('{nome}', entity.nome);
        return this.http.get(entityUpdateUrl);
    };
    RegisterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RegisterService);
    return RegisterService;
}());
exports.RegisterService = RegisterService;
