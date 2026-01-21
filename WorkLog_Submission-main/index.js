const puppeteer = require('puppeteer');

// This file now runs the form fill once and exits. Use a system scheduler
// (Windows Task Scheduler) or a cloud scheduler (GitHub Actions) to run it
// at 20:00–21:00 local time. Set environment variable HEADLESS=true to run
// without opening a browser window (recommended for schedulers/CI).

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function doFill() {
  console.log(new Date().toISOString(), 'Starting form fill');
  const headless = process.env.HEADLESS === 'true' || false;
  const launchOptions = { headless };
  // On CI runners (GitHub Actions) the Chromium sandbox is not usable.
  // Add these flags when running headless or on CI to avoid sandbox launch failures.
  if (process.env.CI === 'true' || headless) {
    launchOptions.args = ['--no-sandbox', '--disable-setuid-sandbox'];
  }
  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();
    await page.goto('https://forms.zohopublic.in/Kalvium/form/Signup/formperma/GeJFMLBDfoWlIJfhI46Qyx0Dlf3kHhMSRsvMItq_Riw');

    await page.keyboard.press('Tab');
    await page.keyboard.type('moulyaa.mohan.s67@kalvium.community');

    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.keyboard.press('Tab');

    function formatDate(date) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const d = date.getDate().toString().padStart(2, '0');
      const m = months[date.getMonth()];
      const y = date.getFullYear();
      return `${d}-${m}-${y}`;
    }

    await page.keyboard.type(formatDate(new Date()));
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.press('Space');
    await new Promise(resolve => setTimeout(resolve, 2000));

    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('ArrowDown');
    }

    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('completing all the given tasks for the day');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.waitForSelector('a[elname="sliderPointLast"]', { visible: true });
    const sliderLastPoint = await page.$('a[elname="sliderPointLast"]');
    const boundingBox = await sliderLastPoint.boundingBox();

    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2,
      boundingBox.y + boundingBox.height / 2
    );
    await page.mouse.down();
    await page.mouse.up();

    await new Promise(resolve => setTimeout(resolve, 2000));

    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.waitForSelector('#sld-Slider2 a[elname="sliderPointLast"]', { visible: true, timeout: 25000 });
    const sliderLast2 = await page.$('#sld-Slider2 a[elname="sliderPointLast"]');
    const bounding2 = await sliderLast2.boundingBox();

    await page.mouse.move(
      bounding2.x + bounding2.width / 2,
      bounding2.y + bounding2.height / 2
    );
    await page.mouse.down();
    await page.mouse.up();

    await new Promise(resolve => setTimeout(resolve, 2000));
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(new Date().toISOString(), 'Form fill finished');
  } catch (err) {
    console.error(new Date().toISOString(), 'Error during form fill:', err);
  } finally {
    await browser.close();
  }
}

// Run once and exit. Suitable for Task Scheduler or CI.
doFill()
  .then(() => {
    console.log(new Date().toISOString(), 'Done');
    process.exit(0);
  })
  .catch(err => {
    console.error(new Date().toISOString(), 'Fatal error:', err);
    process.exit(1);
  });

