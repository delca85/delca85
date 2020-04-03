import { IDataHandler } from "./types";

const listeners = {};

const handleMessage = (e: MessageEvent) => {
  const eventName = e.data.eventName;
  const handlers = listeners[eventName] || [];
  handlers.forEach(handler => handler(e.data.payload));
}

export const addListener = (
  eventName: string,
  handler: IDataHandler,
) => {
  const handlers = listeners[eventName] || [];
  if (!handlers.length) {
    window.addEventListener('message', handleMessage);  
  }
  listeners[eventName] = [...handlers, handler];
};

export const removeListener = (
  eventName: string,
  handler: IDataHandler
) => {
  listeners[eventName] = listeners[eventName].filter(handlerEvent => handlerEvent !== handler);
  if (!listeners[eventName].length) {
    window.removeEventListener('message', handleMessage);
  }
}

export const sendEvent = (eventName: string, eventData) => {
  const event = { name: eventName, payload: eventData };
  if (isIframe()) {
    const frame = (window as unknown as HTMLFrameElement).contentWindow;
    window.parent.postMessage(event, frame.location.origin);
  } else {
    const frames = window.frames;
    window.postMessage(event, window.origin);
    for (let i = 0; i < frames.length; i++) {
      frames[i].postMessage(event, window.origin);
    }   
  }
};

const isIframe = () => window.location !== window.parent.location;