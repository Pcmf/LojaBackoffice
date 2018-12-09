import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {
  private elementos: any = [];
  private elem: any = {};
  constructor(private dataService: DadosService) {
    this.dataService.getAll('fornecedores').subscribe(
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
    if (elem.id) {
      this.dataService.update('fornecedores', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('fornecedores').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    } else {
      console.log(elem);
      this.dataService.set('fornecedores', elem).subscribe(
        resp => {
          this.dataService.getAll('fornecedores').subscribe(
            respd => this.elementos = respd.json()
          );
        }
      );
    }
  }

  remover (elem) {
    this.dataService.delete('fornecedores', elem.id).subscribe(
      resp => {
        this.dataService.getAll('fornecedores').subscribe(
          respd => this.elementos = respd.json()
        );
      }
    );
  }

}
