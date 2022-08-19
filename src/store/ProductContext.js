import { createContext, useState } from 'react';
export const ProductContext = createContext(null);

function Product({ children }) {
	const [ProductDetails, setProductDetails] = useState();
	return (
		<ProductContext.Provider value={{ ProductDetails, setProductDetails }}>
			{children}
		</ProductContext.Provider>
	);
}

export default Product;
