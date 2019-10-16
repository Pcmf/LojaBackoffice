import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrls: ['./cores.component.scss']
})
export class CoresComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('cores').subscribe(
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
    this.dataService.delete('cores', elem.id).subscribe(
      resp => {
        this.dataService.getAll('cores').subscribe(
          respd => this.elementos = respd
        );
      }
    );
  }

  save (elem) {
    if (elem.id) {
      this.dataService.update('cores', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('cores').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    } else {
      this.dataService.set('cores', elem).subscribe(
        resp => {
          this.dataService.getAll('cores').subscribe(
            respd => this.elementos = respd
          );
        }
      );
    }
  }
}
