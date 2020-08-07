import { Timestamp } from '@firebase/firestore-types';

/** Should match with the Firebase Schema. */
export interface Event {
	name: string;
	videoId: string;
  startTime: Timestamp
}

export interface Page {
	eventId: string;
}
