import { EventPublisher } from './event-publisher'

describe('EventPublisher service', () => {

    let eventPublisher: EventPublisher
    let spyNewsSubscriber: (argument?: any) => void

    beforeEach(() => {
        eventPublisher = new EventPublisher()
        spyNewsSubscriber = jasmine.createSpy()
    })

    it('upon notification execute registered subscriber', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('upon registration the subscriber should be executed if notification came earlier', () => {
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')

        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('after execution on subscription, following notifications should also execute', () => {
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(2)
    })

    describe('Multiple subscriptions and unsubscriptions', () => {
        let spySmsSubscriber: (argument?: any) => void

        beforeEach(() => {
            spySmsSubscriber = jasmine.createSpy()
        })

        it('upon multiple registrations the multiple subscribers are notified', () => {
            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('petDog', spySmsSubscriber)

            eventPublisher.notify('petDog')

            expect(spyNewsSubscriber).toHaveBeenCalled()
            expect(spySmsSubscriber).toHaveBeenCalled()
        })

        it('upon multiple registrations the subscriber should be executed if notification came earlier', () => {
            eventPublisher.notify('petDog')
            expect(spySmsSubscriber).not.toHaveBeenCalled()

            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('petDog', spySmsSubscriber)
            expect(spyNewsSubscriber).toHaveBeenCalled()
            expect(spySmsSubscriber).toHaveBeenCalled()
        })

        it('unsubscription for multiple events', () => {
            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('giveCatSomeFish', spySmsSubscriber)
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
            expect(spySmsSubscriber).toHaveBeenCalledTimes(1)


            eventPublisher.unsubscribeAll('petDog', 'giveCatSomeFish')
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
            expect(spySmsSubscriber).toHaveBeenCalledTimes(1)
        })

        it('unsubscribes single subscriber for same event', () => {
            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('petDog', spySmsSubscriber)
            eventPublisher.unsubscribe('petDog', spySmsSubscriber)

            eventPublisher.notify('petDog')

            expect(spyNewsSubscriber).toHaveBeenCalled()
            expect(spySmsSubscriber).not.toHaveBeenCalled()
        })
    })

    it('upon notification execute registered subscriber for different events', () => {
        eventPublisher.subscribeMultipleNames(['petDog', 'giveCatSomeFish'], spyNewsSubscriber)
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.notify('petDog')
        eventPublisher.notify('giveCatSomeFish')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(2)
    })

    it('unsubscription should work', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)

        eventPublisher.unsubscribeAll('petDog')
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
    })

    it('unsubscribe does nothing when unsubscribing non-existent subscriber', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)

        eventPublisher.unsubscribeAll('undefinedSubscriber')
        eventPublisher.notify('petDog')

        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('upon notification execute subscriber with parameter', () => {
        const eventArgument = 'argument'
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog', eventArgument)
        expect(spyNewsSubscriber).toHaveBeenCalledWith(eventArgument)
    })
})
