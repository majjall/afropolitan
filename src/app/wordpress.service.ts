import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('https://www.leparisafro.com/wp-json/wp/v2/posts?_embed', {
      params: {
        per_page: '6'
      }
    });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('https://www.leparisafro.com/wp-json/wp/v2/events?_embed', {
      params: {
        per_page: '10'
      }
    }).pipe(
      // tap((value) => console.log('Avant : ', JSON.stringify(value))),
      // map((value: string) => value.length),
      map(
        (jsonArray: []) => jsonArray.map(jsonItem => Event.fromJson(jsonItem))
      ),
      // tap((value) => console.log('Après : ', JSON.stringify(value)))
    );
  }
}

export class Event {
  date: string; // Date;
  title: string;
  description: string;
  content: string;
  link: string;
  detailsLink: string;
  address: string;
  location: string;
  bannerLink: string;
  registrationLink: string;
  startDate: string;
  startTime: Date;
  endDate: string;
  endTime: Date;
  registrationDeadline: string;
  priceDescription: number;

  isOnline: boolean;
  expiryDate: Date;

  public static fromJson(json: any): Event {
    const event: Event = new Event();
    event.date = json['date_gmt'];
    event.title = json['title']['rendered'];
    event.description = json['event_data']['_event_venue_name'];
    event.content = json['content']['rendered'];
    event.link = json['_links']['self'];
    event.detailsLink = json['author'];
    event.address = json['event_data']['_event_address'];
    event.location = json['event_data']['_event_location'];
    event.bannerLink = json['event_data']['_event_banner'];
    event.registrationLink = json['event_data']['_registration'];
    event.startDate = json['event_data']['_event_start_date'];
    event.startTime = json['event_data']['_event_start_time'];
    // event.startTime = new Date(json['event_data']['_event_start_time']);
    event.endDate = json['event_data']['_event_end_date'];
    event.endTime = json['event_data']['_event_end_time'];
    // event.endTime = new Date(json['event_data']['_event_end_time']);
    event.registrationDeadline = json['event_data']['_event_registration_deadline'];
    event.priceDescription = json['event_data']['_prix:'];

    // event.isOnline = json['author']; // _event_online: no
    // event.expiryDate = new Date(json['published']); // _event_expiry_date

    return event;
  }
}
