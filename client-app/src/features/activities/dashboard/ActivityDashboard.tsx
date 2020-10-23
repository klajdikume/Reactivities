import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


const ActivityDashboard: React.FC = () => {
    
    const rootStore = useContext(RootStoreContext);
    const {loadActivities, loadingInitial} = rootStore.activityStore;

    useEffect(() => {
      loadActivities();
    }, [loadActivities]); //useEffect runs one time only
  
    if (loadingInitial) return <LoadingComponent content="Loading..."/>

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
