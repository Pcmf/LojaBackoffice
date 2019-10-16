import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-tipo-cliente',
  templateUrl: './tipo-cliente.component.html',
  styleUrls: ['./tipo-cliente.component.scss']
})
export class TipoClienteComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('tipocliente').subscribe(
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
    this.dataService.delete('tipocliente', elem.id).subscribe(
      resp => {
        this.dataService.getAll('tipocliente').subscribe(
          respd => this.elementos = respd
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('tipocliente', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('tipocliente').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    } else {
      this.dataService.set('tipocliente', elem).subscribe(
        resp => {
          this.dataService.getAll('tipocliente').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    }
  }
}
