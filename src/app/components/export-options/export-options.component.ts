import { Component, inject, OnInit } from '@angular/core';
import { TRACK_FIELDS } from '../../constants';
import { TrackField } from '../../types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class ExportOptionsComponent implements OnInit {

  selectedFields: string[] = [];
  trackFields: TrackField[] = TRACK_FIELDS;
  separator = '';

  public data: string[] = inject<string[]>(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }

}
