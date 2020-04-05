export interface IEvent {
    name: string;
    payload: any;
}
export declare enum EventType {
    AccessToken = "ACCESS_TOKEN"
}
export interface IToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
}
export interface IMessageEventHandler {
    (event: MessageEvent): any;
}
export interface IDataHandler {
    (payload: any): any;
}
export interface IListeners {
    eventName: IDataHandler;
}
