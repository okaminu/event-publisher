import { PendingEvent } from './pending-event'

export class EventPublisher {

    private events: Array<PendingEvent> = new Array<PendingEvent>()

    notify(eventName: string, eventArgument?: any) {
        if (!this.doesEventExist(eventName))
            this.events[eventName] = new PendingEvent(true)
        else
            this.notifySubscribers(eventName, eventArgument)
        this.events[eventName].isPending = true
    }

    subscribe(eventName: string, subscriber: (argument?: any) => void) {
        if (!this.doesEventExist(eventName))
            this.events[eventName] = new PendingEvent(false)

        this.events[eventName].subscribers.push(subscriber)
    }

    subscribeAndExecuteIfPending(eventName: string, subscriber: (argument?: any) => void) {
        this.subscribe(eventName, subscriber)
        if (this.events[eventName].isPending)
            subscriber()
    }

    unsubscribe(eventName: string, subscriber: (argument?: any) => void) {
        this.events[eventName].subscribers = this.events[eventName].subscribers.filter((s) => s !== subscriber)
    }

    unsubscribeAll(...eventNames: string[]) {
        for (const eventName of eventNames)
            if (this.doesEventExist(eventName))
                delete this.events[eventName]
    }

    private doesEventExist(eventName: string): boolean {
        return this.events[eventName] !== undefined
    }

    private notifySubscribers(eventName: string, eventArgument?: any) {
        for (const subscriber of this.events[eventName].subscribers)
            subscriber(eventArgument)
    }

}