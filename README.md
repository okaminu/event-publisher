# event-publisher
A simple tool which can be used to notify events and subscribe to them.
Has a straightforward implementation of Observer pattern, though has some unique
features like keeping event in pending state until at least one subscriber is present.

## Setup
```
$ npm install @boldadmin/event-publisher
```

## Usage
Subscribe and notify:
```
const fun = () =>  me.eat()
eventPublisher.subscribe('lunchtime', fun); # subscribe to event
eventPublisher.notify('lunchtime'); # publish event
eventPublisher.unsubscribe('lunchtime', fun); #remove single subscription
eventPublisher.unsubscribeAll('lunchtime'); #or remove all subscriptions
```

Subscribe and notify with event argument:
```
eventPublisher.subscribe(
    'lunchtime',
    (dayOfTheWeek) =>  if (dayOfTheWeek === 'sunday') me.eatAtHome() 
); # subscribe to event and receive argument
    
eventPublisher.notify('lunchtime', 'sunday'); # publish event with event argument
```

Pending notification until first subscription:
```
eventPublisher.notify('lunchtime'); # publish event, since no subscribers are present, its in pending state
eventPublisher.subscribeAndExecuteIfPending('lunchtime', () => { me.eat() }); # once subscribed, the event is executed
```

Multiple unsubscription:
```
eventPublisher.unsubscribeAll(
    'lunchtime',
    'supper',
    'breakfast'
); # unsubscribes multiple events
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
