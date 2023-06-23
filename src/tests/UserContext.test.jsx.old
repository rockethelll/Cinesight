import { it, expect, describe } from 'vitest';
import { useContext } from 'react';
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

  it.skip('should display "-1" by default', () => {
    expect(UserContext.userID).toEqual(-1);
  });

  it('should display "123" after setUserID(123)', () => {
    const { setUserID, userID } = useContext(UserContext);
    setUserID(123);
    expect(userID).toEqual(123);
  });
});


import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function UserGreeting() {
  const { userID } = useContext(UserContext);

  if (userID === -1) {
    return <p>Guest</p>;
  } else {
    return <p>Welcome user {userID}</p>;
  }
}

export default UserGreeting;

Nous pourrions tester ce composant comme ceci :

jsx
Copy code
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import UserGreeting from '../components/UserGreeting';
import { UserContext } from '../Context/UserContext';

describe('UserGreeting', () => {
  it('should render "Guest" for guest users', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ setUserID: () => {}, userID: -1 }}>
        <UserGreeting />
      </UserContext.Provider>
    );

    expect(getByText('Guest')).toBeInTheDocument();
  });

  it('should render "Welcome user 123" for user with ID 123', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ setUserID: () => {}, userID: 123 }}>
        <UserGreeting />
      </UserContext.Provider>
    );

    expect(getByText('Welcome user 123')).toBeInTheDocument();
  });
});