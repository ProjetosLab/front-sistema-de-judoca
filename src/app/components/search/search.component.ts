import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clienteJudocaInterface } from 'src/app/util/aluno';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  message : string = "Buscando...";
  customer : clienteJudocaInterface;

  constructor(
    private ActivatedRoute : ActivatedRoute,
    private SearchService : SearchService,
    private Router : Router,
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( (params : any) => {
      if( params.cpf ) this.SearchService.getClientData(params.cpf).subscribe( res => {
        if( res.id == '-1' ) this.message = "Nenhum cliente foi encontrado!";
        else { this.customer = res; this.message = ""; }
      })
    });
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }

}
