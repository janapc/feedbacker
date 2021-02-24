import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../../src/utils/validators';

describe('Validators utils', () => {
  it('Should given an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório');
  });

  it('Should given an error with less then 3 character payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres');
  });

  it('Should returns true when pass a correct param', () => {
    expect(validateEmptyAndLength3('12354')).toBe(true);
  });

  it('Should given an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório');
  });

  it('Should given an error with a invalid param', () => {
    expect(validateEmptyAndEmail('myemail@')).toBe('*Este campo precisa ser um e-mail');
  });

  it('Should returns true when input be a correct param', () => {
    expect(validateEmptyAndEmail('myemail@gmail.com')).toBe(true);
  });
});
