import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MapService } from 'src/app/common/map/map.service';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location

  lat: number 
  lng: number 

  constructor(private mapSrvc:MapService) { }

  ngOnInit() {
  }

  
  onHandleMapReady(){
    setTimeout(() => {
      this.mapSrvc.getGeoLocation(this.location)
      .subscribe(
        res =>{
          this.lat = res.lat
          this.lng = res.lng
        },
        error=>console.log(error)
      )
    }, 1000);
  }

}
