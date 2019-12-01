import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Importing your components
import { ListPage } from './list.page';
import { ListItemModal } from './list.item.modal';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  declarations: [
   // Importing your components
    ListPage,
    ListItemModal
  ],
  entryComponents: [
    ListPage,
    ListItemModal
  ],
  providers: []
})
export class ListModule {}