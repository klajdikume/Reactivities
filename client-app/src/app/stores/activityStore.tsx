import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({enforceActions: 'always'})

class ActivityStore {
    @observable actitvityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.actitvityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split('.')[0];
                    this.actitvityRegistry.set(activity.id, activity);
                });
            });

            this.loadingInitial = false;
        } catch(error){

            runInAction('loading activities error', () => {
                console.log(error);
                this.loadingInitial = false;
            })
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectActivity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    getActivity = (id: string) => {
        return this.actitvityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await agent.Activities.create(activity);
                runInAction('creating activity', () => {
                            
                this.actitvityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });

        } catch (error) {
            runInAction('creating activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }
    
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await agent.Activities.update(activity);

            runInAction('editing activity', () => {
                this.actitvityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
                this.submitting = false;
            })

        } catch (error) {
            runInAction('editing activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.actitvityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })


        } catch (error) {
            runInAction('deleting activity error', () => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = false;
        this.activity = undefined;
    }

    @action openEditForm = (id: string) => {
        this.activity = this.actitvityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id: string) => {
        this.activity = this.actitvityRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());
