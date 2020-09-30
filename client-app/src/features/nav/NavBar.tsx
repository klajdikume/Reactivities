import { observer } from 'mobx-react-lite';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

const NavBar: React.FC = () => {
    
    // const activityStore = useContext(ActivityStore);

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item name='home' as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item name='friends'>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default observer(NavBar);