import axios from 'axios';
import getAIPrompt from './aiPrompt';

const API_KEY = 'AIzaSyCPOQB5cv8R1ucsx6Y7xhdTJNbzqVdqNfI';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export const getAIResponse = async (userInput) => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: getAIPrompt(userInput)
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching response from API:', error);
    return "I apologize, but I'm unable to process that request at the moment. How else can I assist you with HeritageLink's services or provide information about our exhibits and Indian cultural heritage?";
  }
};