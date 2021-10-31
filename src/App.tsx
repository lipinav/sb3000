import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { CommentsButtonIcon } from './shared/CardsList/Card/CommentsButton/CommentsButtonIcon';
import { generateId } from './utils/react/generateRandomIndex';
import { generateRandomString } from './utils/react/generateRandomIndex';
import { GenericList } from './shared/GenericList';
import { merge } from './utils/js/merge';

// const LIST: Array<ITitle> = [
const LIST = [
  {text: 'one', As: 'a' as const},
  {text: 'two', As: 'a' as const},
  {text: 'three', As: 'a' as const},
// ].map((item) => ({ ...item, id: generateRandomString() }))
// ].map((item) => generateId(item))
].map(generateId)

function AppComponent() {
  const [list, setList] = React.useState(LIST);
  const handleItemClick = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  }
  const handleAdd = () => {
    setList(list.concat(generateId({text: generateRandomString(), As: 'a' as const })));
  }
  return(
    <Layout>
      <Header />
      <Content>
        <CardsList list={list}/>
        {/*
        <button onClick={handleAdd}>Add element</button>
        <ul>
          <GenericList list={list.map(merge({ onClick: handleItemClick }))}/>
        </ul>
        */}
        <div>
          <CommentsButtonIcon />
          comment
        </div>
      </Content>
    </Layout>
  );
}

export const App = hot(() => <AppComponent />);
