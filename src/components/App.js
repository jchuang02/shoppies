import React from "react";
import "@shopify/polaris/dist/styles.css";
import Search from "./Search";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";

export default function App() {

    return (
      <AppProvider i18n={enTranslations}>
        <Page title="The Shoppies">
          <Search />
        </Page>
      </AppProvider>
    );
  }


