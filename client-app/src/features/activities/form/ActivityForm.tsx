import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { IActivityFormValues } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';

interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {

    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>({
        id: undefined,
        title: '',
        category: '',
        description: '',
        date: undefined,
        time: undefined,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && !activity.id) {
            loadActivity(match.params.id)
                .then(() => initialFormState && setActivity(initialFormState));
        }
        return () => {
            clearActivity();
        }
    }, [loadActivity, match.params.id, clearActivity, initialFormState, activity.id]);

    // const handleSubmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     }else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;

        console.log(activity);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field  
                                    name='title' 
                                    placeholder='Title' 
                                    value={activity.title}
                                    // component={TextInput}
                                />
                                <Field
                                    name='description' 
                                    rows={2} 
                                    placeholder='Description' 
                                    value={activity.description}
                                    //component={TextAreaInput}
                                />
                                <Field
                                    name='Category' 
                                    placeholder='Category' 
                                    value={activity.category}
                                    options={category}
                                    //component={SelectInput}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        // component={DateInput}
                                        name='date' 
                                        placeholder='Date' 
                                        value={activity.date}
                                        date={true}
                                    />
                                    <Field
                                        // component={DateInput}
                                        name='time'
                                        time={true} 
                                        placeholder='Time' 
                                        value={activity.time}
                                    />
                                </Form.Group>
                                
                                <Field
                                    name='City' 
                                    placeholder='City' 
                                    value={activity.city}
                                   // component={TextInput}
                                />
                                <Field 
                                    name='Venue' 
                                    placeholder='Venue' 
                                    value={activity.venue}
                                   // component={TextInput}
                                />
                                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                                <Button onClick={() => history.push('/activities')} floated='right' type='button' content='Cancel'/>
                            </Form>
                        )}
                    />
                    
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);