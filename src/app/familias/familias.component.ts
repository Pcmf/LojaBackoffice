import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';
@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss']
})
export class FamiliasComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('familias').subscribe(
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
    this.dataService.delete('familias', elem.id).subscribe(
      resp => {
        this.dataService.getAll('familias').subscribe(
          respd => this.elementos = respd
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('familias', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('familias').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    } else {
      this.dataService.set('familias', elem).subscribe(
        resp => {
          this.dataService.getAll('familias').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    }
  }

}
