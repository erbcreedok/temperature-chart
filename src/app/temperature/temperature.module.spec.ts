import { TemperatureModule } from './temperature.module';

describe('TemperatureModule', () => {
  let temperatureModule: TemperatureModule;

  beforeEach(() => {
    temperatureModule = new TemperatureModule();
  });

  it('should create an instance', () => {
    expect(temperatureModule).toBeTruthy();
  });
});
