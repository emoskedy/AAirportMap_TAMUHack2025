import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const API_URL = 'https://api.openai.com/v1/chat/completions';

interface FlightInfo {
    flightID: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    gate: string;
    terminal: string;
    arrivalGate: string;
    arrivalTerminal: string;
    baggageClaim: string;
    aircraftType: string;
    status: string;
    flightClass: string;
}

interface UserData {
    citizenship: string;
    flightInfo: FlightInfo;
    dateOfBirth?: string;
    gender?: string;
    religion?: string;
}

export const fetchRecommendations = async (userData: UserData): Promise<{ label: string; query: string }[]> => {
    const userAge = userData.dateOfBirth
      ? new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear()
      : 'Unknown';
  
    const isEconomyClass = userData.flightInfo?.flightClass === 'Economy';
    const isYoung = userAge !== 'Unknown' && userAge < 30;
  
    const prompt = `
      Generate up to 5 concise, actionable airport recommendations for the following user:
      - Citizenship: ${userData.citizenship}
      - Flight Class: ${userData.flightInfo?.flightClass || 'Not specified'}
      - Departure: ${userData.flightInfo?.origin}, Terminal ${userData.flightInfo?.terminal || 'Not specified'}, Gate ${userData.flightInfo?.gate || 'Not specified'}
      - Destination: ${userData.flightInfo?.destination}
      - Status: ${userData.flightInfo?.status || 'On Time'}

      Return the recommendations in the following JSON format:
      [
        { "label": "User-friendly label for display", "query": "Short Google Maps search query including the airport name" }
      ]
    `;
  
    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant providing airport navigation and services recommendations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
  
      const suggestions = JSON.parse(response.data.choices[0].message.content);
  
      // Ensure "Navigate to Gate" is included
      if (!suggestions.some((rec: { label: string }) => rec.label.toLowerCase().includes('navigate to gate'))) {
        suggestions.unshift({
          label: 'Navigate to your gate (e.g., Gate B11)',
          query: `Gate ${userData.flightInfo?.gate || 'unknown'}, ${userData.flightInfo?.origin || 'airport'}`,
        });
      }
  
      return suggestions.slice(0, 5);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [
        { label: 'Navigate to your gate (e.g., Gate B11)', query: `Gate ${userData.flightInfo?.gate || 'unknown'}, ${userData.flightInfo?.origin || 'airport'}` },
        { label: 'Error fetching recommendations. Please try again later.', query: '' },
      ];
    }
  };
  