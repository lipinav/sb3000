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
  const [list, setList] = React.useState(LIST);
  const handleItemClick = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  }
  const handleAdd = () => {
    setList(list.concat(generateId({title: generateRandomString()})));
  }
  return(
    <Layout>
      <Header />
      <Content>
        <CardsList list={list.map(merge({ onClick: handleItemClick}))}/>
        <button onClick={handleAdd}>Add element</button>
        <MyList list={list.map(merge({ onClick: handleItemClick }))}/>
      </Content>
    </Layout>
  );
}

export const App = hot(() => <AppComponent />);
