import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { expect } from '@skyux-sdk/testing';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '@skyux/core';
import { MockSkyMediaQueryService } from '@skyux/core/testing';

import { SkySummaryActionBarTestComponent } from '../fixtures/summary-action-bar.component.fixture';
import { SkySummaryActionBarFixtureModule } from '../fixtures/summary-action-bar.module.fixture';
import { SkySummaryActionBarComponent } from '../summary-action-bar.component';

import { SkySummaryActionBarSecondaryActionsComponent } from './summary-action-bar-secondary-actions.component';

describe('Summary Action Bar action components', () => {
  let fixture: ComponentFixture<SkySummaryActionBarTestComponent>;
  let cmp: SkySummaryActionBarTestComponent;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {
    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      imports: [SkySummaryActionBarFixtureModule]
    });

    fixture = TestBed.overrideComponent(
      SkySummaryActionBarSecondaryActionsComponent,
      {
        add: {
          providers: [
            {
              provide: SkyMediaQueryService,
              useValue: mockMediaQueryService
            }
          ]
        }
      }
    )
      .overrideComponent(SkySummaryActionBarComponent, {
        add: {
          providers: [
            {
              provide: SkyMediaQueryService,
              useValue: mockMediaQueryService
            }
          ]
        }
      })
      .createComponent(SkySummaryActionBarTestComponent);

    cmp = fixture.componentInstance as SkySummaryActionBarTestComponent;
    debugElement = fixture.debugElement;
  });

  describe('click event', () => {
    it('should emit the actionClick event when the primary action button is clicked', () => {
      spyOn(cmp, 'clickHandler').and.stub();
      fixture.detectChanges();
      debugElement
        .query(By.css('sky-summary-action-bar-primary-action button'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(cmp.clickHandler).toHaveBeenCalled();
    });

    it('should emit the actionClick event when the secondary action button is clicked', () => {
      spyOn(cmp, 'clickHandler').and.stub();
      fixture.detectChanges();
      debugElement
        .query(By.css('sky-summary-action-bar-secondary-action button'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(cmp.clickHandler).toHaveBeenCalled();
    });

    it('should emit the actionClick event when the cancel button is clicked', () => {
      spyOn(cmp, 'clickHandler').and.stub();
      fixture.detectChanges();
      debugElement
        .query(By.css('sky-summary-action-bar-cancel button'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(cmp.clickHandler).toHaveBeenCalled();
    });
  });

  describe('disabled states', () => {
    it('should disable the element when the primary action button has disabled set to true', () => {
      cmp.disableButtons = true;
      fixture.detectChanges();
      expect(
        debugElement.query(
          By.css('sky-summary-action-bar-primary-action button')
        ).nativeElement.disabled
      ).toBeTruthy();
    });

    it('should disable the element when the secondary action button has disabled set to true', () => {
      cmp.disableButtons = true;
      fixture.detectChanges();
      expect(
        debugElement.query(
          By.css('sky-summary-action-bar-secondary-action button')
        ).nativeElement.disabled
      ).toBeTruthy();
    });

    it('should disable the element when the cancel button has disabled set to true', () => {
      cmp.disableButtons = true;
      fixture.detectChanges();
      expect(
        debugElement.query(By.css('sky-summary-action-bar-cancel button'))
          .nativeElement.disabled
      ).toBeTruthy();
    });
  });

  describe('secondary actions', () => {
    it('should have secondary actions with isDropdown as false on large screens', () => {
      fixture.detectChanges();
      cmp.secondaryActions.secondaryActionComponents.forEach((action) => {
        expect(action.isDropdown).toBeFalsy();
      });
    });

    it('should have secondary actions with isDropdown as false on large screens when there are five actions', () => {
      fixture.detectChanges();
      cmp.secondaryActions.secondaryActionComponents.forEach((action) => {
        expect(action.isDropdown).toBeFalsy();
      });
      fixture.detectChanges();
      cmp.extraActions = true;
      fixture.detectChanges();
      cmp.secondaryActions.secondaryActionComponents.forEach((action) => {
        expect(action.isDropdown).toBeTruthy();
      });
    });

    it('should have secondary actions with isDropdown as true on xs screens', () => {
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      cmp.secondaryActions.secondaryActionComponents.forEach((action) => {
        expect(action.isDropdown).toBeTruthy();
      });
    });
  });

  describe('a11y', () => {
    it('should be accessible (standard lg setup)', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible (standard xs setup)', async(() => {
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible (standard xs setup collapsed summary)', async(() => {
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        debugElement
          .query(By.css('.sky-summary-action-bar-details-collapse button'))
          .nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(fixture.nativeElement).toBeAccessible();
        });
      });
    }));
  });
});
