import { extract } from '@extractus/article-extractor';

const getAPIdata = async (hotspotId, setData) => {
    const topic = hotspotId || 'Apple';
    const searchIn = 'description';   // parameters: title, description, content
    const domains = '';               // example: bbc.co.uk,techcrunch.com
    const excludeDomains = '';
    const fromDate = '2023-12-27';    // format: YYYY-MM-DD
    const toDate = '';                // format: YYYY-MM-DD
    const language = '';              // example: ar, de, en, es, fr
    const sortBy = 'popularity';      // parameters: relevancy, popularity, publishedAt
    const newsURL = 'https://newsapi.org/v2/everything?' +
    `q=${topic}&` +
    `searchIn=${searchIn}&` +
    `domains=${domains}&` +
    `excludeDomains=${excludeDomains}&` +
    `from=${fromDate}&` +
    `to=${toDate}&` +
    `language=${language}&` +
    `sortBy=${sortBy}&` +
    'pageSize=10&' +
    'apiKey=e9c4617558cd4256a90396d505f17666';

    console.log(newsURL)

    let result = await fetch(newsURL);
    result = await result.json();
    setData(result.articles);


    const input = 'https://www.cnet.com/tech/services-and-software/texans-vs-colts-livestream-how-to-watch-nfl-week-18-online-today/'

    // here we use top-level await, assume current platform supports it
    try {
        const article = await extract(input)
        console.log(article)
    } catch (err) {
        console.error(err)
    }
}

export default getAPIdata;