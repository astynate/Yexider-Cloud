import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../widgets/header/Header';
import { observer } from 'mobx-react-lite';
import Search from '../../../features/search/Search';
import { Route, Routes } from 'react-router-dom';
import Menu from '../../../widgets/menu/Menu';
import styles from './main.module.css';
import Photos from '../pages/Photos/Photos';
import Albums from '../pages/Albums/Albums';
import Range from '../../../shared/range/Range';
import { toJS } from 'mobx';
import SelectItems from '../../../shared/ui-kit/header/select-items/SelectItems.js';
import sort from './images/sort.png';
import grid from './images/grid.png';
import Album from '../pages/Album/Album';
import storageState from '../../../../../states/storage-state';
import FileAPI from '../../../api/FileAPI';

export const GetPhotoById = async (id) => {
  return await toJS(storageState.GetSelectionByType(FileAPI.imageTypes).find(element => element.id === id));
}

const Gallery = observer((props) => {
  const PhotosSortFunctions = [
    {
      "title": "Name",
      "isSelected": false
    },
    {
      "title": "Last edit date",
      "isSelected": true
    }
  ];
  
  const SortingOrder = [
    {
      "title": "Accending",
      "isSelected": true
    },
    {
      "title": "Descending",
      "isSelected": false
    }
  ];

  const Template = [
    {
      "title": "Grid",
      "isSelected": true
    },
    {
      "title": "Waterfalll",
      "isSelected": false
    }
  ];

  const [scale, setScale] = useState(2);
  const [template, setTemplate] = useState(Template);
  const [sortingType, setSortingType] = useState(0);
  const [PhotosSortState, setSortingTypeState] = useState(PhotosSortFunctions);
  const [SortingOrderState, setSortingOrderState] = useState(SortingOrder);
  const scroll = useRef();

  useEffect(() => {
    let type = PhotosSortState
      .find(element => element.isSelected === true);

    let ordingState = SortingOrderState
      .find(element => element.isSelected === true);

    if (type && ordingState) {
      const ordingStateId = ordingState.title === 'Accending';

      if (type.title !== 'Name' && ordingStateId) {
        setSortingType(0);
      } else if (type.title !== 'Name' && ordingStateId === false) {
        setSortingType(1);
      } else if (type.title === 'Name' && ordingStateId) {
        setSortingType(2);
      } else if (type.title === 'Name' && ordingStateId === false) {
        setSortingType(3);
      }
    }
  }, [PhotosSortState, SortingOrderState]);

  useEffect(() => {
    if (props.setPanelState) {
        props.setPanelState(false);
    }
  }, [props.setPanelState]);

  return (
    <div className={styles.gallery} ref={scroll}>
        <Header />
        <Search />
        <div className={styles.header}>
          <div className={styles.up}>
              <div className={styles.rangeWrapper}>
                <Range
                  min={1}
                  max={5}
                  value={scale}
                  setValue={setScale}
                  inc={1}
                />
              </div>
              <Menu 
                items={[
                  {
                    'name': 'Photos', 
                    'route': '/gallery'
                  }, 
                  {
                    'name': 'Albums', 
                    'route': '/gallery/albums'
                  }
                ]}
              />
            {!props.isMobile && <div className={styles.buttons}>
              <SelectItems 
                icon={sort}
                items={[PhotosSortState, SortingOrderState]}
                states={[setSortingTypeState, setSortingOrderState]}
              />
              <SelectItems icon={grid} 
                items={[template]}
                states={[setTemplate]}
              />
            </div>}
          </div>
        </div>
        <div className={styles.content}>
          <Routes>
            <Route 
              path=''
              element={
                <Photos 
                  photoGrid={template} 
                  scale={scale}
                  scroll={scroll}
                  sortingType={sortingType}
              />} 
            />
            <Route 
              path='/albums' 
              element={<Albums />} 
              photoGrid={template} 
            />
            <Route 
              path='/albums/:id' 
              element={<Album 
                photoGrid={template} 
                scale={scale}
                scroll={scroll} 
              />} 
              photoGrid={template} 
              scroll={scroll}
            />
          </Routes>
        </div>
    </div>
  )
});

export default Gallery;