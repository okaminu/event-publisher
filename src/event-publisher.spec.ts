import { EventPublisher } from './event-publisher'

describe('eventPublisher service:', () => {

    let eventPublisher: EventPublisher
    let spyNewsSubscriber: (argument?: any) => void

    beforeEach(() => {
        eventPublisher = new EventPublisher()
        spyNewsSubscriber = jasmine.createSpy()
    })

    it('Upon notification execute registered callback', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('Upon registration the callback should be executed if notification came earlier', () => {
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')

        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('After execution on subscription, following notifications should also execute', () => {
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(2)
    })

    describe('multiple subscriptions and unsubscriptions', () => {
        let spySmsSubscriber: (argument?: any) => void

        beforeEach(() => {
            spySmsSubscriber = jasmine.createSpy()
        })

        it('Upon multiple registrations the callback should be executed if notification came earlier', () => {
            eventPublisher.notify('petDog')
            expect(spySmsSubscriber).not.toHaveBeenCalled()

            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('petDog', spySmsSubscriber)
            expect(spySmsSubscriber).toHaveBeenCalled()
        })

        it('Unsubscription for multiple events', () => {
            eventPublisher.subscribe('petDog', spyNewsSubscriber)
            eventPublisher.subscribe('giveCatSomeFish', spySmsSubscriber)
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
            expect(spySmsSubscriber).toHaveBeenCalledTimes(1)


            eventPublisher.unsubscribeMultipleNames(['petDog', 'giveCatSomeFish'])
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
            expect(spySmsSubscriber).toHaveBeenCalledTimes(1)
        })
    })

    it('Upon notification execute registered callbacks for different events', () => {
        eventPublisher.subscribeMultipleNames(['petDog', 'giveCatSomeFish'], spyNewsSubscriber)
        expect(spyNewsSubscriber).not.toHaveBeenCalled()

        eventPublisher.notify('petDog')
        eventPublisher.notify('giveCatSomeFish')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(2)
    })

    it('Unsubscription should work', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)

        eventPublisher.unsubscribe('petDog')
        eventPublisher.notify('petDog')
        expect(spyNewsSubscriber).toHaveBeenCalledTimes(1)
    })

    it('Unsubscribe does nothing when unsubscribing non-existent subscriber', () => {
        eventPublisher.subscribe('petDog', spyNewsSubscriber)

        eventPublisher.unsubscribe('undefinedSubscriber')
        eventPublisher.notify('petDog')

        expect(spyNewsSubscriber).toHaveBeenCalled()
    })

    it('Upon notification execute callback with parameter', () => {
        const eventArgument = 'argument'
        eventPublisher.subscribe('petDog', spyNewsSubscriber)
        eventPublisher.notify('petDog', eventArgument)
        expect(spyNewsSubscriber).toHaveBeenCalledWith(eventArgument)
    })
})
