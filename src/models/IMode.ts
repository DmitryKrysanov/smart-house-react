export default interface IMode {
    getModes(): Array<string>;
    setModes(modes: Array<string>): void;
    getCurrentMode(): string;
    next(): void;
    prev(): void;
}