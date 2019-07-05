import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-composicao',
  templateUrl: './composicao.component.html',
  styleUrls: ['./composicao.component.scss']
})
export class ComposicaoComponent implements OnInit {

    private elementos: any = [];
    private elem: any = {};
    constructor(private dataService: DadosService) {
      this.dataService.getAll('composicoes').subscribe(
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
      this.dataService.delete('composicoes', elem.id).subscribe(
        resp => {
          this.dataService.getAll('composicoes').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    }
  
    save (elem) {
      if (elem.id) {
        this.dataService.update('composicoes', elem.id, elem).subscribe(
          resp => {
            this.dataService.getAll('composicoes').subscribe(
              respd => this.elementos = respd.json()
            );
          }
        );
      } else {
        this.dataService.set('composicoes', elem).subscribe(
          resp => {
            this.dataService.getAll('composicoes').subscribe(
              respd => this.elementos = respd.json()
            );
          }
        );
      }
    }
  
  }
  
