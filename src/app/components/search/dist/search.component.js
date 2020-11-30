"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var core_1 = require("@angular/core");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(ActivatedRoute, SearchService, Router) {
        this.ActivatedRoute = ActivatedRoute;
        this.SearchService = SearchService;
        this.Router = Router;
        this.message = "Buscando...";
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.resetSearch();
    };
    SearchComponent.prototype.redirectTo = function (to) {
        this.Router.navigateByUrl(to);
    };
    SearchComponent.prototype.getCustomer = function (cpf) {
        var _this = this;
        this.SearchService.getClientData(cpf).subscribe(function (res) {
            _this.clearLists();
            _this.customer = res;
            _this.message = "Informações referente ao usuário " + res.nome;
            _this.SearchService.getEnrollList(res.id).subscribe(function (res) {
                _this.enrollList = res;
            });
        }, function () {
            _this.clearLists();
            _this.message = "Houve um erro ao retornar as informações deste usuário, por favor contate os desenvolvedores responsáveis";
        });
    };
    SearchComponent.prototype.getEntity = function (cnpj) {
        var _this = this;
        this.SearchService.getEntity(cnpj).subscribe(function (res) {
            _this.clearLists();
            _this.entity = res;
            _this.message = "Informações referente a entidade " + res.nome;
        });
    };
    SearchComponent.prototype.clearLists = function () {
        this.customerList = null;
        this.customer = null;
        this.teacherList = null;
        this.studentList = null;
        this.enrollList = null;
        this.entityList = null;
        this.entity = null;
    };
    SearchComponent.prototype.resetSearch = function () {
        var _this = this;
        this.clearLists();
        this.ActivatedRoute.params.subscribe(function (params) {
            if (params.nome != 'entities' && params.nome != 'student' && params.nome != 'teacher') {
                var hasCustomerList_1 = false;
                var hasEntityList_1 = false;
                _this.SearchService.getClientList(params.nome).subscribe(function (res) {
                    _this.customerList = res;
                    hasCustomerList_1 = true;
                }, function () { }, function () {
                    _this.SearchService.getEntityListByName(params.nome).subscribe(function (res) {
                        _this.entityList = res;
                        hasEntityList_1 = true;
                    }, function () { }, function () {
                        if (hasCustomerList_1 && hasEntityList_1)
                            _this.message = "Foram encontrados " + _this.customerList.length + " clientes e " + _this.entityList.length + " entidades com nome semelhante a " + params.nome;
                        else if (hasCustomerList_1)
                            _this.message = "Foram encontrados " + _this.customerList.length + " clientes com nome semelhante a " + params.nome;
                        else if (hasEntityList_1)
                            _this.message = "Foram encontrados " + _this.entityList.length + " entidades com nome semelhante a " + params.nome;
                        else
                            _this.message = "Não foi encontrado nenhum resultado com nome semelhante a " + params.nome;
                    });
                });
            }
            else if (params.nome == 'entities') {
                _this.SearchService.getEntityList().subscribe(function (res) {
                    _this.entityList = res;
                    _this.message = "Existem " + _this.entityList.length + " entidades cadastradas";
                });
            }
            else if (params.nome == 'student') {
                _this.SearchService.getStudentList().subscribe(function (res) {
                    _this.studentList = res;
                    _this.message = "Existem " + _this.studentList.length + " alunos cadastrados";
                });
            }
            else {
                _this.SearchService.getTeacherList().subscribe(function (res) {
                    _this.teacherList = res;
                    _this.message = "Existem " + _this.teacherList.length + " professores cadastrados";
                });
            }
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
