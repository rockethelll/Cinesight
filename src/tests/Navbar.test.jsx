import {
  test, describe, expect, beforeEach, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from 'react-query';
import Navbar from '../components/Navbar/Navbar';
import UserContextProvider from '../Context/UserContext';

// eslint-disable-next-line no-unused-vars
const setup = (jsx, options) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(jsx, options),
  };
};

describe('Navbar component', () => {
  let user;
  let queryClient;

  beforeEach(() => {
    user = userEvent.setup();
    queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Navbar />
        </UserContextProvider>
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  test('test writing in searchbar', async () => {
    const logoSearchBar = screen.getByRole('searchbox');

    await user.type(logoSearchBar, 'test');

    expect(logoSearchBar.value).toBe('test');
  });

  test('test connect button', async () => {
    const burgerMenuIcon = screen.getByRole('img', {
      name: /burger menu icon/i,
    });

    await user.click(burgerMenuIcon);

    expect(burgerMenuIcon).toBeInTheDocument();
  });
});
