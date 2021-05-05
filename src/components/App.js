import React from "react";
import "@shopify/polaris/dist/styles.css";
import Search from "./Search";
import Banner from "./Banner";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Layout } from "@shopify/polaris";
import useLocalStorage from "react-use-localstorage";

export default function App() {
  const [nominations, setNominations] = useLocalStorage("[]");

  return (
    <AppProvider i18n={enTranslations} theme={{ colorScheme: "dark" }}>
      <Page title="The Shoppies">
        <Layout>
          <Layout.AnnotatedSection
            title="Search"
            description="Shopify and your customers will use this information to contact you."
          >
            <Search
              nominations={nominations ? JSON.parse(nominations) : nominations}
              nominate={setNominations}
            />
          </Layout.AnnotatedSection>
          <Banner
            nominations={nominations ? JSON.parse(nominations) : nominations}
            removeNominee={setNominations}
          />
        </Layout>
      </Page>
    </AppProvider>
  );
}
