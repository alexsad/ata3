export declare enum EEventEmitterStatus {
    CANCELED = 0,
}
export interface IEventSubscribe {
    ref: string;
}
export interface IEventEmitterError {
    error: string;
    status: EEventEmitterStatus;
}
export interface IEventEmitter {
    done(p_onSuccess: Function, p_onError?: (err: IEventEmitterError) => any): void;
}
export declare class EventEmitter<T> {
    private _events;
    private _next_iterator;
    private _cancel_next;
    constructor();
    emit(value: T): IEventEmitter;
    private next(value);
    subscribe(p_callback: (value: T) => any): IEventSubscribe;
    hasSubscribers(): boolean;
    clearSubscribers(): void;
    cancel(): void;
    unsubscribe(subscribe: IEventSubscribe): void;
}
