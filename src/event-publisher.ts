import { PendingEvent } from './pending-event'

export class EventPublisher {

    private events: Array<PendingEvent> = new Array<PendingEvent>()

    subscribe(eventName: string, subscriber: (argument?: any) => void) {
        if (!this.doesEventExist(eventName))
            this.events[eventName] = new PendingEvent(false)

        this.events[eventName].subscribers.push(subscriber)
        if (this.events[eventName].isPending)
            subscriber()
    }

    subscribeMultipleNames(eventNames: string[], subscriber: (argument?: any) => void) {
        for (const eventName of eventNames)
            this.subscribe(eventName, subscriber)
    }

    notify(eventName: string, eventArgument?: any) {
        if (!this.doesEventExist(eventName))
            this.events[eventName] = new PendingEvent(true)
        else
            this.notifySubscribers(eventName, eventArgument)
        this.events[eventName].isPending = true
    }

    unsubscribe(eventName: string) {
        if (this.doesEventExist(eventName))
            delete this.events[eventName]
    }

    unsubscribeMultipleNames(eventNames: string[]) {
        for (const eventName of eventNames)
            this.unsubscribe(eventName)
    }

    private doesEventExist(eventName: string): boolean {
        return this.events[eventName] !== undefined
    }

    private notifySubscribers(eventName: string, eventArgument?: any) {
        for (const subscriber of this.events[eventName].subscribers)
            subscriber(eventArgument)
    }
}
