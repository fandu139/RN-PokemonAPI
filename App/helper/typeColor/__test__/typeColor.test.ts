import {getTypeCalor} from '..';

describe('Get Type Color Pokemon Test', () => {
  it('Pokemon type water', () => {
    const dummyValue = getTypeCalor('water');
    expect(dummyValue).toEqual({
      badgeColor: '#FFFFFF',
      badgeColorAlt: '#0E98D2',
    });
  });

  it('Pokemon type fire', () => {
    const dummyValue = getTypeCalor('fire');
    expect(dummyValue).toEqual({
      badgeColor: '#FFFFFF',
      badgeColorAlt: '#EF4941',
    });
  });

  it('Pokemon type grass', () => {
    const dummyValue = getTypeCalor('grass');
    expect(dummyValue).toEqual({
      badgeColor: '#FFFFFF',
      badgeColorAlt: '#47bba5',
    });
  });
});
