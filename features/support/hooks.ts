import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import * as dotenv from 'dotenv';
//import path from 'path';
dotenv.config();
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // 60 seconds

let browser: Browser;

Before(async function () {
  console.log(" Hook is running ");
  browser = await chromium.launch({ headless: false });
  this.page = await browser.newPage(); 
});

After(async function () {
  await this.page?.close();
  await browser?.close();
});