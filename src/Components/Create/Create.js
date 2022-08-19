import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(AuthContext);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState(null);
	const history = useHistory();
	const handleSubmit = () => {
		firebase
			.storage()
			.ref(`/image/${image.name}`)
			.put(image)
			.then(({ ref }) => {
				ref.getDownloadURL().then((url) => {
					const date = new Date();
					firebase.firestore().collection('products').add({
						name,
						category,
						price,
						url,
						userId: user.uid,
						createdAt: date.toDateString(),
					});
					history.push('/');
				});
			});
	};
	return (
		<Fragment>
			<Header />
			<div className="parentDiv">
				<div>
					<div className="centerDiv">
						<h2 className='form-title'>Add product</h2>
						<label htmlFor="name">Product name</label>
						<br />
						<input
							className="input"
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<label htmlFor="category">Category</label>
						<br />
						<input
							className="input"
							type="text"
							id="category"
							name="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<br />
						<label htmlFor="price">Price</label>
						<br />
						<input
							className="input"
							type="number"
							id="price"
							name="price"
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
						<br />
						<br />
						{image && (
							<img
								src={URL.createObjectURL(image)}
								alt="Posts"
								width="200px"
								height="200px"
							></img>
						)}

						<br />
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
						<br />
						<button className="uploadBtn" onClick={handleSubmit}>
							Upload and Submit
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Create;
