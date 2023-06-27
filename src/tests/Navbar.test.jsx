import { test, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from 'react-query';
import Navbar from '../components/Navbar/Navbar';
import UserContextProvider from '../Context/UserContext';

const setup = (jsx, options) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(jsx, options),
  };
};

describe('Navbar component', () => {
  test('Click the signup link', async () => {
    const { user } = setup(
      <QueryClientProvider client={new QueryClient()}>
        <UserContextProvider>
          <Navbar />
        </UserContextProvider>
      </QueryClientProvider>,
    );

    // const logoCinesight = screen.getByRole('img', {
    //   name: /cinesight logo/i,
    // });
    // console.log(logoCinesight);

    // expect(logoCinesight).toBeInTheDo
  });
});
