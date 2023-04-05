import { homedir } from 'os';
import { join, basename, dirname, extname } from 'path';

const filePath = join(homedir(), 'weather-data.json') 

const saveKeyValue = (key, value) => {
}

export { saveKeyValue }