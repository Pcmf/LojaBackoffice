import { Component, OnInit } from '@angular/core';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss']
})
export class ArtigosComponent {
  private elementos: any = [];
  private elem: any = {};
  private imageSrc = '';
  private familias: any[];
  private fornecedores: any[];
  private categorias: any[];

  constructor(private dataService: DadosService) {
    this.dataService.getAll('artigos').subscribe(
      (resp: any) => {
          this.elementos = resp.json();
      }
    );
      // familias
      this.dataService.getAll('familias').subscribe(
        resp => this.familias = resp.json()
      );

      // categorias
      this.dataService.getAll('categorias').subscribe(
        resp => this.categorias = resp.json()
      );
      // fornecedores
      this.dataService.getAll('fornecedores').subscribe(
        resp => this.fornecedores = resp.json()
      );

  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.elem.base64 = this.imageSrc;
  }

  criar () {
    this.elem = {};
  }
  editar (elem) {
    this.elem = elem;
  }
  save (elem) {
    if (elem.id) {
      this.dataService.update('artigos', elem.id, elem).subscribe(
        resp => {
          this.dataService.getAll('artigos').subscribe(
            respd => {
              this.elementos = respd.json();
              this.elem = {};
            }
          );
        }
      );
    } else {
      elem.base64 = this.imageSrc;
      this.dataService.set('artigos', elem).subscribe(
        resp => {
          this.dataService.getAll('artigos').subscribe(
            respd => {
              this.elementos = respd.json();
              this.elem = {};
            }
          );
        }
      );
    }
  }

  remover (elem) {
    this.dataService.delete('artigos', elem.id).subscribe(
      resp => {
        this.dataService.getAll('artigos').subscribe(
          respd => this.elementos = respd.json()
        );
      }
    );
  }
}
