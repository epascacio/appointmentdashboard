import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TradeListComponent } from '../trade-list/trade-list.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: TradeListComponent,
    data: {
      title: 'Trade List'
    }
  }
];

@NgModule({
  declarations: [
    TradeListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class TradesModule { }
