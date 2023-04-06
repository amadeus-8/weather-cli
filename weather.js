#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

const initCLI = () => {
	const args = getArgs(process.argv);
	console.log(process.env);
	
	if(args.h) {
		printHelp()
	}
	if(args.s) {
		
	}
	if(args.t) {
		return saveToken(args.t);
	}
	getWeather('almaty');
};

initCLI();