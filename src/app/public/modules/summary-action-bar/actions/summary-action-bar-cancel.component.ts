import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-summary-action-bar-cancel',
  templateUrl: './summary-action-bar-cancel.component.html',
  styleUrls: ['./summary-action-bar-cancel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySummaryActionBarCancelComponent {

  @Input()
  public isDisabled = false;

  @Output()
  public actionClick = new EventEmitter<void>();

  public cancelClicked(): void {
    this.actionClick.emit();
  }
}
