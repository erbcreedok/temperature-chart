import { PrecipitationModule } from './precipitation.module';

describe('PrecipitationModule', () => {
  let precipitationModule: PrecipitationModule;

  beforeEach(() => {
    precipitationModule = new PrecipitationModule();
  });

  it('should create an instance', () => {
    expect(precipitationModule).toBeTruthy();
  });
});
