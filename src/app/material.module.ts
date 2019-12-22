import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

const materials = [MatButtonModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule];

@NgModule({
  imports: materials,
  exports: materials
})



export class MaterialModule { }
