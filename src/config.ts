import type { TConfig } from './types/TConfig';
// import { dotenv } from 'dotenv';
// dotenv.config();
// require('dotenv').config();
import 'dotenv/config';

const botConfig: TConfig = {
    token: process.env.BOT_TOKEN
};

export default botConfig;
