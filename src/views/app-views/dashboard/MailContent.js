import React, { Component } from 'react'
import { Route, Switch, } from 'react-router-dom';
import MailItem from './MailItem';
import MailDetail from './MaiDetail';
import MailCompose from './MailCompose';
import ServiceQuote from './ServiceQuote'
import ContactEnquiry from './ContactEnquiry'
import ReportError from './ReportError'
import UserFeedback from './UserFeedback'

export class MailContent extends Component {
	render() {
		const { match } = this.props
		return (
			<Switch>
				{/* <Route path={`${match.url}/compose`} component={MailCompose} /> */}
				<Route path={`${match.url}/:category/:id`} component={MailDetail} />
				<Route exact path={`${match.url}/service_quotes`} component={()=><ServiceQuote category="service_quotes"/>} />
				<Route exact path={`${match.url}/contact_enquiries`} component={()=><ContactEnquiry category="contact_enquiries"/>} />
				<Route exact path={`${match.url}/report_errors`} component={()=><ReportError category="report_errors"/>} />
				<Route exact path={`${match.url}/user_feedbacks`} component={()=><UserFeedback category="user_feedbacks"/>} />
				<Route exact path={`${match.url}/:category`} component={MailItem} />
			</Switch>
		)
	}
}

export default MailContent
