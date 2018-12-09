import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss']
})
export class ArtigosComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('artigos').subscribe(
      (resp: any) => {
          this.elementos = resp.json();
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
    console.log(elem);
    if (elem.id) {
      this.dataService.update('artigos', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('artigos').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    } else {
      this.dataService.set('artigos', elem).subscribe(
        resp => {
          this.dataService.getAll('artigos').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    }
  }

  remover (elem) {
    this.dataService.delete('clientes', elem.id).subscribe(
      resp => {
        this.dataService.getAll('clientes').subscribe(
          respd => this.elementos = respd.json()
        );
      }
    );
  }
}
