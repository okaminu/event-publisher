export class PendingEvent {
    constructor(
        public isPending: boolean,
        public subscribers: Array<(argument?: any) => void> = []
    ) {}
}
