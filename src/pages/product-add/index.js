import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import ProductForm from '../../components/ProductForm';

import './styles.css';

export default function ProductAdd() {
	const history = useHistory();

	const [product, setProduct] = useState({});

	async function handleOnSubmit(event) {
		event.preventDefault();

		await api.post('products/', product)
			.then(response => {
				console.log(`produto ${response.data} adicionado`);
			})
			.catch(error => {
				console.log(error);
			})
	}

    return(
		<>
			<button onClick={history.goBack}>Voltar</button>

			<h1>Adicionar produto</h1>
			<ProductForm
				product={product}
				setProduct={setProduct}
				handleOnSubmit={handleOnSubmit}
			/>
		</>
    );
}