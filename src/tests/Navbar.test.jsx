import {
  test,
  describe,
  expect,
  beforeEach,
  afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
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
  let userAction;
  let queryClient;

  beforeEach(() => {
    userAction = userEvent.setup();
    queryClient = new QueryClient();
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <Navbar />
          </UserContextProvider>
        </QueryClientProvider>
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  test('test writing in searchbar', async () => {
    const logoSearchBar = screen.getByRole('searchbox');

    await userAction.type(logoSearchBar, 'test');

    expect(logoSearchBar.value).toBe('test');
  });

  describe('burger menu', () => {
    beforeEach(async () => {
      const burgerMenuIcon = screen.getByRole('img', {
        name: /burger menu icon/i,
      });

      await userAction.click(burgerMenuIcon);
    });

    test('should be in the document', () => {
      const burgerMenuIcon = screen.getByRole('img', {
        name: /burger menu icon/i,
      });

      expect(burgerMenuIcon).toBeInTheDocument();
    });

    test('clic should display connexion button', () => {
      const connexionButton = screen.getByRole('link', {
        name: /connexion/i,
      });

      expect(connexionButton).toBeInTheDocument();
    });

    test('clic on connexion button', async () => {
      const connexionButton = screen.getByRole('link', {
        name: /connexion/i,
      });

      await userAction.click(connexionButton);

      expect(connexionButton).toBeInTheDocument();
    });
  });
});
