import { pickFromSynteticEvent } from './pickFromSynteticEvent';

export const getChecked = pickFromSynteticEvent<HTMLInputElement>()('checked');
