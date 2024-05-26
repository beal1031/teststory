import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { HeaderComponent } from './header.component';
import { fn } from '@storybook/test';

const meta: Meta<HeaderComponent> = {
  title: 'Example/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Überprüfen, ob der Benutzername angezeigt wird
    const userName = await canvas.getByText('Jane Doe');
    expect(userName).toBeInTheDocument();

    // Überprüfen, ob der Logout-Button angezeigt wird
    const logoutButton = await canvas.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    // Klick auf den Logout-Button
    await userEvent.click(logoutButton);

    // Überprüfen, ob die onLogout Funktion aufgerufen wird
    // @ts-ignore
    expect(meta.args.onLogout).toHaveBeenCalled();
  },
};

export const LoggedOut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Überprüfen, ob der Login-Button angezeigt wird
    const loginButton = await canvas.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Überprüfen, ob der Create Account-Button angezeigt wird
    const createAccountButton = await canvas.getByRole('button', { name: /create account/i });
    expect(createAccountButton).toBeInTheDocument();

    // Klick auf den Login-Button
    await userEvent.click(loginButton);

    // Überprüfen, ob die onLogin Funktion aufgerufen wird
    // @ts-ignore
    expect(meta.args.onLogin).toHaveBeenCalled();
  },
};
