import React, { useContext } from 'react';
import styles from './main.module.css';
import { OpenAccessContext } from '../../../../process/open-access/OpenAccessProcess';
import Select from '../select/Select';
import Loader from '../../../loader/Loader';

const Friends = (props) => {
    const context = useContext(OpenAccessContext);

    const AddUser = (id) => {
        const user = context.searchUsers.find(x => x.id === id);

        if (user) {
            context.setUsers((prev) => {
                user.ability = 0;
                return [...prev, user];
            });
            context.setSearchUsers((prev) => {
                return prev.filter(x => x.id !== id);
            });
        }
    };
    
    return (
        <div className={styles.friends}>
            {props.isLoading ?
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            : null}
            {context.searchUsers && context.searchUsers.map ? 
                context.searchUsers.filter(x => context.users.map(user => user.id).includes(x.id) == false).map((user, index) =>
                    <div className={styles.friend} key={index}>
                        <img className={styles.avatar} src={`data:image/png;base64,${user.avatar}`} />
                        <div className={styles.description}>
                            <span className={styles.username}>{user.nickname}</span>
                            <span className={styles.fullname}>{user.name} {user.surname}</span>
                        </div>
                        <div className={styles.button} onClick={() => AddUser(user.id)}>
                            <span>Add</span>
                        </div>
                    </div>
                )
            : null}
            {context.users ?
                context.users.map((user, index) =>
                    <div className={styles.friend} key={index}>
                        <img className={styles.avatar} src={`data:image/png;base64,${user.avatar}`} />
                        <div className={styles.description}>
                            <span className={styles.username}>{user.nickname}</span>
                            <span className={styles.fullname}>{user.name} {user.surname}</span>
                        </div>
                        <div className={styles.select}>
                            <Select
                                items={[
                                    "Read",
                                    "Edit",
                                    "Delete"
                                ]}
                                current={user.ability}
                                setCurrent={(state) => {
                                    context.setUsers((prev) => {
                                        prev.find(x => x.id === user.id).ability = state;
                                        return prev;
                                    });
                                    user.ability = state;
                                }}
                                callbacks={[
                                    () => {},
                                    () => {},
                                    () => {
                                        context.setUsers((prev) => {
                                            return prev.filter(x => x.id !== user.id);
                                        }); 
                                    }
                                ]}
                            />
                        </div>
                    </div>
                )
            : null}
        </div>
    );
};

export default Friends;