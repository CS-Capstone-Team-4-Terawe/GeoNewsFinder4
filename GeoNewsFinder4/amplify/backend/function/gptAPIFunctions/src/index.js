// Import Axios
const axios = require('axios')


// Define the Lambda handler
exports.handler = async (event) => {
    // Access API Key from environment variables
    const API_KEY = process.env.OPENAI_API_KEY;

    // Assuming `event` contains the news article details
    const news_article = new NewsArticle(
        event.title,
        event.authors,
        event.date,
        event.content
    );

    // Call your function to summarize the article
    const summary = await summarizeArticle(news_article, API_KEY);

    // Return the summary
    return {
        statusCode: 200,
        body: JSON.stringify({ summary }),
    };
};

class NewsArticle {
    constructor(title, authors, date, content) {
        this.title = title;
        this.authors = authors;
        this.date = date;
        this.content = content;
    }
}

let user_name = "Ethan";

let conversation = [
    { role: "system", content: "You are a helpful assistant who specializes in summarizing news articles."}
];

let followUpStart = 
  { role: "system", content: `You are a helpful assistant who specializes in summarizing news articles and always starts an answer by referring to a user by their name, ${user_name}. You also are able to answer any questions I have about related topics to the article. You also refuse to answer questions unrelated to the topics or types of things mentioned in the article.`}
;

async function summarizeArticle(news_article, API_KEY) {
    conversation = [
        { role: "system", content: "You are a helpful assistant who specializes in summarizing news articles."}
    ];
    let initial_prompt = `I found this article called ${news_article.title} by ${news_article.authors} written on ${news_article.date}. It is a bit long and confusing, so if you could summarize it that would be great. \n This is the article: \n${news_article.content}`;
    let res = await ask(initial_prompt, API_KEY);
    conversation.push(followUpStart);
    console.log(res)
    return res;
}

async function ask(question, API_KEY) {
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
        }).catch((err) => { 
            console.error(err); 
            return { data: { choices: [{ message: { content: "API call error" } }] } };
        });

    const response = completion.data.choices[0].message.content;
    conversation.push({ role: "assistant", content: response });

    return response;
}
