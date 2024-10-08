import React, { useEffect, useRef } from 'react';
import styles from './main.module.css';
import Header from '../../../widgets/header/Header';
import Search from '../../../features/search/Search';
import Menu from '../../../widgets/menu/Menu';
import { Route, Routes } from 'react-router-dom';
import Songs from '../pages/Songs/Songs';
import Playlists from '../pages/Playlists/Playlists';
import Playlist from '../pages/Playlist/Playlist';
import SubContentWrapper from '../../../features/sub-content-wrapper/SubContentWrapper';

const Music = (props) => {
  const scroll = useRef();

  useEffect(() => {
    if (props.setPanelState) { props.setPanelState(false); }
  }, [props.setPanelState]);

  return (
    <div className={styles.music} ref={scroll}>
      {props.isMobile === false && 
        <>
          <Header>
            <Search />
          </Header>
        </>
      }
      <div className={styles.header}>
        <Menu 
          items={[
            {
              'name': 'Songs', 
              'route': '/music'
            }, 
            {
              'name': 'Playlists', 
              'route': '/music/playlists'
            }
          ]}
        />
      </div>
      <div className={styles.content}>
        <SubContentWrapper>
          <Routes>
            <Route 
              path=''
              element={<Songs isMobile={props.isMobile} />} 
            />
            <Route 
              path='/playlists'
              element={<Playlists />} 
            />
            <Route 
              path='/playlists/:id'
              element={<Playlist 
                scroll={scroll}
                isMobile={props.isMobile}
              />} 
            />
          </Routes>
        </SubContentWrapper>
      </div>
    </div>
  )
}

export default Music;