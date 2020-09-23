import React, { Component } from 'react'
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import ServiceQuote from './ServiceQuote'
import ContactEnquiry from './ContactEnquiry'
import ReportError from './ReportError'
import UserFeedback from './UserFeedback'
import ServiceQuoteDetail from './ServiceQuoteDetail'
import ContactEnquiryDetail from './ContactEnquiryDetail'
import ReportErrorDetail from './ReportErrorDetail'
import UserFeedbackDetail from './UserFeedbackDetail'
import Deleted from './Deleted'

export class MailContent extends Component {
	render() {
		const { match } = this.props
		return (
			<Switch>
				{/* <Route path={`${match.url}/compose`} component={MailCompose} /> */}
				<Route path={`${match.url}/service_quotes/:id`} component={(props)=><ServiceQuoteDetail category="service_quotes" {...props}/>} />
				<Route path={`${match.url}/contact_enquiries/:id`} component={(props)=><ContactEnquiryDetail category="contact_enquiries" {...props}/>} />
				<Route path={`${match.url}/report_errors/:id`} component={(props)=><ReportErrorDetail category="report_errors" {...props}/>} />
				<Route path={`${match.url}/user_feedback/:id`} component={(props)=><UserFeedbackDetail category="user_feedback" {...props}/>} />
				{/* <Route path={`${match.url}/:category/:id`} component={MailDetail} /> */}
				<Route exact path={`${match.url}/service_quotes`} component={ServiceQuote} />
				<Route exact path={`${match.url}/contact_enquiries`} component={ContactEnquiry } />
				<Route exact path={`${match.url}/report_errors`} component={ReportError} />
				<Route exact path={`${match.url}/user_feedback`} component={UserFeedback} />
				<Route exact path={`${match.url}/deleted`} component={Deleted} />
				{/* <Route exact path={`${match.url}/:category`} component={MailItem} /> */}
			</Switch>
		)
	}
}

export default MailContent
