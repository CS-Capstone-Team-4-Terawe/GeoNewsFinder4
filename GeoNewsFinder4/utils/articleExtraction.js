import axios from 'axios';

export async function getArticleContent(url) {
    try {
        const response = await axios.get(url);
        console.log("HERE")
        console.log(url)
        console.log("BYE")
        const articles = response.data.articles;

        if (articles && articles.length > 0) {
            const firstArticleUrl = articles[0].url;
            const articleResponse = await axios.get(firstArticleUrl);

            let textContent = articleResponse.data;
            textContent = textContent.replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, '');
            textContent = textContent.replace(/<style[^>]*>([\S\s]*?)<\/style>/gi, '');
            textContent = textContent.replace(/<\/?[^>]+(>|$)/g, '');
            textContent = textContent.replace(/\s+/g, ' ').trim();
            console.log(textContent);
            return textContent;
        }
    } catch (err) {
        console.error(err);
        return "API call error";
    }
}

export default getArticleContent;