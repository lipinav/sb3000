import { pickFromSynteticEvent } from './pickFromSynteticEvent';

export const getValue = pickFromSynteticEvent<HTMLInputElement>()('value');
