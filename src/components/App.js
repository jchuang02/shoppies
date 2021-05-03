import React, { useState } from "react";
import "@shopify/polaris/dist/styles.css";
import SearchBar from "./SearchBar";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card, List, Frame, TopBar, Button } from "@shopify/polaris";
import omdb from '../apis/omdb';

class App extends React.Component {
  onTermSubmit = (term) => {
    omdb.get('', {
        params: {
            s: term
        }
    });
  };

  render() {

    return (
      <AppProvider i18n={enTranslations}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <Page title="The Shoppies">
          <Card sectioned>
            <Button onClick={() => alert("Button clicked!")}>
              Example button
            </Button>
            <List>
              <List.Item>Yellow shirt</List.Item>
              <List.Item>Red shirt</List.Item>
              <List.Item>Green shirt</List.Item>
            </List>
          </Card>
        </Page>
        <Frame />
      </AppProvider>
    );
  }
}

export default App;
