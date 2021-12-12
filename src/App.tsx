import React, {ChangeEvent, useEffect, useState} from 'react';
// import { useToken } from './hooks/useToken';
// import { usePostsData } from './hooks/usePostsData';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
// import { tokenContext } from './shared/context/tokenContext';
import { UserContextProvider } from './shared/context/userContext';
import { PostsContextProvider } from './shared/context/postsContext';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {rootReducer, TRootAction, TRootState} from './store/reducer';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {saveToken} from './store/token/actions';

const LIST = [
  {text: 'one', As: 'a' as const, id: "asdf1"},
  {text: 'two', As: 'a' as const, id: "asdf2"},
  {text: 'three', As: 'a' as const, id: "asdf3"}
]

// const token = localStorage.getItem('token') || window.__token__;
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<TRootState, TRootAction>),
));

function AppComponent() {
  const [list, setList] = useState(LIST);
  // const [token] = useToken();
  // const [posts] = usePostsData();

  store.dispatch(saveToken());
  return(
    <Provider store={store}>
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
    </Provider>
  );
}

export const App = hot(() => <AppComponent />);
