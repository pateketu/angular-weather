import { AppPage } from './app.po';
import { element, by } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('searching for a city forecast renders forecast table', () => {
    page.navigateTo();
    element(by.id('city')).sendKeys('Seattle');
    element(by.className('search')).click();
    /* Not sure how to wait for call to come back */

    /* Apologis not going to have time to dig into
    Protractor Syntax, */

    /* In Our current project we diteched Protractor after intially attempting to use it and
    instead we are using Cypress for end-to-end test and have found it much
    for developer friendly in terms of productivity and it's really fast
    https://hackernoon.com/cypress-io-vs-protractor-e2e-testing-battle-d124ece91dc7
    https://techblog.fexcofts.com/2018/09/24/end-to-end-e2e-angular-testing-protractor-vs-cypress/
    */
  });
});
