import { Component, inject, Inject, OnInit } from '@angular/core';
import { TRACK_FIELDS } from '../../constants';
import { TrackField } from '../../types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  selectedFields: string[] = [];
  trackFields: TrackField[] = TRACK_FIELDS;
  separator = '';

  public data: string[] = inject<string[]>(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }

}
