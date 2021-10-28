import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { generateId } from './utils/react/generateRandomIndex';
// import { generateRandomString } from './utils/react/generateRandomIndex';
import { MyList } from './shared/GenericList';
import { merge } from './utils/js/merge';

// const LIST: Array<ITitle> = [
const LIST = [
  {'title': 'one'},
  {'title': 'two'},
  {'title': 'three'},
// ].map((item) => ({ ...item, id: generateRandomString() }))
// ].map((item) => generateId(item))
].map(generateId)

function AppComponent() {
  const handleItemClick = (id: string) => {
    console.log(id);
  }
  return(
    <Layout>
      <Header />
      <Content>
        <CardsList list={LIST.map(merge({ onClick: handleItemClick}))}/>
        <MyList list={LIST.map(merge({ onClick: handleItemClick }))}/>
      </Content>
    </Layout>
  );
}

export const App = hot(() => <AppComponent />);
