import { setup } from '../../../src/utils/boostrap';

describe('Boostrap', () => {
  it('Should execute the function of development', () => {
    const devMock = jest.fn();
    const prodMock = jest.fn();

    setup({
      onDevelopment: devMock,
      onProduction: prodMock
    });

    expect(devMock).toBeCalledTimes(1);
    expect(prodMock).toBeCalledTimes(0);
  });

  it('Should execute the function of production', () => {
    process.env.NODE_ENV = 'production';

    const devMock = jest.fn();
    const prodMock = jest.fn();

    setup({
      onDevelopment: devMock,
      onProduction: prodMock
    });

    expect(devMock).toBeCalledTimes(0);
    expect(prodMock).toBeCalledTimes(1);
  });
});
