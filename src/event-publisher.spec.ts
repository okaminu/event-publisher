import { EventPublisher } from './event-publisher'

describe('eventPublisher service:', () => {

    let eventPublisher: EventPublisher
    let wasInvoked: Boolean
    let invokedString: String
    let invokeCount: number

    beforeEach(() => {
        eventPublisher = new EventPublisher()
        wasInvoked = false
        invokeCount = 0
    })

    it('Upon notification execute registered callback', () => {
        eventPublisher.subscribe('petDog', invoke)
        expect(wasInvoked).toBeFalsy()

        eventPublisher.notify('petDog')
        expect(wasInvoked).toBeTruthy()
    })

    it('Upon registration the callback should be executed if notification came earlier', () => {
        eventPublisher.notify('petDog')
        expect(wasInvoked).toBeFalsy()

        eventPublisher.subscribe('petDog', invoke)
        expect(wasInvoked).toBeTruthy()
    })

    describe('multiple subscriptions and unsubscriptions', () => {
        let wasSecondInvoked: Boolean

        beforeEach(() => {
            wasSecondInvoked = false
        })

        it('Upon multiple registrations the callback should be executed if notification came earlier', () => {
            eventPublisher.notify('petDog')
            expect(wasSecondInvoked).toBeFalsy()

            eventPublisher.subscribe('petDog', invoke)
            eventPublisher.subscribe('petDog', invokeSecond)
            expect(wasSecondInvoked).toBeTruthy()
        })

        it('Unsubscription for multiple events', () => {
            eventPublisher.subscribe('petDog', invoke)
            eventPublisher.subscribe('giveCatSomeFish', invokeSecond)
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(wasInvoked).toBeTruthy()
            expect(wasSecondInvoked).toBeTruthy()

            wasInvoked = false
            wasSecondInvoked = false
            eventPublisher.unsubscribeMultipleNames(['petDog', 'giveCatSomeFish'])
            eventPublisher.notify('petDog')
            eventPublisher.notify('giveCatSomeFish')
            expect(wasInvoked).toBeFalsy()
            expect(wasSecondInvoked).toBeFalsy()
        })

        function invokeSecond() {
            wasSecondInvoked = true
        }
    })

    it('Upon notification execute registered callbacks for different events', () => {
        eventPublisher.subscribeMultipleNames(['petDog', 'giveCatSomeFish'], countInvoke)
        expect(wasInvoked).toBeFalsy()

        eventPublisher.notify('petDog')
        eventPublisher.notify('giveCatSomeFish')
        expect(invokeCount).toBe(2)
    })

    it('Unsubscription should work', () => {
        eventPublisher.subscribe('petDog', invoke)
        eventPublisher.notify('petDog')
        expect(wasInvoked).toBeTruthy()

        wasInvoked = false
        eventPublisher.unsubscribe('petDog')
        eventPublisher.notify('petDog')
        expect(wasInvoked).toBeFalsy()
    })

    it('Unsubscribe does nothing when unsubscribing non-existent subscriber', () => {
        eventPublisher.subscribe('petDog', invoke)

        eventPublisher.unsubscribe('undefinedSubscriber')
        eventPublisher.notify('petDog')

        expect(wasInvoked).toBeTruthy()
    })

    it('Upon notification execute callback with parameter', () => {
        eventPublisher.subscribe('petDog', invokeWithString)
        invokedString = ''

        eventPublisher.notify('petDog', 'argument')
        expect(invokedString).toBe('argument')
    })

    function invoke() {
        wasInvoked = true
    }

    function invokeWithString(argument: String) {
        invokedString = argument
    }

    function countInvoke() {
        invokeCount++
    }
})
