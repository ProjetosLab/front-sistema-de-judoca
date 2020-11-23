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
        var _this = this;
        this.ActivatedRoute.params.subscribe(function (params) {
            if (params.cpf != 'entities') {
                _this.SearchService.getClientData(params.cpf).subscribe(function (res) {
                    if (res.id == '-1')
                        _this.message = "Nenhum cliente foi encontrado!";
                    else {
                        _this.customer = res;
                        _this.message = "Dados cadastrais do(a) " + _this.customer.nome;
                        _this.SearchService.getEnrollList(_this.customer.id).subscribe(function (enrollList) { return _this.enrollList = enrollList; });
                    }
                });
            }
            else {
                _this.SearchService.getEntityList().subscribe(function (res) {
                    _this.entityList = res;
                    _this.message = "Existem " + _this.entityList.length + " entidades cadastradas";
                });
            }
        });
    };
    SearchComponent.prototype.redirectTo = function (to) {
        this.Router.navigateByUrl(to);
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
