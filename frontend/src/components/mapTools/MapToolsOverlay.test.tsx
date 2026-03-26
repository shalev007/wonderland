import { beforeEach, describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from '@src/test/renderWithProviders';
import { useMapToolsStore } from '@src/stores/useMapTools';
import { MapToolsOverlay } from './MapToolsOverlay';

describe('MapToolsOverlay', () => {
  beforeEach(() => {
    useMapToolsStore.setState({
      isOpen: false,
      selectedTool: null,
    });
  });

  test('renders the toggle while the tray is closed by default', () => {
    renderWithProviders(<MapToolsOverlay />);

    const toggle = screen.getByRole('button', { name: 'כלי מפה' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).not.toHaveAttribute('aria-pressed');
    expect(
      screen.queryByRole('toolbar', { name: 'בחירת כלי מפה' }),
    ).not.toBeInTheDocument();
  });

  test('pressing Escape closes the tray and keeps the last selected tool', async () => {
    const user = userEvent.setup();

    renderWithProviders(<MapToolsOverlay />);

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));
    const polygonButton = screen.getByRole('button', { name: 'פוליגון' });

    await user.click(polygonButton);
    fireEvent.keyDown(polygonButton, { key: 'Escape' });

    expect(
      screen.queryByRole('toolbar', { name: 'בחירת כלי מפה' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));

    expect(screen.getByRole('button', { name: 'פוליגון' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('ignores non-Escape keys while the tray is open', async () => {
    const user = userEvent.setup();

    renderWithProviders(<MapToolsOverlay />);

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'פוליגון' }), {
      key: 'Enter',
    });

    expect(
      screen.getByRole('toolbar', { name: 'בחירת כלי מפה' }),
    ).toBeInTheDocument();
  });

  test('opens the tray with exactly polygon, line, and dot actions in that order', async () => {
    renderWithProviders(<MapToolsOverlay />);

    fireEvent.click(screen.getByRole('button', { name: 'כלי מפה' }));

    const toolbar = screen.getByRole('toolbar', { name: 'בחירת כלי מפה' });

    expect(screen.getByRole('button', { name: 'כלי מפה' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(toolbar).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'נקודה' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'קו' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'פוליגון' })).toBeInTheDocument();
    expect(within(toolbar).getByText('כלי מפה')).toBeInTheDocument();
    expect(
      within(toolbar)
        .getAllByRole('button')
        .map((button) => button.getAttribute('data-tool-kind')),
    ).toEqual(['polygon', 'line', 'dot']);
    expect(
      screen.queryByRole('button', { name: 'arrow' }),
    ).not.toBeInTheDocument();
  });

  test('selecting a tool updates aria-pressed and keeps the tray open', async () => {
    const user = userEvent.setup();

    renderWithProviders(<MapToolsOverlay />);

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));
    await user.click(screen.getByRole('button', { name: 'קו' }));

    expect(screen.getByRole('button', { name: 'קו' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'נקודה' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      screen.getByRole('toolbar', { name: 'בחירת כלי מפה' }),
    ).toBeInTheDocument();
  });

  test('preserves the last selected tool after closing and reopening', async () => {
    const user = userEvent.setup();

    renderWithProviders(<MapToolsOverlay />);

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));
    await user.click(screen.getByRole('button', { name: 'פוליגון' }));
    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));

    expect(
      screen.queryByRole('toolbar', { name: 'בחירת כלי מפה' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'כלי מפה' }));

    expect(screen.getByRole('button', { name: 'פוליגון' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'נקודה' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
