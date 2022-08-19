import React, { useState, useEffect, useContext } from 'react';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { ProductContext } from '../../store/ProductContext';
import './Products.css';
import { useHistory } from 'react-router-dom';


function Products() {
	const [products, setProducts] = useState([]);
	const { firebase } = useContext(FirebaseContext);
	const { setProductDetails } = useContext(ProductContext);
	const history = useHistory();
	useEffect(() => {
		firebase
			.firestore()
			.collection('products')
			.get()
			.then((snapshot) => {
				const products = snapshot.docs.map((product) => {
					return {
						id: product.id,
						...product.data(),
					};
				});
				setProducts(products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return products.length > 0 ? (
		<div className="postParentDiv">
			<div className="moreView">
				<div className="heading">
					<span>Quick Menu</span>
					<span>View more</span>
				</div>
				<div className="cards">
					{products.map((product, index) => {
						return (
							<div
								key={index}
								className="card"
								onClick={() => {
									setProductDetails(product);
									history.push('/view');
								}}
								style={{ cursor: 'pointer' }}
							>
								<div className="favorite">
									<Heart></Heart>
								</div>
								<div className="image">
									<img src={product.url} alt="" />
								</div>
								<div className="content">
									<p className="price">&#x20B9; {product.price}</p>
									<span className="cateogory">{product.category}</span>
									<p className="name"> {product.name}</p>
								</div>
								<div className="date">
									<span>{product.createdAt}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	) : null;
}

export default Products;
