#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
	if(!token.length) {
		printError('No token provided!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	}
	catch(e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if(!city.length) {
		printError('No city provided!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	}
	catch(e) {
		printError(e.message);
	}
}

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
		
		const weather = await getWeather(city);
		
		printWeather(weather, getIcon(weather.weather[0].icon));
	}
	catch(e) {
		if(e?.response?.status === 404) {
			printError('Not valid city!');
		}
		else if(e?.response?.status === 401) {
			printError('Not valid token!');
		}
		else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	
	if(args.h) {
		return printHelp()
	}
	if(args.s) {
		return saveCity(args.s);
	}
	if(args.t) {
		return saveToken(args.t);
	}
	
	return getForecast();
};

initCLI();