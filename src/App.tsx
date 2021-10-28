import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { generateId } from './utils/react/generateRandomIndex';
import { generateRandomString } from './utils/react/generateRandomIndex';
import { MyList } from './shared/GenericList';

// const LIST: Array<ITitle> = [
const LIST = [
  {'title': 'one'},
  {'title': 'two'},
  {'title': 'three'},
// ].map((item) => ({ ...item, id: generateRandomString() }))
// ].map((item) => generateId(item))
].map(generateId)

function AppComponent() {
  return(
    <Layout>
      <Header />
      <Content>
        <CardsList list={LIST.map((item) => ({...item, onClick: () => {console.log(item.id)}}))}/>
        <MyList list={LIST.map((item) => ({...item, onClick: () => {console.log(item.id)}}))}/>
      </Content>
    </Layout>
  );
}

export const App = hot(AppComponent);
