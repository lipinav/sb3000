import React, { useState } from 'react';
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
// import { generateId } from './utils/react/generateRandomIndex';
// import { generateRandomString } from './utils/react/generateRandomIndex';
// import { GenericList } from './shared/GenericList';
// import { merge } from './utils/js/merge';
// import { Icon } from './shared/Icon';

// const LIST: Array<ITitle> = [
const LIST = [
  {text: 'one', As: 'a' as const, id: "asdf1"},
  {text: 'two', As: 'a' as const, id: "asdf2"},
  {text: 'three', As: 'a' as const, id: "asdf3"}
]
// ].map((item) => ({ ...item, id: generateRandomString() }))
// ].map((item) => generateId(item))
// ].map(generateId)

function AppComponent() {
  const [list, setList] = useState(LIST);
  const [token] = useToken();
  const [posts] = usePostsData();
  console.log('[src/App.tsx] posts: ',posts);

  const handleItemClick = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  }
  // const handleAdd = () => {
  //   setList(list.concat(generateId({text: generateRandomString(), As: 'a' as const })));
  // }

  return(
    <tokenContext.Provider value={token}>
      <UserContextProvider>
        <Layout>
          <Header />
          <Content>
            <PostsContextProvider>
              <CardsList list={list}/>
            {/*
            <button onClick={handleAdd}>Add element</button>
            <ul>
              <GenericList list={list.map(merge({ onClick: handleItemClick }))}/>
            </ul>
            */}
            </PostsContextProvider>
          </Content>
        </Layout>
      </UserContextProvider>
    </tokenContext.Provider>
  );
}

export const App = hot(() => <AppComponent />);
