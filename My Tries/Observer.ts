interface Subject {
    subscribe(observer: Observer): void

    unsubscribe(observer: Observer): void

    notify(): void
}

class LetterGenerator implements Subject{
    public currentLetter: string
    private subscribers: Observer[] = []

    notify(): void {
        for (const subscriber of this.subscribers) {
            subscriber.logLetter(this);
        }
    }

    subscribe(observer: Observer): void {
        if (this.subscribers.indexOf(observer) !== -1) {
            return console.log('Already subscribed');
        }

        this.subscribers.push(observer)
    }

    unsubscribe(observer: Observer): void {
        const index = this.subscribers.indexOf(observer);
        if (index === -1) {
            return console.log('Already unsubscribed');
        }

        this.subscribers.splice(index, 1)
    }

    generateLetter(): void {
        console.log('generating letter');
        this.currentLetter = String.fromCharCode(this.randomIntFromInterval(97, 122));
        this.notify()
    }

    randomIntFromInterval(min, max): number{
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

interface Observer {
    logLetter(letterGenerator: LetterGenerator)
}

class Listener1 implements Observer {
    logLetter(letterGenerator: LetterGenerator) {
        console.log('Listener1 reaction ', letterGenerator.currentLetter);
    }
}

class Listener2 implements Observer {
    logLetter(letterGenerator: LetterGenerator) {
        console.log('Listener2 reaction ', letterGenerator.currentLetter);
    }
}

const lG = new LetterGenerator()
const l1 = new Listener1()
const l2 = new Listener2()

lG.subscribe(l1)
lG.generateLetter()
lG.subscribe(l2)
lG.generateLetter()
lG.unsubscribe(l1)
lG.generateLetter()

// generating letter
// Listener1 reaction  t
// generating letter
// Listener1 reaction  k
// Listener2 reaction  k
// generating letter
// Listener2 reaction  n