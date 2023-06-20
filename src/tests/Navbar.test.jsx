import { it, describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar.jsx';
import { BrowserRouter } from 'react-router-dom'
import userEvent  from '@testing-library/user-event'

describe('Navbar component', () => {
  it('Click the signup link', async () => {
    render(<Navbar />, { wrapper: BrowserRouter })

    expect(screen.getByText('Créer un compte')).toBeTruthy()

    const user = userEvent.setup()
    const signup = vi.spyOn(user, 'click')
    const signupLink = screen.getByText(/Créer un compte/)

    await user.click(signupLink)
    expect(signup).toHaveBeenCalledTimes(1)
  })
})
