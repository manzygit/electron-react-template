import { contextBridge, ipcRenderer } from "electron";

export type InvokeType = string;

interface ElectronAPIInterface {
    invoke<T extends string>(event: InvokeConfig<T>, callback: OnInvokeCallback): void;
    removeListener(eventType: InvokeType, callback: OnInvokeCallback): void;
    removeAllListeners(eventType: InvokeType): void;
}

type TriggerType = "once" | "always";

interface InvokeConfig<T extends string> {
    command: T;
    triggerType?: TriggerType;
    args?: any[];
}

interface OnInvokeCallback {
    (...args: any[]): void;
}

interface InvokeEvent {
    config: InvokeConfig<string>;
    callback: OnInvokeCallback;
}

const eventTracker: Map<InvokeType, InvokeEvent[]> = new Map();

export const ElectronAPI: ElectronAPIInterface = {
    invoke: function <T extends string>(config: InvokeConfig<T>, callback: OnInvokeCallback): void {
        const args: any[] = config.args ?? [];
        const triggerType: TriggerType = config.triggerType ?? "once";

        if(eventTracker.has(config.command)){
            eventTracker.get(config.command).push({
                config: { ...config, triggerType }, callback
            });
        } else {
            eventTracker.set(config.command, [{
                config: { ...config, triggerType }, callback
            }]);

            ipcRenderer.on(config.command, function(_, ...args){
                const eventsArray: InvokeEvent[] = eventTracker.get(config.command);
                eventsArray.forEach(function(event){
                    event.callback(...args);
                });

                const remainingEvents: InvokeEvent[] = eventsArray.filter(function(event){
                    return event.config.triggerType !== "once";
                });

                if(remainingEvents.length === 0){
                    eventTracker.delete(config.command);
                    ipcRenderer.removeAllListeners(config.command);
                } else {
                    eventTracker.set(config.command, remainingEvents);
                }
            });
        }
        ipcRenderer.send(config.command, ...args);
    },
    removeListener: function(eventType, callback): void {
        if(eventTracker.has(eventType)){
            const eventsArray: InvokeEvent[] = eventTracker.get(eventType);
            const filteredArray: InvokeEvent[] = eventsArray.filter(function(event){
                return callback !== event.callback;
            });

            if(filteredArray.length === 0){
                eventTracker.delete(eventType);
                ipcRenderer.removeAllListeners(eventType);
            } else {
                eventTracker.set(eventType, filteredArray);
            }
        }
    },
    removeAllListeners: function(eventType): void {
        if(eventTracker.has(eventType)){
            eventTracker.delete(eventType);
            ipcRenderer.removeAllListeners(eventType);
        }
    }
}

contextBridge.exposeInMainWorld("electronAPI", ElectronAPI);