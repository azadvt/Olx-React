import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

export default function Signup() {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const { firebase } = useContext(FirebaseContext);
	const handleSignup = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				response.user.updateProfile({ displayName: username }).then(() => {
					firebase
						.firestore()
						.collection('users')
						.add({ id: response.user.uid, username, phone })
						.then(() => {
							history.push('/login');
						});
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<div className="signupParentDiv">
				<img width="200px" height="200px" src={Logo}></img>
				<Form onSubmit={handleSubmit(handleSignup)}>
					<label htmlFor="usename">Username</label>
					<Form.Field>
						<input
							className="input"
							type="text"
							id="username"
							value={username}
							{...register('username', { required: true })}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Field>
					{errors.username?.type === 'required' && (
						<p className="validation-error">Enter username</p>
					)}
					<br />
					<label htmlFor="email">Email</label>

					<Form.Field>
						<input
							className="input"
							type="email"
							id="email"
							name="email"
							value={email}
							{...register('email', { required: true })}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Field>
					{errors.email?.type === 'required' && (
						<p className="validation-error">Enter email address</p>
					)}
							<br />
					<label htmlFor="phone">Phone</label>

					<Form.Field>
						<input
							className="input"
							type="number"
							id="phone"
							name="phone"
							value={phone}
							{...register('phone', { required: true })}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</Form.Field>

					{errors.phone?.type === 'required' && (
						<p className="validation-error">Enter phone number</p>
					)}
							<br />
					<label htmlFor="password">Password</label>

					<Form.Field>
						<input
							className="input"
							type="password"
							id="password"
							name="password"
							value={password}
							{...register('password', { required: true })}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Field>
					{errors.password?.type === 'required' && (
						<p className="validation-error">Enter password number</p>
					)}

					<Button type='submit'>Signup</Button>
				</Form>
				<a
					onClick={() => {
						history.push('/login');
					}}
				>
					Login
				</a>
			</div>
		</div>
	);
}
