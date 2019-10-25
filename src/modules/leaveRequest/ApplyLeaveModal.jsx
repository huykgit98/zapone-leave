import React, { Component } from 'react';
import {
	Card,
	Form,
	DatePicker,
	Select,
	Input,
	Calendar,
	List,
	Avatar,
	Row,
	Col,
	Button,
	Icon,
	Modal,
	Alert
} from 'antd';
const { RangePicker } = DatePicker;
const moment = require('moment');
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const OPTIONS = [
	{ username: 'naveen', name: 'Naveen', email: 'naveen@gmail.com' },
	{ username: 'avinash', name: 'Avinash', email: 'avinash@gmail.com' },
	{ username: 'dishal', name: 'Vishal', email: 'vishal@gmail.com' },
	{ username: 'dipak', name: 'Dipak', email: 'dipak@gmail.com' }
];

class ApplyLeaveModal extends Component {
	state = {
		noOfDays: 0,
		selectedItems: []
	};

	handleNotifyPeople = (selectedItems) => {
		this.setState({ selectedItems });
	};

	handleChange(value) {
		console.log(`selected ${value}`);
	}

	onCalendarChange(dates) {
		this.setState({
			noOfDays: Math.abs(moment(dates[1]).diff(dates[0], 'days') + 1)
		});
	}

	disabledDate(current) {
		return moment(current).add(1, 'days') < moment().endOf('day');
	}

	render() {
		const { selectedItems } = this.state;

		return (
			<Modal
				centered
				title={`Apply Leave for ${this.state.noOfDays} Day(s)`}
				width={'50%'}
				footer={false}
				visible={this.props.visible}
				onOk={() => this.props.handleModalVisibility(false)}
				onCancel={() => this.props.handleModalVisibility(false)}
			>
				<Row type="flex" gutter={16}>
					<Col span={12}>
						<RangePicker
							className="width-100"
							disabledDate={this.disabledDate}
							onCalendarChange={this.onCalendarChange.bind(this)}
							format={'DD/MM/YYYY'}
						/>
						{this.state.noOfDays > 0 && (
							<Alert
								className="mt"
								message={`Leave Request is for ${this.state.noOfDays} day(s)`}
								type="warning"
							/>
						)}
						<p className="text-dimmed mt font-small m0">Select Leave Type</p>
						<Select
							optionLabelProp="label"
							showSearch={true}
							placeholder="Choose Leave Type"
							allowClear={true}
							autoClearSearchValue={true}
							style={{ width: '100%' }}
							onChange={this.handleChange}
						>
							<OptGroup label="General">
								<Option value="marrige-leave" label="Marriage Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="close-circle" className="text-red" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Marriage Leave (7 days remaining)</p>
											<p className="text-dimmed font-small m0 text-red">
												Minimun prior notice of 30 calendar.
											</p>
										</Col>
									</Row>
								</Option>
								<Option value="office-leave" label="On Office Duty" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="check-circle" className="text-green" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">On Office Duty (Infinite Balance)</p>
										</Col>
									</Row>
								</Option>
								<Option value="paid-leave" label="Paid Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="close-circle" className="text-red" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Paid Leave (11 days remaining)</p>
											<p className="text-dimmed font-small m0 text-red">
												Minimun prior notice of 5 calendar.
											</p>
										</Col>
									</Row>
								</Option>
								<Option value="unpaid-leave" label="Unpaid Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="close-circle" className="text-red" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Unpaid Leave (42 days remaining)</p>
											<p className="text-dimmed font-small m0 text-red">
												Minimun prior notice of 7 calendar.
											</p>
										</Col>
									</Row>
								</Option>
								<Option value="sick-leave" label="Sick Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="check-circle" className="text-green" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Sick Leave (42 days remaining)</p>
											<p className="text-dimmed font-small m0 text-red">
												Minimun prior notice of 7 calendar.
											</p>
										</Col>
									</Row>
								</Option>
							</OptGroup>
							<OptGroup label="Others">
								<Option value="bereavement-leave" label="Bereavement Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="check-circle" className="text-green" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Bereavement Leave (5 days remaining)</p>
										</Col>
									</Row>
								</Option>
								<Option value="paternity-leave" label="Paternity Leave" gutter={2}>
									<Row type="flex">
										<Col span={2} className="justify-center align-center">
											<Icon type="close-circle" className="text-red" />
										</Col>
										<Col span={22}>
											<p className="text-dark m0">Paternity Leave (7 days remaining)</p>
											<p className="text-dimmed font-small m0 text-red">
												Minimun prior notice of 7 calendar.
											</p>
										</Col>
									</Row>
								</Option>
							</OptGroup>
						</Select>
						<p className="text-dimmed mt font-small m0">Note</p>
						<TextArea placeholder="Please enter reason for applying leave" rows={4} />
						<p className="text-dimmed mt font-small m0">Notify</p>
						<Select
							mode="multiple"
							placeholder="Select whom to notify"
							value={selectedItems}
							onChange={this.handleNotifyPeople}
							style={{ width: '100%' }}
						>
							{OPTIONS.map((item) => (
								<Select.Option key={item.username} value={item.username}>
									{item.name}
								</Select.Option>
							))}
						</Select>
						<p className="text-dimmed font-tiny mt">
							Note: These employees will be notified through email when your leave request is approved.
						</p>
						<Row type="flex" style={{ 'justify-content': 'flex-end' }}>
							<Col>
								<Button> Cancel </Button>
								<Button type="primary" className="ml">
									{' '}
									Apply{' '}
								</Button>
							</Col>
						</Row>
					</Col>
					<Col span={10}>
						{this.props.visible && <DatePicker open={true} className="width-100" style={{ visibility: 'hidden'}} />}
					</Col>
				</Row>
			</Modal>
		);
	}
}
export default ApplyLeaveModal;