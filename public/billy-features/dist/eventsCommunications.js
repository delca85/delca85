"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listeners = new Map();
const handleMessage = (e) => {
    const eventName = e.data.name;
    const handlers = listeners.get(eventName) || [];
    handlers.forEach((handler) => handler(e.data.payload));
};
exports.addListener = (eventName, handler) => {
    const handlers = listeners.get(eventName) || [];
    if (!handlers.length) {
        window.addEventListener('message', handleMessage);
    }
    listeners.set(eventName, [...handlers, handler]);
};
exports.removeListener = (eventName, handler) => {
    var _a;
    const actualListeners = listeners.get(eventName) || [];
    listeners.set(eventName, actualListeners.filter(handlerEvent => handlerEvent !== handler));
    if (!((_a = listeners.get(eventName)) === null || _a === void 0 ? void 0 : _a.length)) {
        window.removeEventListener('message', handleMessage);
    }
};
exports.sendEvent = (eventName, eventData) => {
    const event = { name: eventName, payload: eventData };
    if (isIframe()) {
        // const frame = (window as unknown as HTMLFrameElement).contentWindow;
        window.parent.postMessage(event, window.location.origin);
    }
    else {
        const frames = window.frames;
        window.postMessage(event, window.origin);
        for (let i = 0; i < frames.length; i++) {
            frames[i].postMessage(event, window.origin);
        }
    }
};
const isIframe = () => window.location !== window.parent.location;
//# sourceMappingURL=eventsCommunications.js.map