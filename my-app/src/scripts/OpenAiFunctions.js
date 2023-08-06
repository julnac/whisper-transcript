const { Configuration, OpenAIApi } = require("openai");
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

export const getTranscriptionFromOpenAI = async (file, apiKey) => {

    const configuration = new Configuration({
        apiKey,
        formDataCtor: CustomFormData
    });

    const openai = new OpenAIApi(configuration);

    return await openai.createTranscription(
        file,
        "whisper-1",
        null,
        "srt"
    );
}
