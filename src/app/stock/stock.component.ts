import { Component, Input } from '@angular/core';
import { DadosService } from './../dados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent  {

  @Input() artigo: any;
  @Input() stocks: any = [];
  private linha: any;
  private cores: any = [];
  private tamanhos: any = [];
  private linhaNova = false;
  constructor(private dataService: DadosService, private router: Router) {
    // Carregar lista de cores
    this.dataService.getAll('cores').subscribe(
      resp => this.cores = resp
    );
  // Carregar lista de tamanhos
    this.dataService.getAll('tamanhos').subscribe(
      resp => this.tamanhos = resp
    );

    this.linha  = {'artigo': '', 'cor': '', 'tamanho': '', 'qty': 0}
  }

  carregaDados () {
    this.dataService.getOne('stock', this.artigo.id).subscribe(
      resp => this.stocks = resp
    );
  }

  guardaLinha (linha) {
    this.dataService.update('stock', this.artigo.id, linha).subscribe(
      resp =>  {
        this.carregaDados ();
      }
    );
  }
  novaLinha (linha) {
    this.dataService.set('stock', linha).subscribe(
      resp =>  {
        this.carregaDados ();
        this.linha  = {'artigo': this.artigo.id, 'cor': '', 'tamanho': '', 'qty': 0};
        this.linhaNova = false;
      }
    );
  }
  addLinha () {
    this.linhaNova = true;
    if (this.artigo) {
      this.linha  = {'artigo': this.artigo.id, 'cor': '', 'tamanho': '', 'qty': 0};
    }
  }

  removeLinha (linha) {
    this.dataService.delete('stock', this.artigo.id + '/' + linha.cor + '/' + linha.tamanho ).subscribe(
      resp => this.carregaDados()
    );
  }
}
