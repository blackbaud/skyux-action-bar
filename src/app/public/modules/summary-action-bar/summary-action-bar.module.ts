import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MutationObserverService,
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyChevronModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyThemeModule
} from '@skyux/theme';

import {
  SkyActionBarsResourcesModule
} from '../shared/action-bars-resources.module';

import {
  SkySummaryActionBarComponent
} from './summary-action-bar.component';

import {
  SkySummaryActionBarActionsComponent
} from './actions/summary-action-bar-actions.component';

import {
  SkySummaryActionBarCancelComponent
} from './actions/summary-action-bar-cancel.component';

import {
  SkySummaryActionBarPrimaryActionComponent
} from './actions/summary-action-bar-primary-action.component';

import {
  SkySummaryActionBarSecondaryActionComponent
} from './actions/summary-action-bar-secondary-action.component';

import {
  SkySummaryActionBarSecondaryActionsComponent
} from './actions/summary-action-bar-secondary-actions.component';

import {
  SkySummaryActionBarSummaryComponent
} from './summary/summary-action-bar-summary.component';

import {
  SkySummaryActionBarAdapterService
} from './summary-action-bar-adapter.service';

@NgModule({
  declarations: [
    SkySummaryActionBarActionsComponent,
    SkySummaryActionBarCancelComponent,
    SkySummaryActionBarComponent,
    SkySummaryActionBarPrimaryActionComponent,
    SkySummaryActionBarSecondaryActionComponent,
    SkySummaryActionBarSecondaryActionsComponent,
    SkySummaryActionBarSummaryComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyDropdownModule,
    SkyI18nModule,
    SkyIconModule,
    SkyActionBarsResourcesModule,
    SkyMediaQueryModule,
    SkyThemeModule
  ],
  providers: [
    MutationObserverService,
    SkySummaryActionBarAdapterService
  ],
  exports: [
    SkySummaryActionBarComponent,
    SkySummaryActionBarActionsComponent,
    SkySummaryActionBarCancelComponent,
    SkySummaryActionBarPrimaryActionComponent,
    SkySummaryActionBarSecondaryActionComponent,
    SkySummaryActionBarSecondaryActionsComponent,
    SkySummaryActionBarSummaryComponent
  ]
})
export class SkySummaryActionBarModule { }
