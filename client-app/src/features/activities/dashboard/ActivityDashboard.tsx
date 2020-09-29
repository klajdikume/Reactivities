import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore';


const ActivityDashboard: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);
    const {editMode, activity} = activityStore

    return (
        <Grid>
            <GridColumn width={10}>
                
                <ActivityList />
                {/* <List>
                    {activities.map((activity: any) => (
                        <List.Item key={activity.id}>{activity.title}</List.Item>
                    ))}
                </List> */}
            </GridColumn>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
