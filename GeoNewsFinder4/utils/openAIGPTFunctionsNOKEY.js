import OpenAI from "openai";

// const openai = new OpenAI();
// const openai = new OpenAI({ apiKey: 'api key goes here' });
// const openai = new OpenAI(process.env.OPENAI_API_KEY);

export class NewsArticle {
    constructor(title, authors, date, content) {
        this.title = title;
        this.authors = authors;
        this.date = date;
        this.content = content;
    }
}

let user_name = "Ethan"

let conversation = [
    { role: "system", content: "You are a helpful assistant who specializes in news summaries and always starts a conversation by refering to a user by their name, " + user_name + ". You also are able to answer any questions I have about related topics to the article. You also absolutely refuse to answer any questions unrelated to the topics mentioned in the article."}
];

export async function summarize(news_article) {
    let initial_prompt = "I found this article called " + news_article.title + " by " + news_article.authors + " written on " + news_article.date + "." + "It is a bit long and confusing, so if you could summarize it that would be great. \n This is the article: \n" + news_article.content;
    // console.log("SUMARIZE 1")
    // console.log(news_article.title);
    let res = await ask(initial_prompt);
    // console.log("SUMARIZE 2")
    // console.log("sumarize"+ res.message.content)
    return res;
}

export async function ask(question) {
    conversation.push({ role: "user", content: question });
    const completion = await openai.chat.completions.create({
        messages: conversation,
        model: "gpt-4",
    });

    const response = await completion.choices[0];
    conversation.push({ role: "assistant", content: response.message.content });

    // console.log(response.message.content);
    return response;
}

