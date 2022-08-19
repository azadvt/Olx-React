import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { ProductContext } from '../../store/ProductContext';

import './View.css';
function View() {
	const [userDetails, setUserDetails] = useState();
	const { ProductDetails } = useContext(ProductContext);
	const { firebase } = useContext(FirebaseContext);
	useEffect(() => {
		const { userId } = ProductDetails;
		firebase
			.firestore()
			.collection('users')
			.where('id', '==', userId)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					setUserDetails(doc.data());
				});
			}).catch((error)=>{
				console.log(error)
			});
	}, []);

	return (
		<div className="viewParentDiv">
			<div className="imageShowDiv">
				<img src={ProductDetails.url} alt="" />
			</div>
			<div className="rightSection">
				<div className="productDetails">
				<p>{ProductDetails.name}</p>
					<p>&#x20B9; {ProductDetails.price} </p>
					<p>{ProductDetails.category}</p>
					<span>{ProductDetails.addedDate}</span>
				</div>
				{userDetails && (
					<div className="contactDetails">
						<p>Seller Details</p>
						<p>{userDetails.username}</p>
						<p>{userDetails.phone}</p>
					</div>
				)}
			</div>
		</div>
	);
}
export default View;
