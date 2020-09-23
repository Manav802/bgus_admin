import React, { Component } from 'react'
import { Menu, Button, Badge } from 'antd';
import { 
	InboxOutlined, 
	FileTextOutlined, 
	MailOutlined, 
	StarOutlined, 
	DeleteOutlined, 
	EditOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export class MailMenu extends Component {
	render() {
		const { match, location } = this.props
		return (
			<div className="w-100">
				<Menu
				defaultSelectedKeys={`${match.url}/service_quoutes`}
					mode="inline"
					selectedKeys={[location.pathname]}
				>
					<Menu.Item key={`${match.url}/service_quotes`}>
						<InboxOutlined />
						<span>Service Quotes</span>
						<Link to={`${match.url}/service_quotes`}/>
					</Menu.Item>
					<Menu.Item key={`${match.url}/contact_enquiries`}>
						<InboxOutlined />
						<span>Contact Enquiries</span>
						<Link to={`${match.url}/contact_enquiries`}/>
					</Menu.Item>
					<Menu.Item key={`${match.url}/report_errors`}>
						<InboxOutlined />
						<span>Reported Errors</span>
						<Link to={`${match.url}/report_errors`}/>
					</Menu.Item>
					<Menu.Item key={`${match.url}/user_feedback`}>
						<InboxOutlined />
						<span>User Feedbacks</span>
						<Link to={`${match.url}/user_feedback`}/>
					</Menu.Item>
					{/* <Menu.Item key={`${match.url}/sent`}>
						<MailOutlined />
						<span>Sent</span>
						<Link to={`${match.url}/sent`} />
					</Menu.Item>
					<Menu.Item key={`${match.url}/draft`}>
						<FileTextOutlined />
						<span>Draft</span>
						<Link to={`${match.url}/draft`} />
					</Menu.Item>
					<Menu.Item  key={`${match.url}/starred`}>
						<StarOutlined />
						<span>Starred</span>
						<Link to={`${match.url}/starred`}/>
					</Menu.Item> */}
					<Menu.Item  key={`${match.url}/deleted`}>
						<DeleteOutlined />
						<span>Deleted</span>
						<Link to={`${match.url}/deleted`}/>
					</Menu.Item>
					{/* <Menu.ItemGroup title="Labels">
						<Menu.Item key={`${match.url}/works`}>
							<Badge color="blue" />
							<span>Works</span>
							<Link to={`${match.url}/works`}/>
						</Menu.Item>
						<Menu.Item key={`${match.url}/private`}>
							<Badge color="cyan" />
							<span>Private</span>
							<Link to={`${match.url}/private`}/>
						</Menu.Item>
						<Menu.Item key={`${match.url}/important`}>
							<Badge color="red" />
							<span>Important</span>
							<Link to={`${match.url}/important`}/>
						</Menu.Item>
					</Menu.ItemGroup> */}
				</Menu>
			</div>
		)
	}
}

export default MailMenu
