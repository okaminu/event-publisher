import { Injectable } from '@angular/core'

@Injectable()
export class EventPublisher {

    private subscribers = []

    subscribe(eventName: string, subscriber: any) {
        if (!this.doesEventExist(eventName))
            this.subscribers[eventName] = {callbacks: [], isNotifyPending: false}

        this.subscribers[eventName].callbacks.push(subscriber)
        if (this.subscribers[eventName].isNotifyPending)
            subscriber()
    }

    subscribeMultipleNames(eventNames: string[], subscriber: any) {
        for (const eventName of eventNames)
            this.subscribe(eventName, subscriber)
    }

    notify(eventName: string, eventArgument?: any) {
        if (!this.doesEventExist(eventName))
            this.subscribers[eventName] = {callbacks: [], isNotifyPending: true}
        else
            this.notifyObservers(eventName, eventArgument)
        this.subscribers[eventName].isNotifyPending = true
    }

    unsubscribe(eventName: string) {
        if (this.doesEventExist(eventName))
            delete this.subscribers[eventName]
    }

    unsubscribeMultipleNames(eventNames: string[]) {
        for (const eventName of eventNames)
            this.unsubscribe(eventName)
    }

    private doesEventExist(eventName: string): boolean {
        return this.subscribers[eventName] !== undefined
    }

    private notifyObservers(eventName: string, eventArgument?: any) {
        for (const callback of this.subscribers[eventName].callbacks)
            callback(eventArgument)
    }
}