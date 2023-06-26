import { it, expect, describe } from 'vitest';
import { UserContext } from '../Context/UserContext';

describe('UserContext', () => {
  it('should be defined', () => {
    expect(UserContext).toBeDefined();
  });

  it('should have a Provider', () => {
    expect(UserContext.Provider).toBeDefined();
  });

  it('should have a Consumer', () => {
    expect(UserContext.Consumer).toBeDefined();
  });
});
