import { Configuration, OpenAIApi } from "openai";

const OpenAIComponentCards = async (allQuestions) => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    try {
        const result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Que opinas de esto: " + allQuestions,
            temperature: 0,
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

export default OpenAIComponentCards; 