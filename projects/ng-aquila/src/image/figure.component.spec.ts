import { NxFigureComponent } from './figure.component';
import { Component, Type, ViewChild, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxImageModule } from './image.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class ImageTest {
  @ViewChild(NxFigureComponent) imageInstance: NxFigureComponent;
  keyword: string;
}

describe('NxImageDirective', () => {
  let fixture: ComponentFixture<ImageTest>;
  let testInstance: ImageTest;
  let imageInstance: NxFigureComponent;
  let imgNativeElement: HTMLImageElement;
  let figureNativeElement: HTMLElement;

  const createTestComponent = (component: Type<ImageTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    imageInstance = testInstance.imageInstance;
    imgNativeElement = <HTMLImageElement>fixture.nativeElement.querySelector('img');
    figureNativeElement = fixture.nativeElement.querySelector('figure');
  };

  const setKeyword = (keyword) => {
    testInstance.keyword = keyword;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicImage,
        FigureWithModifier
      ],
      imports: [
        NxImageModule
      ]
    }).compileComponents();
  }));

  it('creates the Image', async(() => {
    createTestComponent(BasicImage);
    expect(imageInstance).toBeTruthy();
  }));

  it('includes the nx-image--auto class by default', async(() => {
    createTestComponent(BasicImage);
    expect(figureNativeElement.classList.contains('nx-image--auto')).toBe(true);
  }));

  it('creates full modifier class from a correct keyword', async(() => {
    createTestComponent(FigureWithModifier);
    setKeyword('1by1');
    expect(figureNativeElement.classList.contains('nx-image--1by1')).toBe(true);
    setKeyword('1by1dot1');
    expect(figureNativeElement.classList.contains('nx-image--1by1dot1')).toBe(true);
    setKeyword('1dot8by1');
    expect(figureNativeElement.classList.contains('nx-image--1dot8by1')).toBe(true);
    setKeyword('1dot2by1');
    expect(figureNativeElement.classList.contains('nx-image--1dot2by1')).toBe(true);
    setKeyword('2dot6by1');
    expect(figureNativeElement.classList.contains('nx-image--2dot6by1')).toBe(true);
    setKeyword('rounded');
    expect(figureNativeElement.classList.contains('nx-image--rounded')).toBe(true);
  }));

  describe('a11y', () => {
    it('has no accessbility violations', function (done) {
      createTestComponent(BasicImage);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        //       const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });
});

@Component({
  template: `
    <figure nxFigure>
      <img alt="foo">
    </figure>
  `
})
class BasicImage extends ImageTest {
}

@Component({
  template: `
    <figure [nxFigure]="keyword">
      <img alt="foo">
    </figure>
  `
})
class FigureWithModifier extends ImageTest {
}
