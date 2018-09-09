import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {
    private geocoder
    private locationCache: any = {}

    constructor(private camelizePipe: CamelizePipe) { }

    private camelize(location: string) {
        return this.camelizePipe.transform(location)
    }

    private isLocationCached(location) {
        return this.locationCache[this.camelize(location)]
    }

    private cacheLocation(location, coordinates){
        this.locationCache[this.camelize(location)] = coordinates
    }

    private geocodeLocation(location): Observable<any> {
        if (!this.geocoder) {
            this.geocoder = new (<any>window).google.maps.Geocoder()
        }

        return new Observable<any>((observer) => {

            this.geocoder.geocode({ address: location }, (res, status) => {
                if (status == 'OK') {
                    const geometry = res[0].geometry.location
                    const coordinates = { lat: geometry.lat(), lng: geometry.lng() }
                    this.cacheLocation(location, coordinates)
                    observer.next(coordinates)
                } else {
                    observer.error('Hubo un error al geocodear la localizacion')
                    observer.complete() // aca ya hacemos la desuscripcion
                }
            })
        })
    }

    getGeoLocation(location: string): Observable<any> {
        if (this.isLocationCached(location)) {
            return of(this.locationCache[this.camelize(location)])
        } else {
            return this.geocodeLocation(location)
        }


    }

}