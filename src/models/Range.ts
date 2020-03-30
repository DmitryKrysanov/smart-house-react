import IRange from './IRange';

export default class RangeTemp implements IRange {
    private min: number;
    private max: number;
    private current: number;
    private step: number;

    public constructor(min: number, max: number, current: number, step: number) {
        this.min = min;
        this.max = max;
        this.current = current;
        this.step = step;
    }

    public getMin(): number {
        return this.min;
    }

    public setMin(min: number): void {
        this.min = min;
    }

    public getMax(): number {
        return this.max;
    }

    public setMax(max: number): void {
        this.max = max;
    }

    public getCurrent(): number {
        return this.current;
    }

    public setCurrent(current: number): void {
        this.current = current;
    }

    public getStep(): number {
        return this.step;
    }

    public setStep(step: number): void {
        this.step = step;
    }

    public increase(): void {
        if (this.current !== this.max) {
            if ((this.current + this.step) >= this.max) {
                this.current = this.max;
            } else {
                this.current += this.step;
            }
        }
    }

    public decrease(): void {
        if (this.current !== this.min) {
            if ((this.current - this.step) <= this.min) {
                this.current = this.min;
            } else {
                this.current -= this.step;
            }
        }
    }
}