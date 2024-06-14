/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainView from './utils/MainView';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {Router} from './routes/Router';
import AppwriteContext, {AppwriteProvider} from './appwrite/AppwriteContext';
import {PaperProvider, useTheme} from 'react-native-paper';

function App(): JSX.Element {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AppwriteProvider>
            <MainView>
              <Router />
            </MainView>
          </AppwriteProvider>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
