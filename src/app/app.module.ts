import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArtigosComponent } from './artigos/artigos.component';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { StockComponent } from './stock/stock.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CoresComponent } from './cores/cores.component';
import { TamanhosComponent } from './tamanhos/tamanhos.component';
import { PaisesComponent } from './paises/paises.component';
import { TipoClienteComponent } from './tipo-cliente/tipo-cliente.component';
import { LoginComponent } from './login/login.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { DadosService } from './dados.service';
import { FamiliasComponent } from './familias/familias.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { AuthGuardService } from './auth-guard.service';
import { ImageUploadModule } from 'angular2-image-upload';
import { ComposicaoComponent } from './composicao/composicao.component';
import { FotosComponent } from './fotos/fotos.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArtigosComponent,
    HomeComponent,
    ClientesComponent,
    FornecedoresComponent,
    StockComponent,
    CategoriasComponent,
    CoresComponent,
    TamanhosComponent,
    PaisesComponent,
    TipoClienteComponent,
    LoginComponent,
    EncomendasComponent,
    FamiliasComponent,
    ChangepassComponent,
    ComposicaoComponent,
    FotosComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot([
      {path: 'artigos' , component: ArtigosComponent, canActivate: [AuthGuardService]},
      {path: 'clientes' , component: ClientesComponent, canActivate: [AuthGuardService]},
      {path: 'fornecedores' , component: FornecedoresComponent, canActivate: [AuthGuardService]},
      {path: 'familias' , component: FamiliasComponent, canActivate: [AuthGuardService]},
      {path: 'categorias' , component: CategoriasComponent, canActivate: [AuthGuardService]},
      {path: 'composicoes' , component: ComposicaoComponent, canActivate: [AuthGuardService]},
      {path: 'cores' , component: CoresComponent, canActivate: [AuthGuardService]},
      {path: 'tamanhos', component: TamanhosComponent, canActivate: [AuthGuardService]},
      {path: 'paises', component: PaisesComponent, canActivate: [AuthGuardService]},
      {path: 'tipocliente', component: TipoClienteComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent},
      {path: 'change', component: ChangepassComponent, canActivate: [AuthGuardService]},
      {path: 'encomendas', component: EncomendasComponent, canActivate: [AuthGuardService]},
      {path: '**' , component: HomeComponent}
    ])
  ],
  providers: [DadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
