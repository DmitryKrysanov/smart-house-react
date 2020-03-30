import IMode from './IMode';

export default class Mode implements IMode {
    private modes: Array<string>;
    private current: number; 

    public constructor(modes: Array<string>) {
        this.modes = modes;
        this.current = 0;
    }

    public getModes(): Array<string> {
        return this.modes;
    }

    public setModes(modes: Array<string>): void {
        this.modes = modes;
    }

    public getCurrentMode(): string {
        return this.modes[this.current];
    }

    public next(): void {
        debugger
        if (this.current === this.modes.length - 1) {
            this.current = 0;
        } else {
            this.current++;
        }
    }
    
    public prev(): void {
        if (this.current === 0) {
            this.current = this.modes.length - 1;
        } else {
            this.current--;
        }
    }
}
