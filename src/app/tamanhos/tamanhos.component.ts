import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-tamanhos',
  templateUrl: './tamanhos.component.html',
  styleUrls: ['./tamanhos.component.scss']
})
export class TamanhosComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('tamanhos').subscribe(
      (resp: any) => {
          this.elementos = resp;
      }
    );
   }

  ngOnInit() {

  }

  editar (elem) {
    this.elem = elem;
  }

  criar () {
    this.elem = {};
  }

  remover (elem) {
    this.dataService.delete('tamanhos', elem.id).subscribe(
      resp => {
        this.dataService.getAll('tamanhos').subscribe(
          respd => this.elementos = respd
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('tamanhos', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('tamanhos').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    } else {
      this.dataService.set('tamanhos', elem).subscribe(
        resp => {
          this.dataService.getAll('tamanhos').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    }
  }
}
