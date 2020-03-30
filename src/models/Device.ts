import IDevice from './IDevice';

export default abstract class Device implements IDevice {
    private name: string;
    private state: boolean;
    private id: number;
    private image: string;

    public constructor(name: string, id: number, image: string) {
        this.name = name;
        this.state = false;
        this.id = id;
        this.image = image;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getState(): boolean {
        return this.state;
    }

    public getId(): number {
        return this.id;
    }

    public getImage(): string {
        return this.image;
    }

    public on(): void {
        this.state = true;
    }

    public off(): void {
        this.state = false;
    }
}