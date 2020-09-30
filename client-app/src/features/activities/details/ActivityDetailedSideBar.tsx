import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, List, Segment, Image } from 'semantic-ui-react'

const ActivityDetailedSideBar = () => {
    return (
        <Fragment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                3 People Going
            </Segment>
            <Segment attached>
                <List>
                    <Item style={{ position: 'relative'}}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header>
                                <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative'}}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header>
                                <Link to={`#`}>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                </List>
            </Segment>
        </Fragment>
    )
}

export default observer(ActivityDetailedSideBar);