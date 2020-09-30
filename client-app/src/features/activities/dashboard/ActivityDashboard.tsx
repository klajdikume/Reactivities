import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';


const ActivityDashboard: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]); //useEffect runs one time only
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Loading..."/>

    return (
        <Grid>
            <GridColumn width={10}>        
                <ActivityList />
            </GridColumn>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
