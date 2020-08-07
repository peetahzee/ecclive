import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

import { Page, Event } from './types';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventViewComponent implements OnInit {
  event: Event;
  iframeSrc?: string;

  constructor(private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.iframeSrc = `https://www.youtube.com/embed/${this.event.videoId}`;

    // Automatically refresh on scheduled start time
    if (!this.hasEventBegun()) {
      setTimeout(
        () => window.location.reload(),
        // Random within 5 seconds so that we don't DDOS ourselves
        // But really Firebase should be able to handle it... right?
        this.startTime - Date.now() + Math.random() * 5000
      );
    }
  }

  shouldShowIframe() {
    return !!this.event.videoId && this.hasEventBegun();
  }

  get startTime() {
    return this.event?.startTime?.seconds * 1000 || 0;
  }

  hasEventBegun() {
    return new Date() >= new Date(this.startTime);
  }
}
