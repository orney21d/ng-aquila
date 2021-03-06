import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { takeUntil } from 'rxjs/operators';

/** @title Disabled Columns example */
@Component({
  templateUrl: './comparison-table-disabled-columns-example.html',
  styleUrls: ['./comparison-table-disabled-columns-example.css']
})
export class ComparisonTableDisabledColumnsExampleComponent implements OnDestroy {
  unselectedClassNames: string;
  private _destroyed = new Subject();

  constructor(private demoService: BaseDemoThemingService) {
    this.demoService.unselectedClassNames.pipe(
      takeUntil(this._destroyed)
    ).subscribe((value: string) => {
      this.unselectedClassNames = value;
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
