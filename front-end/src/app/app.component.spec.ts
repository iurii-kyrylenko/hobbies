import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('App', () => {
  beforeEachProviders(() => [
    AppComponent
  ]);
  it ('should work', inject([AppComponent], (app: AppComponent) => {
    // Add real test here
    expect(42).toBe(42);
  }));
});
