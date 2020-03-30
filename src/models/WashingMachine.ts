import Device from './Device';
import IRange from './IRange';
import IMode from './IMode';

export default class WashingMachine extends Device {
    private maxSpinSpeed: number;
    private temperature: IRange;
    private modes: IMode;
    
    public constructor(name: string, id: number, image: string, temperature: IRange, maxSpinSpeed: number, modes: IMode) {
        super(name, id, image);
        this.maxSpinSpeed = maxSpinSpeed;
        this.temperature = temperature;
        this.modes = modes;
    }

    public getMaxSpinSpeed(): number {
        return this.maxSpinSpeed;
    }

    public setMaxSpinSpeed(maxSpinSpeed: number): void {
        this.maxSpinSpeed = maxSpinSpeed;
    }

    public getTemperature(): IRange {
        return this.temperature;
    }
    
    public getModes(): IMode {
        return this.modes;
    }
}


