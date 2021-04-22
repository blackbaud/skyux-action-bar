import { expect, SkyHostBrowser, SkyVisualThemeSelector } from '@skyux-sdk/e2e';
import { SkyHostBrowserBreakpoint } from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import { by, element } from 'protractor';

describe('Summary Action Bar', () => {
  let browserSize: SkyHostBrowserBreakpoint;
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  async function setBrowserSize(size: SkyHostBrowserBreakpoint): Promise<void> {
    browserSize = size;

    return SkyHostBrowser.setWindowBreakpoint(size);
  }

  function getScreenshotName(name: string): string {
    if (browserSize) {
      name += '-' + browserSize;
    }

    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  // LG and XS
  function runBasicTest(): void {
    it('should match previous summary action bar screenshot', async (done) => {
      expect('.sky-summary-action-bar').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('summary-action-bar')
      });
    });
  }

  // LG and XS
  function runModalTest(): void {
    it('should match previous summary action bar modal screenshot', async (done) => {
      await element(by.css('#modal-trigger')).click();
      expect('.sky-modal').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('summary-action-bar-modal')
      });
    });
  }

  // LG and XS
  function runFullModalTest(): void {
    it('should match previous summary action bar full screen modal screenshot', async (done) => {
      await element(by.css('#full-modal-trigger')).click();
      expect('.sky-modal').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('summary-action-bar-full-modal')
      });
    });
  }

  // XS ONLY
  function runCollapsedBarTest(): void {
    it('should match previous collapsed summary action bar screenshot', async (done) => {
      await element(by.css('#summary-action-bar .sky-chevron')).click();
      expect('.sky-summary-action-bar').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('summary-action-bar-collapsed')
      });
    });
  }

  // XS ONLY
  function runCollapsedBarModalTest(): void {
    it('should match previous collapsed summary action bar modal screenshot', async (done) => {
      await element(by.css('#modal-trigger')).click();
      await element(
        by.css(
          '.sky-modal .sky-summary-action-bar-details-collapse .sky-chevron'
        )
      ).click();
      expect('.sky-modal').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('summary-action-bar-modal-collapsed')
      });
    });
  }

  // XS ONLY
  function runCollapsedBarFullModalTest(): void {
    it('should match previous collapsed summary action bar full screen modal screenshot', async (done) => {
      await element(by.css('#full-modal-trigger')).click();
      await element(
        by.css(
          '.sky-modal .sky-summary-action-bar-details-collapse .sky-chevron'
        )
      ).click();
      expect('.sky-modal').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName(
          'summary-action-bar-full-modal-collapsed'
        )
      });
    });
  }

  describe('(size: lg)', () => {
    beforeEach(async () => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/summary-action-bar');
      await setBrowserSize('lg');
    });

    runBasicTest();
    runModalTest();
    runFullModalTest();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runBasicTest();
      runModalTest();
      runFullModalTest();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runBasicTest();
      runModalTest();
      runFullModalTest();
    });
  });

  describe('(size: xs)', () => {
    beforeEach(async () => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/summary-action-bar');
      await setBrowserSize('xs');
    });

    runBasicTest();
    runModalTest();
    runFullModalTest();
    runCollapsedBarTest();
    runCollapsedBarModalTest();
    runCollapsedBarFullModalTest();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runBasicTest();
      runModalTest();
      runFullModalTest();
      runCollapsedBarTest();
      runCollapsedBarModalTest();
      runCollapsedBarFullModalTest();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runBasicTest();
      runModalTest();
      runFullModalTest();
      runCollapsedBarTest();
      runCollapsedBarModalTest();
      runCollapsedBarFullModalTest();
    });
  });
});
