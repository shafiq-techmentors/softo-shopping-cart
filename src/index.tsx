import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { Query, QueryClient, QueryClientProvider } from "react-query";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

const client = new QueryClient();

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>
);
