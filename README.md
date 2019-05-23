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
eventPublisher.unsubscribeAll('lunchtime'); #remove all subscriptions
```

Pending notification until first subscription:
```
eventPublisher.notify('lunchtime'); # publish event, since no subscribers are present, its in pending state
eventPublisher.subscribe('lunchtime', () => { me.eat() }); # once subscribed, you receive the pending event
```

Multiple subscriptions and unsubscriptions:
```
eventPublisher.subscribeMultipleNames(
    'lunchtime',
    'supper',
    'breakfast',
    () => { me.eat() }
); # subscribe to multiple events

eventPublisher.unsubscribeAll('lunchtime', 'supper', 'breakfast'); # unsubscribe to multiple events
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
