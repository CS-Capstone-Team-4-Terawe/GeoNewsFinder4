import axios from 'axios';
import JSDOM from 'jsdom';
const { Readability } = require('@mozilla/readability');

export async function getArticleContent(url) {
    const article = await axios.get(url).then(function(r1) {

        // At this point we will have some search results from the API. Take the first search result...
        let firstResult = r1.data.articles[0];
      
        // ...and download the HTML for it, again with axios
        axios.get(firstResult.url).then(function(r2) {
      
          // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
          let dom = new JSDOM(r2.data, {
            url: firstResult.url
          });
      
          // now pass the DOM document into readability to parse
          let article = new Readability(dom.window.document).parse();
      
          // Done! The article content is in the textContent property
          console.log(article.textContent);
        })
      }).catch((err) => { console.error(err); return "api call error"});

    return article;
}

export default getArticleContent;