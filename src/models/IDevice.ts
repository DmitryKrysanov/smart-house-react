export default interface IDevice {
    getName(): string;
    setName(name: string): void;
    getState(): boolean;
    getId(): number;
    getImage(): string;
    on(): void;
    off(): void;
}