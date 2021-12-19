import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
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
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Posts} from './shared/Posts';
import {NoRoute} from './shared/NoRoute';
import {Action, action, createStore as createEasyStore, persist, StoreProvider} from 'easy-peasy';

// const token = localStorage.getItem('token') || window.__token__;
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<TRootState, TRootAction>),
));
interface ICommentModel {
  commentText: {comment: string};
}
export interface IStoreModel {
  commentText: {comment: string};
  add: Action<IStoreModel, {comment: string}>;
}
const easyStore = createEasyStore<IStoreModel>(persist({
    commentText: {comment: 'Easy peasy lemon squeezy'},
    add: action((state, payload) => {
      state.commentText = payload
    })})
);

function AppComponent() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // const [token] = useToken();
  // const [posts] = usePostsData();

  store.dispatch(saveToken());
  return(
    <Provider store={store}>
      <StoreProvider store={easyStore}>
        {isMounted && <Router>
          <UserContextProvider>
            <Layout>
              <Header />
              <Content>
                <PostsContextProvider>
                  <Switch>
                    <Route exact path={['/', '/auth']}>
                      <Redirect to='/posts' />
                    </Route>
                    <Route path='/posts' >
                      <CardsList />
                        <Route path='/posts/:id'>
                          <Posts />
                        </Route>
                    </Route>
                    <Route component={NoRoute} />
                  </Switch>
                </PostsContextProvider>
              </Content>
            </Layout>
          </UserContextProvider>
        </Router>}
      </StoreProvider>
    </Provider>
  );
}

export const App = hot(() => <AppComponent />);
