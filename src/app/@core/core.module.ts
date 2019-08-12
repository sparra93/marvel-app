import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './services/http.service';
import { RestInterceptor } from './rest-interceptor';
import { CardComponent } from './components/card/card.component';
import { EmptyDataPipe } from './pipes/empty-data.pipe';
import { HeaderComponent } from './components/header/header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoadingComponent } from './components/loading/loading.component';

const modules = [
  HttpClientModule,
  NgbModule
];

const providers = [
  HttpService
];

const declarations = [
  CardComponent,
  HeaderComponent,
  PaginatorComponent,
  LoadingComponent,
  EmptyDataPipe
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations,
    ...modules
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true },
        ...providers
      ],
    };
  }
}
