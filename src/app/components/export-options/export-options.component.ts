import { Component, OnInit, Inject } from '@angular/core';
import { TRACK_FIELDS } from '../../constants';
import { TrackField } from '../../types';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  selectedFields: string[] = [];
  trackFields: TrackField[] = TRACK_FIELDS;
  separator = '';

  constructor(
    private dialogRef: MatDialogRef<ExportOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
