import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Signup from '../pages/Signup/Signup';
import UserContextProvider from '../Context/UserContext';

describe('test Signup page', () => {
  it('should render Signup page', () => {
    render(
      <UserContextProvider>
        <Signup />
      </UserContextProvider>,
    );
    expect(true).toBe(true);
  });
});
