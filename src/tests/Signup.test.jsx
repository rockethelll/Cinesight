import {
  describe, test, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import UserContextProvider from '../Context/UserContext';
import Signup from '../pages/Signup/Signup';

// eslint-disable-next-line no-unused-vars
const setup = (jsx, options) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(jsx, options),
  };
};

describe('test Signup page', () => {
  let onSubmit;
  let user;

  beforeEach(() => {
    onSubmit = vi.fn();
    user = userEvent.setup();
    render(
      <MemoryRouter>
        <UserContextProvider>
          <Signup onSubmit={onSubmit} />
        </UserContextProvider>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('should render Signup page', async () => {
    const userEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const password = screen.getByLabelText(/mot de passe/i);

    const form = {
      userEmail: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    await user.type(userEmail, form.userEmail);
    await user.type(password, form.password);

    await onSubmit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(form);
  });
});
