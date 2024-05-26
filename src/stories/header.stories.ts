import type { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';
import {fn, within, expect, userEvent} from '@storybook/test';

const meta: Meta<HeaderComponent> = {
  title: 'Example/Header',
  component: HeaderComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
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
    const userName = canvas.getByText('Jane Doe');
    await expect(userName).toBeInTheDocument();

    // Überprüfen, ob der Logout-Button angezeigt wird
    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();

    // Klick auf den Logout-Button
    await userEvent.click(logoutButton);

    // Überprüfen, ob die onLogout Funktion aufgerufen wird
    // @ts-ignore
    await expect(logoutButton).toHaveBeenCalled();
  }
};

export const LoggedOut: Story = {};
