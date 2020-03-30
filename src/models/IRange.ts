export default interface IRange {
    getMin(): number;
    setMin(min: number): void;
    getMax(): number;
    setMax(max: number): void;
    getCurrent(): number;
    setCurrent(current: number): void;
    getStep(): number;
    setStep(step: number): void;
    increase(): void;
    decrease(): void;
}