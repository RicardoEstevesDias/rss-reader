import express from "express";
import Parser from "rss-parser";


class FeedController {

  /**
* .
* 
* @param {express.Request} req - La requête HTTP entrante.
* @param {express.Response} res - La réponse HTTP sortante.
*/

  async index(req, res) {
    let parser = new Parser();
    (async () => {
      const rssURL = 'https://www.reddit.com/.rss';
      async function getFeed(){
        const response = await parser.parseURL(rssURL);
        return response;
      }
      const feed = await getFeed();
      return res.render('index', { title: 'Hey', message: 'Hello there!', feed:feed});
    })();
  }
}


export const feedController = new FeedController();