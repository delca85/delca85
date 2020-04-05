import { IDataHandler } from "./types";
export declare const addListener: (eventName: string, handler: IDataHandler) => void;
export declare const removeListener: (eventName: string, handler: IDataHandler) => void;
export declare const sendEvent: (eventName: string, eventData: any) => void;
