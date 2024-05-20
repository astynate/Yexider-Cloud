import React from 'react';
import styles from './main.module.css';
import defaultCover from './images/default-playlist-cover.png';
import { convertFromTimespan } from '../../../../../../utils/TimeHandler';
import play from './images/play.png';
import pause from './images/pause.png';
import Loader from '../../../../shared/loader/Loader';
import musicState from '../../../../../../states/music-state';

const Song = ({index, song, isPlaying, isLoading}) => {
    return (
        <div className={styles.song}>
            <div className={styles.name}>
                <span className={styles.index}>{index}</span>
                <div className={styles.albumCover} onClick={() => musicState.SetSongAsPlaying(song.id)}>
                    {isPlaying && <div className={styles.loader}>
                        <div className={styles.barWrapper}>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                        </div>
                    </div>}
                    <div className={styles.playing}>
                        <img src={isPlaying ? pause : play} className={styles.playImage} />
                    </div>
                    {isLoading && <div className={styles.loader}>
                        <Loader />
                    </div>}
                    {song && song.fileAsBytes ?
                        <img
                            src={`data:image/png;base64,${song.fileAsBytes}`} 
                            className={styles.albumCoverImage} 
                            draggable="false" 
                        />
                    :
                        <img 
                            src={defaultCover} 
                            className={styles.albumCoverImage} 
                            draggable="false" 
                        />
                    }
                </div>
                <span className={styles.item}>{song.title ? song.title : song.name}</span>
            </div>
            <span className={styles.item}>{song.artist}</span>
            <span className={styles.item}>{song.plays}</span>
            <span className={styles.item}>{convertFromTimespan(song.duration)}</span>
        </div>
    );
}

export default Song;