import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.css';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import galleryState from '../../../../../../states/gallery-state';
import Scroll from '../../../../widgets/scroll/Scroll';
import Placeholder from '../../../../shared/placeholder/Placeholder';
import Loader from '../../../../shared/loader/Loader';
import { ConvertDate } from '../../../../../../utils/DateHandler';
import PhotoList from '../../shared/photo-list/PhotoList';
import UserAvatar from '../../../../widgets/avatars/user-avatar/UserAvatar';
import AddUser from '../../../../widgets/avatars/add-user/AddUser';
import LocalMenu from '../../../../shared/ui-kit/local-menu/LocalMenu';
import Comments from '../../../../widgets/social/comments/Comments';
import Button from '../../../../shared/ui-kit/button/Button';
import OpenAccessProcess from '../../../../process/open-access/OpenAccessProcess';
import { DeleteComment } from '../../api/AlbumRequests';
import AddInGallery from '../../widgets/add/AddInGallery';
import HeaderSearch from './compontens/header-search/HeaderSearch';
import emoji from './images/emoji.png';
import BurgerMenu from '../../../../shared/ui-kit/burger-menu/BurgerMenu';
import Reaction from '../../../../shared/ui-kit/reaction/Reaction';

const AlbumView = observer((props) => {
    const { albums } = galleryState;
    const params = useParams();
    const wrapper = useRef();
    const [isUsersLoading, setUsersLoadingState] = useState(true);
    const [isOpenAccessWindow, setOpenAccessWindowState] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            await galleryState.GetAlbums(); 
            await galleryState.GetAlbumPhotos(params.id);
        };

        fetchAlbums();
    }, []);

    useEffect(() => {
        props.setAlbumId(params.id);
    }, [params]);

    const accessSaveCallback = (data) => {
        if (data) {
            galleryState.SetAlbumAccess(data, params.id);
        }
    }

    return (
        <div className={styles.album}>
            {!albums[params.id] ?
                <div className={styles.albumPlaceholder}>
                    <Loader />
                </div>
            : 
                <>
                    <div className={styles.header}>
                        <div className={styles.information}>
                            <img 
                                src={`data:image/png;base64,${albums[params.id].cover}`} 
                                className={styles.cover}
                                draggable="false"
                            />
                            <div className={styles.control}>
                                <div className={styles.nameWrapper}>
                                    <span className={styles.albumDate}>{ConvertDate(albums[params.id].creationTime)}</span>
                                    <h1 className={styles.albumName}>{albums[params.id].name}</h1>
                                </div>
                                {albums[params.id].description && 
                                    <div className={styles.descriptionWrapper}>
                                        <span className={styles.descritpion}>
                                            <span className={styles.views}>0</span> Views&nbsp;&nbsp;•&nbsp;&nbsp;<span className={styles.views}>0</span> Reactions
                                        </span>
                                        <span className={styles.descritpion}>{albums[params.id].description}</span>
                                    </div>
                                }
                                <div className={styles.controlPanel}>
                                    <Button value="Follow" />
                                    <img
                                        src={emoji}
                                        className={styles.subButton} 
                                    />
                                    <BurgerMenu 
                                        items={[
                                            {title: "astynate", callback: () => {}}
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.addition}>
                            <div className={styles.users}>
                                {isUsersLoading ? 
                                    <>
                                        <div className={styles.avatarPlaceholder}></div>
                                        <div className={styles.avatarPlaceholder}></div>
                                        <div className={styles.avatarPlaceholder}></div>
                                    </>
                                : 
                                    <>
                                        {galleryState.albums && galleryState.albums[params.id] && galleryState.albums[params.id].users && galleryState.albums[params.id].users.map
                                            && galleryState.albums[params.id].users.map((element, index) => {
                                                if (element.user) {
                                                    let user = element.user;
                                                    user.avatar = element.base64Avatar;
                                                
                                                    return (
                                                        <UserAvatar key={index} user={user} />
                                                    )
                                                } else {
                                                    return null;
                                                }
                                            })
                                        }
                                        <AddUser callback={() => setOpenAccessWindowState(true)} />   
                                    </>
                                }
                            </div>
                            <div className={styles.reactions}>
                                {/* <Reaction /> */}
                                {/* <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction />
                                <Reaction /> */}
                            </div>
                        </div>
                    </div>
                    <OpenAccessProcess
                        id={params.id}
                        open={isOpenAccessWindow}
                        close={() => setOpenAccessWindowState(false)}
                        setLoadingState={setUsersLoadingState}
                        endPoint={'api/album-access'}
                        accessSaveCallback={accessSaveCallback}
                    />
                    <LocalMenu 
                        items={[
                            {'title': "Photos", 'component': 
                                <div className={styles.contentWrapper}>
                                    <div className={styles.content}>
                                        <AddInGallery id={params.id} />
                                        {!albums[params.id].photos || albums[params.id].photos.length === 0 ?
                                            <div className={styles.noImages}>
                                                <Placeholder title="No photos uploaded" />
                                            </div>  
                                        :
                                            <>
                                                <PhotoList
                                                    photos={galleryState.albums && galleryState.albums[params.id] && galleryState.albums[params.id].photos ? 
                                                        galleryState.albums[params.id].photos : []} 
                                                    scale={props.scale}
                                                    photoGrid={props.photoGrid}
                                                    forwardRef={wrapper}
                                                />
                                            </>
                                        }
                                        <Scroll
                                            scroll={props.scroll}
                                            isHasMore={galleryState.albums[params.id].hasMore}
                                            count={galleryState.albums[params.id].photos.length}
                                            callback={async () => {
                                                await galleryState.GetAlbumPhotos(params.id);
                                            }}
                                        />
                                    </div>
                                </div>
                            },
                            {'title': "Comments", "component": 
                                <div className={styles.contentWrapper}>
                                    <div className={styles.content}>
                                        <Comments 
                                            fetch_callback={() => galleryState.GetAlbumComments(params.id)}
                                            comments={galleryState.albums[params.id].comments ? 
                                                galleryState.albums[params.id].comments : []}
                                            id={params.id}
                                            setUploadingComment={galleryState.AddUploadingAlbumComment.bind(galleryState)}
                                            deleteCallback={(id) => DeleteComment(id, params.id)}
                                        />
                                    </div>
                                </div>
                            }
                        ]}
                        default={0}
                        rightItems={[
                            (<HeaderSearch 
                                placeholder={"Search photo by name"}
                            />)
                        ]}
                    />
                </>
            }
        </div>
    );
});

export default AlbumView;