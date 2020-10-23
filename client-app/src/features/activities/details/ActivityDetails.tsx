import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    
    const rootStore = useContext(RootStoreContext);
    const {activity, loadActivity, loadingInitial} =
        rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
        
    }, [loadActivity, match.params.id])

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    if (!activity)
        return <h2>Activity not found</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
