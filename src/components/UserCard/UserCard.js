
import React from 'react';
import { Avatar, Card } from '@mui/material';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    card: {
        width: 'fit-content',
    },
    profilePaper: {
        display: 'flex',
        width: '50%',
        marginLeft: '20%',
        height: '10rem',
        backgroundColor: '#A267AC',
    },
    ava: {
        width: '100%',
        // height: '50%',
        margin: 30,
    },
    profileInfo: {
        backgroundColor: '#A267AC',
        color: '#fff',
    },
    profileName: { backgroundColor: '#A267AC', color: '#fff' },
    profileLink: { backgroundColor: '#A267AC', color: '#fff' },
}));

export default function UserCard({ userPicture, userId, userName, likedChars }) {
    const classes = useStyles();

    return (
        <Paper className={classes.profilePaper} key={userId}>
            <Avatar
                className={classes.ava}
                alt='user'
                src={userPicture}
            />
            <Card className={classes.profileCard}>
                <h3 className={classes.profileName}>{userName}</h3>
                <h2
                    className={
                        classes.profileInfo
                    }>a
                    {/* {`you liked ${likedChars.length} characters`} */}
                </h2>
                {/* <a
                    className={classes.profileLink}
                // onClick={agreedFunc}
                > */}
                {/* click here if you would like to see them */}
                {/* </a> */}
            </Card>
        </Paper >);
}
