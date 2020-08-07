import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageRedirectComponent } from './homepage-redirect/homepage-redirect.component'
import { EventViewComponent } from './event-view/event-view.component'
import { EventViewResolver } from './event-view/event-view-resolver';


const routes: Routes = [
  {
    path: '',
    component: HomepageRedirectComponent,
  },
  {
    path: ":pageId",
    component: EventViewComponent,
    resolve: {
    	event: EventViewResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
