/**
 * Skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call Register function when register button is clicked
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    //arange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');

    //action
    await userEvent.type(nameInput, 'Ali Purnama');

    //assert

    expect(nameInput).toHaveValue('Ali Purnama');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'test@email.com');

    // Assert
    expect(emailInput).toHaveValue('test@email.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'testPassword');

    // Assert
    expect(passwordInput).toHaveValue('testPassword');
  });

  it('should call Register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.type(nameInput, 'Ali Purnama');
    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'testPassword');
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Ali Purnama',
      email: 'test@email.com',
      password: 'testPassword',
    });
  });
});
