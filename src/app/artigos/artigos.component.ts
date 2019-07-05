import { Component, OnInit, Input } from '@angular/core';
import { DadosService } from './../dados.service';
import { StockComponent } from './../stock/stock.component';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss']
})


export class ArtigosComponent {

  elementos: any = [];
  elem: any = {};
  private imageSrc = '';
  private imageSrc2 = '';
  private familias: any[];
  private fornecedores: any[];
  private composicoes: any[];
  private categorias: any[];
  private stocks: any = [];
  artigoModal: any;
  photos: any = [];
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
      // composicoes
      this.dataService.getAll('composicoes').subscribe(
        resp => this.composicoes = resp.json()
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

  handleInputChange2(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded2(e) {
    const reader = e.target;
    this.imageSrc2 = reader.result;
    this.elem.base64_2 = this.imageSrc2;
  }

  criar () {
    this.elem = {};
  }
  editar (elem) {
    this.elem = elem;
  }
  save (elem) {
    if (elem.id) {
      console.log(elem);
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
      console.log(elem);
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

  stock (artigo) {
    this.elem = artigo;
    this.dataService.getOne('stock', artigo.id).subscribe(
      resp => this.stocks = resp.json()
    );
  }

  fotos (artigo) {
    this.elem = artigo;
    this.dataService.getOne('fotos', artigo.id).subscribe(
      resp => this.fotos = resp.json()
    );
  }

  openAlertModal (art) {
    this.artigoModal = art;
  }

  remover () {
    this.dataService.delete('artigos', this.artigoModal.id).subscribe(
      resp => {
        this.dataService.getAll('artigos').subscribe(
          respd => {
            this.elementos = respd.json();
            this.artigoModal = {};
          }
        );
      }
    );
  }
}
