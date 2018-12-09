import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('paises').subscribe(
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
    this.dataService.delete('paises', elem.id).subscribe(
      resp => {
        this.dataService.getAll('paises').subscribe(
          respd => this.elementos = respd.json()
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('paises', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('paises').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    } else {
      this.dataService.set('paises', elem).subscribe(
        resp => {
          this.dataService.getAll('paises').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    }
  }

}
