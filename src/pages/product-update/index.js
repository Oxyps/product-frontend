import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import ProductForm from '../../components/ProductForm';

import './styles.css';

export default function ProductUpdate(props) {
	const history = useHistory();

	const [product, setProduct] = useState({});

	async function loadProduct() {
		await api.get(`products/${props.match.params.id}`)
			.then(response => {
				setProduct(response.data);
			})
			.catch(error => {
				console.log(error);
			})
		;
	};

	async function handleOnSubmit(event) {
		event.preventDefault();

		await api.put(`products/${product.id}/`, product)
			.then(response => {
				console.log(`produto ${response.data} alterado`);
			})
			.catch(error => {
				console.log(error);
			})
	}

	useEffect(() => {
		loadProduct();
	}, []);

    return(
		<>
			<button onClick={history.goBack}>Voltar</button>
			
			<h1>Atualizar produto</h1>
			<ProductForm
				product={product}
				setProduct={setProduct}
				handleOnSubmit={handleOnSubmit}
			/>
		</>
    );
}