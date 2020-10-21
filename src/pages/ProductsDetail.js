import React, { useState, useEffect } from 'react';

import api from '../services/api';

export default function ProductsDetail(props) {
	const [product, setProduct] = useState({
		id: props.match.params.id,
		nome: '',
		preco: '0,00',
		descricao: '',
		batch: ''
	});

	async function loadProduct() {
		await api.get(`products/${product.id}/`)
			.then(response => {
				setProduct(response.data);
			})
			.catch(error => {
				// console.log(error.request.response);
			})
		;
	}

	useEffect(() => {
		loadProduct()
	}, [props]);

	return(
		<div className="container margin-top">
			<p>Nome: {product.nome}</p>
			<p>Preço: R$ {product.preco}</p>
			<p>Descrição: {product.descricao}</p>
			<p>Código do lote: {product.batch}</p>
		</div>
	);
}