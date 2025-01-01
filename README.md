# Twitter-trends STIR. Assignment

[Youtube Video](https://youtu.be/C-5gH3p2FnM)

The Twitter Trending Scraper is an automated tool designed to log into Twitter, navigate to the trending section, and scrape the top trending topics. Using Selenium WebDriver for browser automation and Axios for API requests, it collects real-time IP information via a proxy and securely stores the scraped trends in a MongoDB database. Built with Node.js, the project emphasizes security by using environment variables for sensitive data. This tool is ideal for analyzing social media trends, supporting research, or tracking popular hashtags for marketing purposes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Additional Notes](#additional-notes)

---

### Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v18+)
- **MongoDB Compass** (v13+)
- ProxyMesh authentication fro rotating IP address
- **Git**

### Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/TanmaySawankar390/twitter-trends.git
   cd twitter-trends

2. **Install Dependencies**

   ```bash
   npm install
   npm install axios dotenv https-proxy-agent mongodb proxymesh selenium-webdriver twitter-api-v2 uuid 
   ```

3. **Environment Variables**
   Create a .env file in the root directory of your project and add the following environment variables:
   ```
   touch .env
   ```
   ```bash
   PROXY_URL="http://<username>:<password>@us-ca.proxymesh.com:31280"
   TWITTER_USERNAME="Username"
   TWITTER_PASSWORD='Password'
   MONGODB_URI="mongodb://127.0.0.1:27017/twitter_trends"

### Twitter Account Setup
1. Register your account on Twitter: (https://x.com/).
2. Note down your Username and Password and use that in .env for autentication purpose.
```
TWITTER_USERNAME="Username"
TWITTER_PASSWORD='Password'
```
### Setting up Proxymesh API endpoints
If you are new to Proxymesh read the documentation(https://docs.proxymesh.com/category/9-api).

Next Steps: 
1. Visit here: https://proxymesh.com/
2. Sign up for a free trial.
3. Create your account by filling all the details.
4. Note down the username and password you use to regsiter, it will be used in the proxymesh url in the env file.
```
PROXY_URL="http://<username>:<password>@us-ca.proxymesh.com:31280"
```
5. Confoirm your account by clicking on the activation  link sent on your mail id. (This may take up to few minutes wait until)
6. Login to your account successfully post activating the account through mail.
   
### DataBase Setup
If you are new to MongoDB Compass read the documentation(https://www.mongodb.com/try/download/community) for installing MongoDB Compass on local system.

Next Steps:
1. Download the MSI File for starting mongodb on your local system: ( https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.4-signed.msi ).
2. Install it on your device by clicking Next and accepting to setup it on your device.

### Running the Application

1. Start the Server:
```bash
node app.js
```
2. Testing the Server
   Open your browser or use a tool like Postman to test the server or reach live server at http://localhost:3000.

### Additional Notes
- Customize the `PORT` or database configurations in the `.env` file as needed.
- Note Twitter says: "If a user's profile is private, even if you personally follow this person and can access their profile, you can not scrape, share or use this data for any purposes.".
