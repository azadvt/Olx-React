import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { firebase } = useContext(FirebaseContext);
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loginError, setLoginError] = useState(null);
	const handleLogin = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				history.push('/');
			})
			.catch((error) => {
				console.log(error);
				let errorMessage = 'Invalid username or password';
				setLoginError(errorMessage);
			});
	};
	return (
		<div>
			<div className="loginParentDiv">
				<img width="200px" height="200px" src={Logo}></img>
				<Form onSubmit={handleSubmit(handleLogin)}>
					<Form.Field>
						<label htmlFor="fname">Email</label>
						<br />
						<input
							className="input"
							type="email"
							id="email"
							value={email}
							{...register('email', { required: true })}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Field>
					{errors.email?.type === 'required' && (
						<p className="validation-error">Enter email address</p>
					)}
					<br />
					<Form.Field>
						<label htmlFor="password">Password</label>
						<br />
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
						<p className="validation-error">Enter password</p>
					)}
					<br />
					<br />
					{loginError && <p style={{ maxWidth: '100%', color: 'red' }}>{loginError}</p>}
					<Button type="submit">Login</Button>
				</Form>
				<a
					onClick={() => {
						history.push('/signup');
					}}
				>
					Signup
				</a>
			</div>
		</div>
	);
}

export default Login;
