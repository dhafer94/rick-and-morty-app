import React from 'react';
import ReactWindowTable from '../ReactWindowTable/ReactWindowTable';
import { Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({
    tableContainer: {
        display: 'flex',
        flex: 1,
        border: '4px solid #6867AC',
        borderRadius: '5px',
        // background: '#6867AC',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    linkUl: { listStyle: 'none' },
    button: {
        color: '#fff',
    },
    container: {
        flex: 'row',
        flexGrow: 1,
        height: '30rem',
        width: '50%',
        padding: '0 5%',
        // paddingBottom: '1%',
    },
    paper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#a5fc94',
    },
}));

export default function Interactions({ likedChars, clickHandler, homeFunc }) {
    const classes = useStyles();

    const columns = [
        {
            label: 'Name',
            dataKey: 'charName',
        },
        {
            label: 'Status',
            dataKey: 'charStatus',
        },
    ];


    return (

        <Grid container>
            <Grid container className={classes.nav}>
                <ul className={classes.linkUl}>
                    <li>
                        <a
                            onClick={homeFunc}
                            className={classes.link}
                            href=''>
                            <HomeIcon fontSize='large' className={classes.button} />
                        </a>
                    </li>
                </ul>
            </Grid>
            <Grid item xs={12} className={classes.listSection}>
                <Container maxWidth='lg' className={classes.container}>
                    <Paper className={classes.paper}>
                        <ReactWindowTable
                            data={likedChars}
                            columns={columns}
                            clickHandler={clickHandler}
                        />
                    </Paper>
                </Container>
            </Grid>
        </Grid>


    );

};;