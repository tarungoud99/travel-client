import { Component, OnInit } from '@angular/core';
import { TravelService } from './travel.service';
import { Travel } from './travel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  records: Travel[] = [];
  newRecord: Travel = {
    place: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
    imageUrl: '',
  };
  selectedRecord: Travel | null = null;

  constructor(private travelService: TravelService) {
    this.getRecords();
  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.travelService
      .getRecord()
      .subscribe((records) => (this.records = records));
  }

  addRecord(): void {
    this.travelService.addRecord(this.newRecord).subscribe(() => {
      this.getRecords();
      this.newRecord = {
        place: '',
        startDate: new Date(),
        endDate: new Date(),
        notes: '',
        imageUrl: '',
      };
    });
  }

  updateRecord(record: Travel) {
    if (record._id) {
      this.travelService.updateRecord(record._id, record).subscribe(
        (updateRecord) => {
          const index = this.records.findIndex(
            (p) => p._id === updateRecord._id
          );
          if (index !== -1) {
            this.records[index] = updateRecord;
          }
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    }
  }

  deleteRecord(RecordId: string): void {
    this.travelService
      .deleteRecord(RecordId)
      .subscribe(() => this.getRecords());
  }
}
