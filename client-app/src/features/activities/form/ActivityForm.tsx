import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { ActivityFormValues, IActivityFormValues } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import { v4 as uuid } from 'uuid';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

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

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then(
                    (activity) => setActivity(new ActivityFormValues(activity))
                ).finally(() => setLoading(false));
        }
    }, [
        loadActivity,
        match.params.id
    ]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        if (!activity.id) {
            let newActivity ={
                ...activity,
                id: uuid()
            };

            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                    validate={validate}
                    initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
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
                                <Button 
                                    loading={submitting} 
                                    floated='right' 
                                    positive 
                                    type='submit' 
                                    content='Submit'
                                    disabled={loading || invalid || pristine}
                                />
                                <Button 
                                    onClick={
                                        activity.id 
                                        ? () => history.push(`/activities/${activity.id}`) 
                                        : () => history.push('/activities')
                                    }
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                    disabled={loading}
                                />
                            </Form>
                        )}
                    />
                    
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);