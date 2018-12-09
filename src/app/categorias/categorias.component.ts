import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';
import { element } from 'protractor';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('categorias').subscribe(
      (resp: any) => {
          this.elementos = resp.json();
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
    this.dataService.delete('categorias', elem.id).subscribe(
      resp => {
        this.dataService.getAll('categorias').subscribe(
          respd => this.elementos = respd.json()
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('categorias', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('categorias').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    } else {
      this.dataService.set('categorias', elem).subscribe(
        resp => {
          this.dataService.getAll('categorias').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    }
  }

}
