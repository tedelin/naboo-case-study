import { Topbar } from "@/components";
import { AuthProvider, SnackbarProvider } from "@/contexts";
import { routes } from "@/routes";
import { Container, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          "ocean-blue": [
            "#7AD1DD",
            "#5FCCDB",
            "#44CADC",
            "#2AC9DE",
            "#1AC2D9",
            "#11B7CD",
            "#09ADC3",
            "#0E99AC",
            "#128797",
            "#147885",
          ],
        },
        primaryColor: "ocean-blue",
      }}
    >
      <SnackbarProvider>
        <AuthProvider>
          <Topbar routes={routes} />
          <Container>
            <Component {...pageProps} />
          </Container>
        </AuthProvider>
      </SnackbarProvider>
    </MantineProvider>
  );
}
