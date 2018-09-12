import { Component, OnInit, Input } from '@angular/core';
import { Rental } from 'src/app/rental/shared/rental.model';

@Component({
  selector: 'app-rentail-detail-booking',
  templateUrl: './rentail-detail-booking.component.html',
  styleUrls: ['./rentail-detail-booking.component.scss']
})
export class RentailDetailBookingComponent implements OnInit {
  @Input() price: number

  private daterange: any = {};

  private options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

  constructor() { }

  ngOnInit() {
  }

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers

  private selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }


}
