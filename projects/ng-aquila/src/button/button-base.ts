import { ElementRef, ChangeDetectorRef, HostBinding, Directive } from '@angular/core';

/** Type of a button. */
export type NxButtonType = 'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis';

/** Size of a button. */
export type NxButtonSize = 'small' | 'small-medium' | 'medium' | 'large' ;

const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'primary';

/** @docs-private */
@Directive()
export class NxButtonBase {
  private _classNames: string;

  /** @docs-private */
  @HostBinding('class.nx-button--primary') get isPrimary(): boolean { return this.type === 'primary'; }
  /** @docs-private */
  @HostBinding('class.nx-button--secondary') get isSecondary(): boolean { return this.type === 'secondary'; }
  /** @docs-private */
  @HostBinding('class.nx-button--tertiary') get isTertiary(): boolean { return this.type === 'tertiary'; }
  /** @docs-private */
  @HostBinding('class.nx-button--cta') get isCta(): boolean { return this.type === 'cta'; }
  /** @docs-private */
  @HostBinding('class.nx-button--emphasis') get isEmphasis(): boolean { return this.type === 'emphasis'; }

  /** @docs-private */
  @HostBinding('class.nx-button--large') get isLarge(): boolean { return this.size === 'large'; }
  /** @docs-private */
  @HostBinding('class.nx-button--medium') get isMedium(): boolean { return this.size === 'medium'; }
  /** @docs-private */
  @HostBinding('class.nx-button--small-medium') get isSmallMedium(): boolean { return this.size === 'small-medium'; }
  /** @docs-private */
  @HostBinding('class.nx-button--small') get isSmall(): boolean { return this.size === 'small'; }

  /** @docs-private */
  @HostBinding('class.nx-button--block') get isBlock(): boolean { return this.block; }
  /** @docs-private */
  @HostBinding('class.nx-button--negative') get isNegative(): boolean { return this.negative; }

  /** @docs-private */
  type: NxButtonType = DEFAULT_TYPE;

  /** @docs-private */
  size: NxButtonSize = DEFAULT_SIZE;

  negative: boolean = false;
  block: boolean = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _elementRef: ElementRef) { }

  public set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }

    this._classNames = value;

    const [type = null] = this._classNames.match(/primary|secondary|tertiary|cta|emphasis/) || [DEFAULT_TYPE];
    this.type = type as NxButtonType;

    const [size = null] = this._classNames.match(/small-medium|small|medium|large/) || [DEFAULT_SIZE];
    this.size = size as NxButtonSize;

    this.negative = /negative/.test(this._classNames);
    this.block = /block/.test(this._classNames);

    this._changeDetectorRef.markForCheck();
  }

  public get classNames(): string {
    return this._classNames;
  }

  /**
   * @docs-private
   * getter used for the modal component as a quickfix
   * since button got changed from directive to component the reference used by the ngOpenModelOnClick directive
   * for nxButtons is a reference to component instance instead of an element reference. As a workaround we need a
   * way to reach the elementRef of the component until the modal gets refactored.
   */
  get elementRef() {
    return this._elementRef;
  }
}
