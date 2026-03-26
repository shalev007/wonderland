import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@src/theme/theme';

type ExtendedRenderOptions = Omit<RenderOptions, 'wrapper'>;

export function renderWithProviders(
  ui: ReactElement,
  options?: ExtendedRenderOptions,
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <DirectionProvider initialDirection="rtl">
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </DirectionProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
