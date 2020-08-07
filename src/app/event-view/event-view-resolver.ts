import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Event, Page } from './types';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventViewResolver implements Resolve<Event> {
  constructor(private readonly router: Router,
    private readonly firestore: AngularFirestore) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.firestore.doc<Page>(`pages/${route.params['pageId']}`)
      .valueChanges()
      .pipe(
        switchMap((page) => {
          // If page is not found, redirect to homepage, which will redirect to ECC main site.
          if (!page) this.router.navigate(['']);
          return this.firestore.doc<Event>(`events/${page.eventId}`).valueChanges()
        }),
        take(1),
        );
  }
}