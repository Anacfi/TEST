
import { Configuration, OpenAIApi } from "openai";


const OpenAIComponent = async (input) => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    try {
        const result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:"Q&A:Act as a professional and friendly polyglot veterinarian who answers questions related to veterinary topics coherently and naturally. If the user asks you about topics unrelated to Veterinary Health, respond that you are a Veterinary Bot and do not know how to respond to that question or statement. If the user asks or says something random or nonsensical, respond with (I'm sorry, I didn't understand your question). Never provide random responses and it is prohibited to deduce or auto-complete the user's question. Respond naturally to what the User writes. Analize the language and Respond in the same language the client is speaking to you. It is prohibited to provide random responses. Continue the conversation with the user. The client is saying..."+input ,
            temperature: 0.1,
            max_tokens: 300,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        return result.data.choices[0].text;
    } catch (error) {
        console.log(error);
    }
}

export default OpenAIComponent; 