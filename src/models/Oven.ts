import Device from './Device';
import IRange from './IRange';
import IMode from './IMode';

export default class Oven extends Device {
    private temperature: IRange;
    private modes: IMode;

    public constructor(name: string, id: number, image: string, temperature: IRange, modes: IMode) {
        super(name, id, image);
        this.temperature = temperature;
        this.modes = modes;
    }

    getMinTemp(): number {
        return this.temperature.getMin();
    }

    getMaxTemp(): number {
        return this.temperature.getMax();
    }

    getCurrentTemp(): number {
        return this.temperature.getCurrent();
    }

    getStepTemp(): number {
        return this.temperature.getStep();
    }

    public getTemperature(): IRange {
        return this.temperature;
    }

    public getModes(): IMode {
         return this.modes;
     }
}

