import React, { Component } from 'react'
import SideBarHeader from '../SideBarHeader/SideBarHeader'
import Subscription from './Subscription/Subscription'
import { Divider } from 'semantic-ui-react'

class Subscriptions extends Component {
    render() {
        return (
            <React.Fragment>

                <SideBarHeader title="Subscriptions" />
                <Subscription label='MusicChannel' broadCasting />
                <Subscription label='Coursea' amountNewVideos={10} />
                <Subscription label='TEDx Talks' amountNewVideos={23} />
                <Subscription label='Stanford iOS' amountNewVideos={4} />
                <Subscription label='Udacity' amountNewVideos={114} />
                <Divider />
            </React.Fragment>
        )
    }
}


export default Subscriptions
