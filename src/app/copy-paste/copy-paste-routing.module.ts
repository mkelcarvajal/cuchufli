import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyPasteComponent } from './copy-paste.component';

const routes: Routes = [
  { path: '', component: CopyPasteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyPasteRoutingModule { }
