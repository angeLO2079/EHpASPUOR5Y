// 代码生成时间: 2025-10-20 05:54:44
 * Usage:
 *   - Install dependencies using npm install
 *   - Run the script using ts-node web_content_scraper.ts
 */

import axios from 'axios';
import cheerio from 'cheerio';

// Define a type for the scraping result
interface ScrapeResult {
  url: string;
  title: string;
  content: string;
}

// Define a function to scrape content from a given URL
async function scrapeWebContent(url: string): Promise<ScrapeResult> {
  try {
    // Fetch the HTML content of the web page
    const response = await axios.get(url);
    if (!response || !response.data) {
      throw new Error('Failed to fetch page content');
    }

    // Use cheerio to parse the HTML and extract the title and content
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    const content = $('body').html();

    // Return the scraping result
    return {
      url,
      title,
      content,
    };
  } catch (error) {
    // Handle errors and return a message
    console.error('Error scraping web content:', error.message);
    throw error;
  }
}

// Example usage of the scrapeWebContent function
(async () => {
  const url = 'https://example.com';
  try {
    const result = await scrapeWebContent(url);
    console.log('Scraped data:', result);
  } catch (error) {
    console.error('Failed to scrape web content:', error.message);
  }
})();