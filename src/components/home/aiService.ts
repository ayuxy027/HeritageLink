import axios from 'axios';
import getAIPrompt from './aiPrompt';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const getAIResponse = async (userInput: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: getAIPrompt(userInput),
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = response.data as GeminiResponse;
    const firstCandidate = responseData.candidates[0];
    if (!firstCandidate) return 'No response received from AI.';
    const firstPart = firstCandidate.content.parts[0];
    if (!firstPart) return 'No response received from AI.';
    return firstPart.text;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error fetching response from API:', error);
    return "I apologize, but I'm unable to process that request at the moment. How else can I assist you with HeritageLink's services or provide information about our exhibits and Indian cultural heritage?";
  }
};
