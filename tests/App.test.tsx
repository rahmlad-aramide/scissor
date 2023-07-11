import React from 'react';
// import { render, screen } from '@testing-library/react';
import App from "../src/App";

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../src/contexts';

describe('App component', () => {
  it('renders the app correctly', () => {
     render(
      <MemoryRouter initialEntries={['/']}>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );
  });

});
