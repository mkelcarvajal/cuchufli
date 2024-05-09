import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CopyPasteRoutingModule } from './copy-paste-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    CommonModule,
    CopyPasteRoutingModule
  ]
})
export class CopyPasteModule { }
