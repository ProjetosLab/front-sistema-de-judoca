"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(searchService, registerService, Router, ActivatedRoute) {
        this.searchService = searchService;
        this.registerService = registerService;
        this.Router = Router;
        this.ActivatedRoute = ActivatedRoute;
        this.faSearch = free_solid_svg_icons_1.faSearch;
        this.registerType = 0; //0 = Não definido, 1 = Aluno, 2 = Professor, 3 = update customer, 4 = entidade, 5 = matricula, 6 = atualizar matricula, 7 = update entity
        this.message = "Selecione uma opção";
        this.EntityList = [];
        this.searchText = "";
        this.newMatricula = {
            "data_final": "",
            "data_inicio": "",
            "empresa": "",
            "id": "",
            "id_entidade": "",
            "id_filiado": "",
            "nome": "",
            "meses": ""
        };
        this.newClient = {
            "cbj": "",
            "cpf": "",
            "dataNasc": "",
            "email": "",
            "nome": "",
            "ob": "",
            "org": "",
            "rg": "",
            "tel1": "",
            "tel2": "",
            "tipo": ""
        };
        this.newEntity = {
            "nome": "",
            "cnpj": "",
            "id": "",
            "dataCadastro": ""
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchService.getEntityList().subscribe(function (entityList) { return _this.EntityList = entityList; });
        if (this.Router.url.slice(1, 14) == 'update/enroll') {
            this.ActivatedRoute.params.subscribe(function (params) {
                if (params && params.idEnroll) {
                    _this.registerType = 6;
                    _this.message = "Carregando dados da matrícula";
                    _this.newMatricula = {
                        "data_final": "...",
                        "data_inicio": "...",
                        "empresa": "...",
                        "id": "...",
                        "id_entidade": "...",
                        "id_filiado": "...",
                        "nome": "..."
                    };
                }
                _this.searchService.getEnroll(params.idEnroll, params.idCliente).subscribe(function (enroll) { return _this.newMatricula = enroll; });
            });
        }
        else if (this.Router.url.slice(1, 9) == 'update/1') {
            this.ActivatedRoute.params.subscribe(function (params) {
                if (params && params.cpf) {
                    _this.registerType = 3;
                    _this.message = "Carregando dados do usuário";
                    _this.newClient = {
                        "cbj": "...",
                        "cpf": "...",
                        "dataNasc": "...",
                        "email": "...",
                        "nome": "...",
                        "ob": "...",
                        "org": "...",
                        "rg": "...",
                        "tel1": "...",
                        "tel2": "...",
                        "tipo": "..."
                    };
                    _this.searchService.getClientData(params.cpf).subscribe(function (clientData) {
                        _this.message = '';
                        _this.newClient = clientData;
                        _this.newClient.dataNasc = _this.newClient.dataNasc.slice(0, 10);
                    });
                }
            });
        }
        else if (this.Router.url.slice(1, 9) == 'update/2') {
            this.ActivatedRoute.params.subscribe(function (params) {
                if (params && params.cnpj) {
                    _this.message = "Carregando dados da entidade";
                    _this.registerType = 7;
                    _this.newEntity = {
                        "id": "...",
                        "nome": "...",
                        "dataCadastro": "...",
                        "cnpj": "..."
                    };
                    _this.searchService.getEntity(params.cnpj).subscribe(function (entityData) {
                        _this.message = '';
                        _this.newEntity = entityData;
                    });
                }
            });
        }
    };
    RegisterComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('registerBody').style.height = window.innerHeight - 71 + 'px';
    };
    RegisterComponent.prototype.registerClient = function () {
        var _this = this;
        if (this.areInputsValid()) {
            this.registerService.registerClient(this.newClient, this.registerType).subscribe(function (responseJSON) {
                if (responseJSON.id == -1)
                    _this.message = "CPF já cadastrado";
                else
                    _this.message = "Cliente cadastrado com sucesso! ID de cadastro: " + responseJSON.id;
            }, function () {
                _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
            }, function () {
                _this.registerType = 0;
                _this.newClient = {
                    "cbj": "",
                    "cpf": "",
                    "dataNasc": "",
                    "email": "",
                    "nome": "",
                    "ob": "",
                    "org": "",
                    "rg": "",
                    "tel1": "",
                    "tel2": "",
                    "tipo": ""
                };
                setTimeout(function () {
                    _this.message = "Selecione uma opção";
                }, 10000);
            });
        }
    };
    RegisterComponent.prototype.updateClient = function () {
        var _this = this;
        if (this.areInputsValid()) {
            this.registerService.updateClient(this.newClient).subscribe(function (responseJson) {
                _this.message = "Perfil atualizado com sucesso!";
            }, function () {
                _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
            }, function () {
                scroll({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    };
    RegisterComponent.prototype.updateEntity = function () {
        var _this = this;
        if (this.areInputsValid()) {
            this.registerService.updateEntity(this.newEntity).subscribe(function () {
                _this.message = "Entidade atualizada com sucesso!";
            }, function () {
                _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
            }, function () {
                scroll({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    };
    RegisterComponent.prototype.registerEntity = function () {
        var _this = this;
        if (this.areInputsValid()) {
            this.registerService.registerEntity(this.newEntity).subscribe(function (responseJSON) {
                if (responseJSON.id == -1)
                    _this.message = "CNPJ já cadastrado";
                else
                    _this.message = "Entidade cadastrada com sucesso! Id do cadastro: " + responseJSON.id;
                _this.searchService.getEntityList().subscribe(function (entityList) { return _this.EntityList = entityList; });
            }, function () {
                _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
            }, function () {
                _this.registerType = 0;
                _this.newEntity = {
                    "nome": "",
                    "cnpj": "",
                    "id": "",
                    "dataCadastro": ""
                };
                setTimeout(function () {
                    _this.message = "Selecione uma opção";
                }, 10000);
            });
        }
    };
    RegisterComponent.prototype.areInputsValid = function () {
        Array.from(document.getElementsByClassName('inputForm')).forEach(function (htmlElement) {
            htmlElement.classList.remove('invalid');
        });
        var passRegexCounter = 0;
        if (this.registerType == 1 || this.registerType == 2 || this.registerType == 3) {
            var phoneRegex = RegExp('^[0-9]{8,9}$');
            var emailRegex = RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$');
            var cpfRegex = RegExp('^[0-9]{11}$');
            if (document.getElementById('form-nome').value)
                passRegexCounter++;
            else
                document.getElementById('form-nome').classList.add('invalid');
            if (document.getElementById('form-dataNasc').value)
                passRegexCounter++;
            else
                document.getElementById('form-dataNasc').classList.add('invalid');
            if (document.getElementById('form-cbj').value)
                passRegexCounter++;
            else
                document.getElementById('form-cbj').classList.add('invalid');
            if (document.getElementById('form-rg').value)
                passRegexCounter++;
            else
                document.getElementById('form-rg').classList.add('invalid');
            if (document.getElementById('form-org').value)
                passRegexCounter++;
            else
                document.getElementById('form-org').classList.add('invalid');
            if (phoneRegex.test(document.getElementById('form-tel1').value))
                passRegexCounter++;
            else
                document.getElementById('form-tel1').classList.add('invalid');
            if (phoneRegex.test(document.getElementById('form-tel2').value))
                passRegexCounter++;
            else
                document.getElementById('form-tel2').classList.add('invalid');
            if (emailRegex.test(document.getElementById('form-email').value))
                passRegexCounter++;
            else
                document.getElementById('form-email').classList.add('invalid');
            if (cpfRegex.test(document.getElementById('form-cpf').value))
                passRegexCounter++;
            else
                document.getElementById('form-cpf').classList.add('invalid');
            return passRegexCounter == 9;
        }
        if (this.registerType == 4 || this.registerType == 7) {
            var cnpjRegex = RegExp('^[0-9]{12,16}$');
            if (document.getElementById('form-entity-nome').value)
                passRegexCounter++;
            else
                document.getElementById('form-entity-nome').classList.add('invalid');
            if (cnpjRegex.test(document.getElementById('form-entity-cnpj').value))
                passRegexCounter++;
            else
                document.getElementById('form-entity-cnpj').classList.add('invalid');
            return passRegexCounter == 2;
        }
        if (this.registerType == 5) {
            if (document.getElementById('form-client-id').value)
                passRegexCounter++;
            else
                document.getElementById('form-client-id').classList.add('invalid');
            if (document.getElementById('form-client-month').value)
                passRegexCounter++;
            else
                document.getElementById('form-client-month').classList.add('invalid');
            if (document.getElementById('form-entity-id').value != '-1')
                passRegexCounter++;
            else
                document.getElementById('form-entity-id').classList.add('invalid');
            return passRegexCounter == 3;
        }
    };
    RegisterComponent.prototype.redirectTo = function (to) {
        this.Router.navigateByUrl(to);
    };
    RegisterComponent.prototype.enrollClient = function () {
        var _this = this;
        if (this.areInputsValid()) {
            this.registerService.enrollClient(this.newMatricula.id_filiado, this.newMatricula.id_entidade, this.newMatricula.meses).subscribe(function (responseJSON) {
                if (responseJSON)
                    _this.message = "Cliente matriculado com sucesso!";
                else
                    _this.message = "Cliente já matriculado!";
            }, function () {
                _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
            }, function () {
                _this.registerType = 0;
                _this.newMatricula = {
                    "data_final": "",
                    "data_inicio": "",
                    "empresa": "",
                    "id": _this.newMatricula.id,
                    "id_entidade": "",
                    "id_filiado": "",
                    "nome": "",
                    "meses": ""
                };
                setTimeout(function () {
                    _this.message = "Selecione uma opção";
                }, 10000);
            });
        }
    };
    RegisterComponent.prototype.renewClient = function () {
        var _this = this;
        this.registerService.renewEnroll(this.newMatricula.id, this.newMatricula.meses).subscribe(function (res) {
            _this.message = "Expiração da matrícula atualizada com sucesso";
        }, function () {
            _this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
        }, function () {
            _this.registerType = 0;
            _this.newMatricula = {
                "data_final": "",
                "data_inicio": "",
                "empresa": "",
                "id": _this.newMatricula.id,
                "id_entidade": "",
                "id_filiado": "",
                "nome": "",
                "meses": ""
            };
            //this.redirectTo('register');
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
