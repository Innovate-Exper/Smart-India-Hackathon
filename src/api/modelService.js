// src/api/modelService.js
import axios from 'axios';

const API_URL = 'http://your-api-url/predict'; // Replace with your API URL

export const getPrediction = async (features) => {
    try {
        const response = await axios.post(API_URL, { features });
        return response.data.prediction;
    } catch (error) {
        console.error('Error fetching prediction', error);
        throw error;
    }
};
