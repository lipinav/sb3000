import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './cardslist.css';
import { Card } from './Card';
import { postsContext } from '../context/postsContext';
import {usePostsData} from '../../hooks/usePostsData';

interface ITitle {
  text: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
}

export function CardsList({ list }: IMyListProps): JSX.Element {
  const [isPosts, setIsPosts] = useState(false);
  const [isList, setIsList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  // const posts = useContext(postsContext);
  const [posts, setNewPosts, newPosts] = usePostsData();
  const bottomOfList = useRef(null);
  const [isMorePosts, setIsMorePosts] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsPosts(!!posts.children?.length && !posts.error);
    setLoading(!posts.children?.length && !posts.error && posts.loading);
    setErrorLoading(posts.error);
    setIsList(!posts.children?.length && !posts.loading && !posts.error);
    setIsMorePosts(posts.loadCount !== 0 && posts.loadCount % 3 === 0);
  }, [posts]);

  console.log(`posts count: ${posts.children?.length}`);
  // console.log(`children ${!!posts.children?.length} loading: ${!posts.loading} error: ${!posts.error}`);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // console.log(`isIntersecting: ${entries[0].isIntersecting} posts: ${posts.children?.length} !!posts.children?.length: ${!!posts.children?.length} res: ${entries[0].isIntersecting && !!posts.children?.length} after: ${posts.after}`);
      if (entries[0].isIntersecting && !!posts.children?.length && !isMorePosts) {
        // console.log(`Before Load more, newPosts: ${newPosts}`);
        setNewPosts(true);
      }
    }, {
      rootMargin: '200px'
    });
    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }
    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    }
  }, [bottomOfList.current, newPosts]);
  console.log(`loadCount: ${posts.loadCount}`);
  function handleClick() {
    setNewPosts(true);
    if (buttonRef.current) buttonRef.current.innerHTML = 'Loading...';
  }
  return (
    <>
    <ul className={styles.cardsList}>
      {isPosts &&
        posts?.children?.map((
          {
            id, title, author,
            created_utc, icon_img,
            num_comments, score,
            thumbnail, content_categories, selftext
          }
        ) => {
          return (<Card key={id}
                        id={id}
                        title={title}
                        text={selftext}
                        cardImg={thumbnail}
                        numComments={num_comments}
                        createdAt={created_utc}
                        authorName={author}
                        avatar={icon_img}
                        karma={score}
                        contentCategories={content_categories}
          />)
        })
      }
      { loading && <div style={{textAlign: 'center'}}>Loading...</div> }
      { errorLoading && <div style={{textAlign: 'center'}}>Loading posts: {errorLoading} :(</div> }
      { isList && list.map((item) => <Card key={item.id} title={item.text} text={'asdf'}/>) }
      { isMorePosts && <button className={styles.button} ref={buttonRef} onClick={handleClick}>MORE POSTS!!!</button>}
    </ul>
    <div ref={bottomOfList}></div>
    </>
  );
}