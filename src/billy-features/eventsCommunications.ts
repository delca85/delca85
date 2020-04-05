import { IDataHandler } from "./types";

const listeners: Map<string, IDataHandler[]> = new Map();

const handleMessage = (e: MessageEvent) => {
  const eventName = e.data.name;
  const handlers = listeners.get(eventName) || [];
  handlers.forEach((handler: IDataHandler) => handler(e.data.payload));
}

export const addListener = (
  eventName: string,
  handler: IDataHandler,
) => {
  const handlers = listeners.get(eventName) || [];
  if (!handlers.length) {
    window.addEventListener('message', handleMessage);  
  }
  listeners.set(eventName, [...handlers, handler]);
};

export const removeListener = (
  eventName: string,
  handler: IDataHandler
) => {
  const actualListeners = listeners.get(eventName) || [];
  listeners.set(eventName, actualListeners.filter(handlerEvent => handlerEvent !== handler));
  if (!listeners.get(eventName)?.length) {
    window.removeEventListener('message', handleMessage);
  }
}

export const sendEvent = (eventName: string, eventData: any) => {
  const event = { name: eventName, payload: eventData };
  if (isIframe()) {
    // const frame = (window as unknown as HTMLFrameElement).contentWindow;
    window.parent.postMessage(event, window.location.origin);
  } else {
    const frames = window.frames;
    window.postMessage(event, window.origin);
    for (let i = 0; i < frames.length; i++) {
      frames[i].postMessage(event, window.origin);
    }   
  }
};

const isIframe = () => window.location !== window.parent.location;