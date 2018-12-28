interface Observer {
    update(temprature: number);
}

interface Subject {
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}

class Thermometer implements Subject {
    private observers: Observer[] = [];
    private temprature = 0;

    setTemprature(temprature: number) {
        if (this.temprature !== temprature) {
            console.log('Temprature is now: ' + temprature);
        }
        this.temprature = temprature;
        this.notifyObservers();
    }

    registerObserver(o: Observer) {
        this.observers.push(o);
    }

    removeObserver(o: Observer) {
        const idx = this.observers.indexOf(o);
        if (idx !== -1) {
            this.observers.splice(idx, 1);
        }
    }

    notifyObservers() {
        this.observers.forEach(o => {
            o.update(this.temprature);
        });
    }
}

class Fan implements Observer {
    private on = false;
    private name = '';
    private threshold: number;

    constructor(name: string, threshold: number) {
        this.name = name;
        this.threshold = threshold;
        console.log('Fan ' + name + ' with threshold set to ' + threshold + ' is online.');
    }

    update(temprature: number) {
        if (this.on === false && temprature >= this.threshold) {
            console.log('Fan ' + this.name + ' is ON now');
        } else if (this.on === true && temprature < this.threshold) {
            console.log('Fan ' + this.name + ' is OFF now');
        } else {
            console.log('Fan ' + this.name + ' is ' + (this.on ? 'on' : 'off'));
        }

        this.on = temprature > this.threshold ? true : false;
    }
}

// Main Program
let weatherStation = new Thermometer();
let fanRoom1 = new Fan('Room 1', 30);
let fanRoom2 = new Fan('Room 2', 25);
weatherStation.registerObserver(fanRoom1);
weatherStation.registerObserver(fanRoom2);

weatherStation.setTemprature(27);
weatherStation.setTemprature(28);
weatherStation.setTemprature(30);
