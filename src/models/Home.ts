// import IDevice from './IDevice';
import WashingMachine from './WashingMachine';
import Oven from './Oven';

export default class Home {
    private name: string;
    private devices: Array<Oven | WashingMachine>;

    public constructor(name: string) {
        this.name = name;
        this.devices = [];
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDevices(): Array<Oven | WashingMachine> {
        return this.devices;
    }

    public addDevice(device: Oven | WashingMachine): void {
        this.devices.push(device);
    }

    public selectDeviceByName(name: string): Oven | WashingMachine | undefined {
        return this.devices.find(device => device.getName() === name)
    }

    public deviceOn(name: string, delay: number): Promise<void> {
        return new Promise(resolve => setTimeout(() => {
            const device: Oven | WashingMachine | undefined = this.selectDeviceByName(name);
            if(device === undefined) { 
                console.log('Device not found')
            } else {
                device.on()
            }
            resolve()
        }, delay))
    }

    public deviceOff(name: string, delay: number): Promise<void> {
        return new Promise(resolve => setTimeout(() => {
            const device: Oven | WashingMachine | undefined = this.selectDeviceByName(name);
            if(device === undefined) { 
                console.log('Device not found')
            } else {
                device.off()
            }
            resolve()
        }, delay))
    }

    public removeDevice(name: string): void {
        const device: Oven | WashingMachine | undefined = this.selectDeviceByName(name);
            if(device === undefined) { 
                console.log('Device not found')
            } else {
                const index: number = this.devices.indexOf(device);
                this.devices.splice(index, 1);
            }
    }

    public removeAllDevices(): void {
        this.devices = [];
    }
}