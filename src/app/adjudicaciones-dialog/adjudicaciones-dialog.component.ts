import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adjudicaciones-dialog',
  templateUrl: './adjudicaciones-dialog.component.html',
  styleUrl: './adjudicaciones-dialog.component.scss'
})
export class AdjudicacionesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdjudicacionesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
