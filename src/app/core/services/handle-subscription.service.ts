import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleSubscriptionService {
  dataSubcriptions: Subscription[] = [];

  constructor() { }

  handleSubcriptions() {
    this.dataSubcriptions.forEach(sub => sub.unsubscribe());
  }

}
