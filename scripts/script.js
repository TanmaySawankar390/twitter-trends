// Import required modules
require('dotenv').config();
const { Builder, By, until, Key } = require('selenium-webdriver');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { v4: uuidv4 } = require('uuid');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/lib/proxy');

// Configuration from environment variables
const config = {
  proxy: process.env.PROXY_URL,
  twitter: {
    username: process.env.TWITTER_USERNAME,
    password: process.env.TWITTER_PASSWORD
  },
  mongodb: process.env.MONGODB_URI
};

async function loginToTwitter(driver) {
  await driver.get('https://twitter.com/i/flow/login');
  await driver.sleep(3000);

  const usernameField = await driver.wait(
    until.elementLocated(By.css('input[autocomplete="username"]')),
    15000
  );
  await usernameField.clear();
  await usernameField.sendKeys(config.twitter.username);
  await usernameField.sendKeys(Key.RETURN);
  await driver.sleep(2000);

  const passwordField = await driver.wait(
    until.elementLocated(By.css('input[type="password"]')),
    15000
  );
  await passwordField.sendKeys(config.twitter.password);
  // console.log(config.twitter.password)
  await passwordField.sendKeys(Key.RETURN);
  await driver.sleep(5000);
}

async function scrapeTwitterTrending() {
  let driver;
  let client;

  try {
    const proxyOptions = {
      http: config.proxy,
      https: config.proxy,
    };

    const options = new chrome.Options();
    options.setProxy(proxy.manual(proxyOptions));

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await loginToTwitter(driver);
    await driver.get('https://x.com/explore/tabs/trending');
    await driver.sleep(5000);

    const trendingItems = await driver.findElements(
      By.xpath('//span[contains(@class, "css-1jxf684") and contains(text(), "#")]')
    );

    const trendingTopics = [];
    for (let i = 0; i < 5 && i < trendingItems.length; i++) {
      const item = trendingItems[i];
      const topic = await item.getText();
      trendingTopics.push(topic);
    }

    const proxyAgent = new HttpsProxyAgent(config.proxy);

    const { data: { ip: ipAddress } } = await axios.get('https://api.ipify.org?format=json', {
      httpsAgent: proxyAgent,
    });

    client = await MongoClient.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const record = {
      _id: uuidv4(),
      trends: trendingTopics,
      dateTime: new Date().toISOString(),
      ipAddress,
    };

    await client.db().collection('trends').insertOne(record);

    return record;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  } finally {
    if (driver) await driver.quit();
    if (client) await client.close();
  }
}

module.exports = scrapeTwitterTrending;