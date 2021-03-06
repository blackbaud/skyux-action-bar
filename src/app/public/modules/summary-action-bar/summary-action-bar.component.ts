import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import {
  fromEvent
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  Subject
} from 'rxjs';

import {
  Subscription
} from 'rxjs';

import {
  skyAnimationSlide
} from '@skyux/animations';

import {
  MutationObserverService,
  SkyMediaBreakpoints,
  SkyMediaQueryService,
  SkyAppWindowRef
} from '@skyux/core';

import {
  SkySummaryActionBarSummaryComponent
} from './summary/summary-action-bar-summary.component';

import {
  SkySummaryActionBarType
} from './types/summary-action-bar-type';

import {
  SkySummaryActionBarAdapterService
} from './summary-action-bar-adapter.service';

/**
 * Auto-incrementing integer used to generate unique ids for summary action bar components.
 */
let nextId = 0;

/**
 * Contains the `sky-summary-action-bar-actions` and
 * `sky-summary-action-bar-summary` components.
 */
@Component({
  selector: 'sky-summary-action-bar',
  templateUrl: './summary-action-bar.component.html',
  styleUrls: ['./summary-action-bar.component.scss'],
  animations: [skyAnimationSlide],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySummaryActionBarComponent implements AfterViewInit, OnDestroy {

  public isSummaryCollapsed = false;

  public get isSummaryCollapsible(): boolean {
    return this.type === SkySummaryActionBarType.StandardModal ||
      this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  public type: SkySummaryActionBarType;

  public slideDirection: string = 'down';

  public summaryId: string = `sky-summary-action-bar-summary-${++nextId}`;

  private mediaQuerySubscription: Subscription;

  private observer: MutationObserver;

  private idled = new Subject<boolean>();

  @ContentChild(SkySummaryActionBarSummaryComponent, { read: ElementRef })
  private summaryElement: ElementRef;

  constructor(
    private adapterService: SkySummaryActionBarAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private mediaQueryService: SkyMediaQueryService,
    private observerService: MutationObserverService,
    private windowRef: SkyAppWindowRef
  ) { }

  public ngAfterViewInit(): void {
    this.type = this.adapterService.getSummaryActionBarType(this.elementRef.nativeElement);
    if (!(this.type === SkySummaryActionBarType.FullPageModal || this.type === SkySummaryActionBarType.StandardModal)) {
      this.setupReactiveState();

      if (this.type === SkySummaryActionBarType.SplitView) {
        this.adapterService.styleSplitViewElementForActionBar(this.elementRef);
      } else {
        this.adapterService.styleBodyElementForActionBar(this.elementRef);
      }

      this.setupResizeListener();

      if (this.type === SkySummaryActionBarType.Tab) {
        this.setupTabListener();
      }
    } else {
      this.adapterService.styleModalFooter(this.elementRef);

      if (this.type === SkySummaryActionBarType.FullPageModal) {
        this.setupReactiveState();
      }
    }
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy(): void {

    if (this.type === SkySummaryActionBarType.SplitView) {
      this.adapterService.revertSplitViewElementStyles();
    } else if ((this.type === SkySummaryActionBarType.Page) ||
      (this.type === SkySummaryActionBarType.Tab)) {
      this.adapterService.revertBodyElementStyles();
    }

    this.removeResizeListener();
    this.removeTabListener();

    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
    this.idled.complete();
  }

  public onDirectionChange(direction: string): void {
    this.slideDirection = direction;
  }

  public summaryContentExists(): boolean {
    return (
      this.summaryElement &&
      this.summaryElement.nativeElement.children.length > 0
    );
  }

  // NOTE: This function is needed so that the button is not removed until post-animation
  public summaryTransitionEnd(): void {
    if (this.slideDirection === 'up') {
      this.isSummaryCollapsed = true;
    }

    if ((this.type === SkySummaryActionBarType.Page) ||
      (this.type === SkySummaryActionBarType.Tab)) {
      this.adapterService.styleBodyElementForActionBar(this.elementRef);
    }
  }

  // NOTE: This function is needed so that the button is added before animation
  public summaryTransitionStart(): void {
    if (this.slideDirection === 'down') {
      this.isSummaryCollapsed = false;
    }
  }

  private setupReactiveState() {
    this.mediaQuerySubscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args !== SkyMediaBreakpoints.xs) {
        this.isSummaryCollapsed = false;
        this.slideDirection = 'down';
      }
      this.changeDetector.detectChanges();
    });
  }

  private setupTabListener(): void {
    if (!this.observer) {
      this.observer = this.observerService.create((mutations: MutationRecord[]) => {
        if ((<HTMLElement>mutations[0].target).attributes.getNamedItem('hidden')) {
          this.adapterService.revertBodyElementStyles();
          this.removeResizeListener();
        } else {
          setTimeout(() => {
            this.adapterService.styleBodyElementForActionBar(this.elementRef);
            this.setupResizeListener();
          });
        }
      });
    }

    const config = { attributes: true, attributeFilter: ['hidden'], childList: false, characterDate: false };
    let el = this.elementRef.nativeElement;
    do {
      if (el.classList.contains('sky-tab')) {
        this.observer.observe(el, config);
      }
      el = el.parentElement;
      // tslint:disable-next-line:no-null-keyword
    } while (el !== null && el.nodeType === 1);
  }

  private removeTabListener(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupResizeListener(): void {
    if (this.type !== SkySummaryActionBarType.SplitView) {
      const windowObj = this.windowRef.nativeWindow;
      fromEvent(windowObj, 'resize')
        .pipe(takeUntil(this.idled))
        .subscribe(() => {
          this.adapterService.styleBodyElementForActionBar(this.elementRef);
        });
    }
  }

  private removeResizeListener(): void {
    this.idled.next(true);
  }

}
