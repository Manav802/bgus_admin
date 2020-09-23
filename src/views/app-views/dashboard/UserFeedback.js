import React, { Component } from 'react'
import { Table, Avatar, Badge, Tooltip, Dropdown, Menu, Input } from 'antd';
import { StarOutlined, StarFilled, DeleteOutlined, TagOutlined,UndoOutlined } from '@ant-design/icons';
import userFeedbackData from "assets/data/feedback.json";
import { labels, getLabelColor } from "./MailLabels";
import {withRouter} from 'react-router-dom';
import {fetch, archive} from "../../../services/feedbacks";

export class MailItem extends Component {

	state = {
		mails: [],
		selectedRowKeys: [],
		searchValue: ''
	};
	
	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	};
	
	onStarTicked = elm => {
		const { id, starred } = elm;
		this.setState({
			mails: this.state.mails.map( item => {
				if(item.id === id) {
					item.starred = !starred
					return item
				}
				return item
			})
		})
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
			default: 
				return ''
		}
	}

	formatBody = body => {
		return body.replace(/<(?:.|\n)*?>/gm, ' ');
	}

	componentDidMount() {
		this.loadMail()
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.loadMail()
		}
	}

	loadMail = () => {
		
		fetch(this.props.deleted ? "true" : "false").then(res => {
			console.log(res);
			this.setState({
				mails: res.data.data,
				selectedRowKeys: []
			})
		})
		
		
	}
	massDeleted = (selectedKey, value) => {
		archive(selectedKey, value).then(res => {
			let data = this.state.mails
			selectedKey.forEach(num => {
				data = data.filter(elm => elm._id !== num)
			});
			this.setState({
				mails: data,
				selectedRowKeys: []
			})
		})
		
	}

	massStar = selectedKey => {
		let data = this.state.mails
		selectedKey.forEach(num => {
			data = data.map(elm => {
				if(elm.id === num) {
					elm.starred = true
					return elm
				} else return elm
			})
		});
		this.setState({
			mails: data,
			selectedRowKeys: []
		})
	}

	massCategorize = (label, selectedKey) => {
		let data = this.state.mails
		selectedKey.forEach(num => {
			data = data.map(elm => {
				if(elm.id === num) {
					elm.label = label
					return elm
				} else return elm
			})
		});
		this.setState({
			mails: data,
			selectedRowKeys: []
		})
	}

	onSelectEmail = elm => {
		const { match, history } = this.props
		return {
			onClick: e => {
				e.preventDefault()
				history.push(`${match.url}/${elm.id}`)
			}
		};
	}

	search = e => {
		// let query = e.target.value.toLowerCase();;
		// let data = this.state.mails
		// data = this.state.mails.filter(item => {
		// 	return query === ''? item : item.name.toLowerCase().includes(query) || item.serviceName.toLowerCase().includes(query)
		// });
		// this.setState({
		// 	mails: data
		// });
	}

	getCurrentCategory = () => {
		// Input = Array of objects
		if(this.props.deleted) {
			return userFeedbackData.user_feedback.filter( elm => elm.archived === true )
		}
		
		return userFeedbackData.user_feedback.filter( elm => elm.archived !== true )
	}

	render() {
		const { match, history } = this.props
		const { selectedRowKeys } = this.state;
    const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		const locale = {
      emptyText: (
        <div className="text-center my-5">
          <img src="/img/others/img-10.png" alt="Add credit card"/>
          <h3 className="mt-3 font-weight-light">There is no mail!</h3>
        </div>
      )
    };
		
		const tableColumns = [
			{
				title: () => (
					<div className="mail-list-action">
						<div>
							{	hasSelected? 
								<div>
									{/* <Dropdown  overlay={
										<Menu>
											{
												labels.map( elm => (
													<Menu.Item 
														key={`key-${elm}`} 
														onClick={() => {this.massCategorize(elm, this.state.selectedRowKeys)}}
													>
														<Badge color={getLabelColor(elm)}/>
														<span className="text-capitalize">{elm}</span>
													</Menu.Item>
												))
											}
										</Menu>}
									>
										<span className="mail-list-action-icon ml-0" onClick={e => e.preventDefault()}>
											<TagOutlined />
										</span>
									</Dropdown> */}
									{(this.props.deleted===true) ?
									<span className="mail-list-action-icon ml-0" onClick={() => {this.massDeleted(this.state.selectedRowKeys, false)}}>
										<Tooltip title="Restore">
											<UndoOutlined />
										</Tooltip>
									</span>
									:
									<span className="mail-list-action-icon ml-0" onClick={() => {this.massDeleted(this.state.selectedRowKeys, true)}}>
										<Tooltip title="Delete">
											<DeleteOutlined />
										</Tooltip>
									</span>
									}
									{/* <span className="mail-list-action-icon" onClick={() => {this.massStar(this.state.selectedRowKeys)}}>
									<Tooltip title="Star">
										<StarOutlined />
									</Tooltip>
								</span> */}
								</div>
								:
								null
							}
						</div>
						<div className="pr-lg-3 pr-2">
							<Input size="small" placeholder="Search" onChange={e => {this.search(e)}}/>
						</div>
					</div> 
				),
				colSpan: 4,
				dataIndex: 'name',
				className: 'mail-list-sender',
				render: (_, elm) => (
					<div className="d-flex align-items-center">
						{/* <div 
							onClick={(e) => {
								e.stopPropagation()
								this.onStarTicked(elm)
							}}
						  className={`mail-list-star font-size-md ${elm.starred? 'checked' : 'uncheck'}`}
						>
							{elm.starred? <StarFilled /> : <StarOutlined />}
						</div> */}
						<div className="d-flex align-items-center">
							{/* <Avatar src={elm.avatar} size={30}/> */}
							<h4 className="mb-0 ml-2">{elm.name}</h4>
						</div>
					</div>
				),
			},
			{
				title: '',
				colSpan: 0,
				className: 'mail-list-content',
				render: (_, elm) => (
					<div className=" mail-list-content-msg">
						{/* <Badge color={getLabelColor(elm.label)}/> */}
						{/* <span className="mx-2"> - </span> */}
						<span className="font-weight-semibold text-dark ml-1">{this.getEmoji(elm.rating)}</span>
						<span className="mx-2"> - </span>
						
						<span className="p mb-0">{this.formatBody(elm.description)}</span>
					</div>
				)
			},
			{
				title: '',
				colSpan: 0,
				className: 'mail-list-date',
				render: (_, elm) => (
					<div>{elm.date}</div>
				)
			},
		];

		const hasSelected = selectedRowKeys.length > 0;
		
		return (
			<div className="mail-list">
				<Table 
					rowSelection={rowSelection} 
					columns={tableColumns} 
					dataSource={this.state.mails} 
					locale={locale}
					onRow={(elm) => {
						return {
							onClick: e => {
								e.preventDefault()
								if(this.props.deleted){}
								else{
									history.push({
										pathname:`${match.url}/${elm._id}`,
										data: this.state.mails.filter(mail => mail._id === elm._id)
									})
								}
							}
						};
					}}
					rowKey='_id'
				/>
			</div>
		)
	}
}

export default withRouter(MailItem)
