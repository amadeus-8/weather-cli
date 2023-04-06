import axios from 'axios';
// import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	
	if(!token) {
		throw new Error('No api key set, set it with comman -t [API_KEY]')
	}
	
	const { data } = await axios.get(API_URL, {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});
	
	console.log(data);
	
	return data;
};

export {
	getWeather
}