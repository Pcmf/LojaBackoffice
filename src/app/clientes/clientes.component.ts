import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('clientes').subscribe(
      (resp: any) => {
          this.elementos = resp;
      }
    );
  }

  ngOnInit() {
  }

  criar () {
    this.elem = {};
  }
  editar (elem) {
    this.elem = elem;
  }
  save (elem) {
    if (elem.id) {
      this.dataService.update('clientes', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('clientes').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    } else {
      this.dataService.set('clientes', elem).subscribe(
        resp => {
          this.dataService.getAll('clientes').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    }
  }

  remover (elem) {
    this.dataService.delete('clientes', elem.id).subscribe(
      resp => {
        this.dataService.getAll('clientes').subscribe(
          respd => this.elementos = respd
        );
      }
    );
  }
}
