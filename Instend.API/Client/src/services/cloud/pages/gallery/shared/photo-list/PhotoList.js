import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import Preview from '../../../../../preview/layout/Preview';
import { instance } from '../../../../../../state/Interceptors';
import { DownloadFromResponse } from '../../../../../../utils/DownloadFromResponse';
import SelectBox from '../../../../shared/interaction/select-box/SelectBox';
import galleryState from '../../../../../../states/gallery-state';
import AddToAlbum from '../../../../process/add-to-album/AddToAlbum';
import { Delete } from '../../../cloud/api/FolderRequests';
import Loader from '../../../../shared/loader/Loader';
import { AddPhotosInAlbum } from '../../api/GalleryRequests';
import { observer } from 'mobx-react-lite';
import applicationState from '../../../../../../states/application-state';
import Photo from '../../elements/photo/Photo';

const PhotoList = observer((props) => {
    const [gridTemplateColumns, setGridTemplateColumns] = useState('repeat(auto-fill, minmax(200px, 1fr))');
    const [columnCount, setColumnCount] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isPreview, setPreviewState] = useState(false);
    const [activeItems, setActiveItems] = useState([]);
    const [isAddToAlbumOpen, setAddToAlbumState] = useState(false);
    const [current, setCurrent] = useState(0);
    const [curentIndex, setCurrentIndex] = useState(0);

    const single = [
        [null, "Open", () => {setPreviewState(true)}],
        [null, "Add to album", () => {setAddToAlbumState(true)}],
        [null, "Download", async () => {
            await instance
                .get(`/file/download?id=${activeItems[0].id}`, {
                    responseType: "blob"
                })
                .then((response) => {
                    DownloadFromResponse(response);
                })
                .catch((error) => {
                    console.error(error);
                    // ErrorMessage('Attention!', 'Something went wrong');
                });
        }],
        [null, "Delete", () => {
            setActiveItems(prev => {
                Delete(prev);  
                return prev;
            })
        }]
    ]

    const multiple = [
        [null, "Add to album", () => {setAddToAlbumState(true)}],
        [null, "Delete", () => {
            setActiveItems(prev => {
                Delete(prev);
                return prev;
            })
        }]
    ]

    useEffect(() => {
        const current = props.photoGrid
            .findIndex(element => element.isSelected === true);

        if (current === -1) {
            setCurrent(0);
            setGridTemplateColumns(`repeat(auto-fill, minmax(${100 + 25 * props.scale}px, 1fr))`);
            setColumnCount(null);
            return;
        }

        if (current === 0) {
            setCurrent(current);
            setGridTemplateColumns(`repeat(auto-fill, minmax(${100 + 25 * props.scale}px, 1fr))`);
            setColumnCount(null);
        } else if (current === 1) {
            setCurrent(current);
            setGridTemplateColumns(null);
            setColumnCount(8 - props.scale);
        }
    
    }, [props.scale, props.photoGrid]);

    useEffect(() => {
        const fetchData = async () => {
            await galleryState.GetAlbums();
        }

        fetchData();
    }, []);

    return (
        <>
            {isPreview && 
                <Preview
                    close={() => setPreviewState(false)} 
                    files={props.photos}
                    index={curentIndex}
                />}
            <AddToAlbum
                open={isAddToAlbumOpen}
                close={() => setAddToAlbumState(false)}
                add={(selected) => {
                    setActiveItems(prev => {
                        AddPhotosInAlbum(selected, prev);
                        return prev;
                    });
                }}
                albums={galleryState.albums}
            />
            <div 
                className={styles.photos} 
                id={current === 1 ? 'waterfall' : 'grid'} 
                style={{ gridTemplateColumns: applicationState.isMobile ? 'repeat(auto-fill, minmax(100px, 1fr))' :  gridTemplateColumns, columnCount }} 
                ref={props.forwardRef}
            >
                {props.photos && props.photos.map && props.photos.map((element, index) => {
                    if (!element) {
                        return null;
                    }

                    if (element && element.isLoading && element.isLoading === true) {
                        return (
                            <div 
                                key={index} 
                                className={styles.photoWrapper}
                                data={null}
                                id="loadingPhoto"
                            >
                                <Loader />
                            </div>  
                        );
                    }
                        
                    return (
                        <Photo
                            key={element.id}
                            element={element}
                            setSelectedFiles={props.setSelectedFiles}
                            onContextMenu={() => setCurrentIndex(index)}
                        />
                    );
                })}
            </div>
            <SelectBox 
                selectPlace={[props.forwardRef]}
                selectedItems={[selectedItems, setSelectedItems]}
                activeItems={[activeItems, setActiveItems]}
                itemsWrapper={props.forwardRef}
                items={props.photos}
                single={single}
                multiple={multiple}
            />
        </>
    );
});

export default PhotoList;