import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class BaseComponent implements OnDestroy {
  /**
   * Subject to keep track of destroy
   * usefull for subscriptions & memory leak prevention
   */
  destroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
