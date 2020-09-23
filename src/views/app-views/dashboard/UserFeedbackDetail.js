import React, { Component } from 'react'
import MailData from 'assets/data/feedback.json';
import { ReplySVG } from 'assets/svg/icon';
import { labels, getFileType } from './MailLabels';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { Tooltip,Typography,Space,List,Divider } from 'antd';

import { 
	LeftCircleOutlined, 
	StarOutlined, 
	DeleteOutlined, 
	StarFilled, 
	DownloadOutlined ,
	UserOutlined
} from '@ant-design/icons';
import CustomIcon from 'components/util-components/CustomIcon'


export class MaiDetail extends Component {

	state = {
		detail: {},
		starred: false,
		attachment: []
	}

	componentDidMount() {
        const category = this.props.category
		const { id } = this.props.match.params
		const currentId = parseInt(id)
		let data = []
		if(labels.includes(category)) {
			data = MailData.inbox.filter(elm => elm.id === currentId)
		} else {
			data = MailData[category].filter(elm => elm.id === currentId)
		}
		const res = data[0]
		this.setState({
			detail: res,
			starred: res.starred,
			attachment: res.attachment
		})
	}

	tick() {
		this.setState({
			starred: !this.state.starred
		})
	}

	back() {
		this.props.history.goBack()
	}

	getEmoji = rating => {
		switch (rating) {
			case '1':
				return '🙁';
			case '2':
				return '😐';
			case '3':
				return '🙂';
			case '4':
				return '😊';
		}
	}

	render() {

		const { Text, Link,Paragraph } = Typography;
		const { name, email, phone, rating, description,date } = this.state.detail;
		const { attachment } = this.state;
		return (
			<div className="mail-detail">
				<div className="d-lg-flex align-items-center justify-content-between">
					<div className="d-flex align-items-center mb-3">
						<div className="font-size-md mr-3" onClick={()=> {this.back()}}>
							<LeftCircleOutlined className="mail-detail-action-icon font-size-md ml-0" />
						</div>
						
						<AvatarStatus icon={<UserOutlined />} name={name} subTitle={`From: ${email}`}/>
					</div>
					<div className="mail-detail-action mb-3">
						<span className="mr-2 font-size-md">{date}</span>
						<Tooltip title="Reply">
							<CustomIcon className="mail-detail-action-icon" svg={ReplySVG} />
						</Tooltip>
						{/* <Tooltip title="Star" onClick={()=>{this.tick()}}>
							{this.state.starred? <StarFilled className="mail-detail-action-icon star checked" /> : <StarOutlined className="mail-detail-action-icon star" />}
						</Tooltip> */}
						{/* {attachment.length > 0 ? <Tooltip title="Download Attachment"><DownloadOutlined className="mail-detail-action-icon"/></Tooltip> : null} */}
						<Tooltip title="Delete">
							<DeleteOutlined className="mail-detail-action-icon"/>
						</Tooltip>
					</div>
				</div>
				<div className="mail-detail-content">
					<h3 className="mb-4">{this.getEmoji(rating)}</h3>
					<div dangerouslySetInnerHTML={{ __html: description}} />
					
					{/* <Paragraph className="ml-2" >{message}</Paragraph> */}
					<Divider dashed/>
					<div> <Text strong>Name : </Text> {name}</div>
					<div> <Text strong>Email : </Text> {email}</div>
					<div> <Text strong>Phone : </Text> {phone}</div>
					
					{/* <div className="mail-detail-attactment">
						{
							attachment.map( (elm, i) => (
								<div className="mail-detail-attactment-item" key={`attachment-file-${i}`}>
									<span>{getFileType(elm.type)}</span>
									<div className="ml-2">
										<div>{elm.file}</div>
										<div className="text-muted font-size-sm">{elm.size}</div>
									</div>
								</div>
							))
						}
					</div> */}
				</div>
			</div>
		)
	}
}

export default MaiDetail
