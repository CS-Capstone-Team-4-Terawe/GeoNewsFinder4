import axios from 'axios'
const API_KEY = 'INSERT API KEY HERE'

export class NewsArticle {
    constructor(title, authors, date, content) {
        this.title = title;
        this.authors = authors;
        this.date = date;
        this.content = content;
    }
}

let user_name = "Matthew Nguyen"

let conversation = [
    { role: "system", content: "You are a helpful assistant who specializes in news summaries and always starts a conversation by refering to a user by their name, " + user_name + ". You also are able to answer any questions I have about related topics to the article. You also absolutely refuse to answer any questions unrelated to the topics or types of things mentioned in the article."}
];

export async function summarizeArticle(news_article) {
    let initial_prompt = "I found this article called " + news_article.title + " by " + news_article.authors + " written on " + news_article.date + "." + "It is a bit long and confusing, so if you could summarize it that would be great. \n This is the article: \n" + news_article.content;
    let res = await ask(initial_prompt);
    return res;
}

export async function ask(question) {
    conversation.push({ role: "user", content: question });
    const completion = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
        messages: conversation,
        max_tokens: 500,
        model: "gpt-3.5-turbo-1106",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }).catch((err) => { console.error(err); return "api call error"});;

    const response = await completion.data.choices[0].message.content;
    conversation.push({ role: "assistant", content: response });

    return response;
}