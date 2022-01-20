

import {
	Row,
	Col,
	Card,
	Statistic,
	Button,
	List,
	Descriptions,
	Avatar,
	Layout,
} from "antd";
import { Divider } from 'antd';


import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import pay_logo from '../assets/images/payment_logos.png'
const { Header, Footer, Content } = Layout;

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function Payment() {
	const [name, setName] = useState('Mehul')
	const data = [
		{
			title: "Amount",
			value: "₹ 99",
		},
		{
			title: "Name",
			value: "Mr. Dev Patel",
		},
		{
			title: "Email-id",
			value: "dev.patel@gmail.com",
		},
		{
			title: "Mobile",
			value: "+91 9834783982",
		},
		{
			title: "Mode of Consultation",
			value: "Online",
		},
	];
	const data_appointment = [
		{
			title: "Doctor",
			value: "Dr. Rahul Prakash",
		},
		{
			title: "Appointment Time",
			value: "11:15 AM",
		},
		{
			title: "Date",
			value: "26 Jan 2022",
		},
	];
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_0hZp9kVsVmGcXe' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Consultation fee',
			description: 'curabl',
			image: 'http://localhost:1337/logo.png',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				contact: "+919834783982",
				email: 'dev.patel@gmail.com'
			},
			theme: {
				"color": "#086cfc"
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (

		<div className="Payment">
			<Row gutter={[24, 0]}>
				<Col span={24} md={8} className="mb-24">
					<Card
						bordered={false}
						className="header-solid h-full ant-invoice-card"
						title={[<h6 className="font-semibold m-0">Appointment</h6>]}

					>
						<List
							itemLayout="horizontal"
							className="invoice-list"
							dataSource={data_appointment}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										title={item.title}
									/>
									<div className="amount">{item.value}</div>
								</List.Item>
							)}
						/>
						<p></p>
						{/* <Footer style={{ fontWeight: '400', textAlign: 'left', marginTop: "48%"}}> */}
						<Footer style={{ fontWeight: '400', textAlign: 'left', position: 'absolute', bottom: 0 }}>
							* Kindly join at time to avoid any delays
						</Footer>


					</Card>
				</Col>
				<Col span={24} md={8} className="mb-24">
					<Card
						bordered={false}
						className="header-solid h-full ant-invoice-card"
						title={[<h6 className="font-semibold m-0">Payment Summary</h6>]}

					>
						<List
							itemLayout="horizontal"
							className="invoice-list"
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										title={item.title}
									/>
									<div className="amount">{item.value}</div>
								</List.Item>
							)}
						/>
						<p></p>
						<List
							itemLayout="horizontal"
							className="invoice-list"
						>

							<List.Item>
								<List.Item.Meta
									title={<img style={{}} width="350" height="20" src={pay_logo} alt="Logo" />
									}
								/>
								<div className="amount">
									{
										<Button
											type="primary"
											style={{ background: "rgb(74, 112, 246)", }}
											onClick={displayRazorpay}
											target="_blank"
											rel="noopener noreferrer">
											Pay Now
										</Button>
									}
								</div>
							</List.Item>

						</List>


						<Footer style={{ fontWeight: '600', textAlign: 'left' }}>
							<p></p>
							Contact Us
						</Footer>
						<Footer style={{ fontWeight: '300', textAlign: 'left' }}>
							Phone: 9327432847
							<p>Email: admin@curabl.me</p>
						</Footer>
					</Card>
				</Col>
			</Row>
		</div>


	)
}

export default Payment;
