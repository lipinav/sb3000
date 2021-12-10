import React, {ChangeEvent, useEffect, useState} from 'react';
import { useToken } from './hooks/useToken';
import { usePostsData } from './hooks/usePostsData';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { tokenContext } from './shared/context/tokenContext';
import { UserContextProvider } from './shared/context/userContext';
import { PostsContextProvider } from './shared/context/postsContext';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider } from 'react-redux';
import {rootReducer} from './store';
import {TokenContainer} from './shared/TokenContainer';

const LIST = [
  {text: 'one', As: 'a' as const, id: "asdf1"},
  {text: 'two', As: 'a' as const, id: "asdf2"},
  {text: 'three', As: 'a' as const, id: "asdf3"}
]

const store = createStore(rootReducer, composeWithDevTools());


function AppComponent() {
  const [list, setList] = useState(LIST);
  // const [token] = useToken();
  // const [posts] = usePostsData();

  return(
    <Provider store={store}>
      <TokenContainer>
        <UserContextProvider>
          <Layout>
            <Header />
            <Content>
              <PostsContextProvider>
                <CardsList list={list}/>
              </PostsContextProvider>
            </Content>
          </Layout>
        </UserContextProvider>
      </TokenContainer>
    </Provider>
  );
}

export const App = hot(() => <AppComponent />);
