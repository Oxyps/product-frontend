import React, { useState, useEffect } from 'react';

import api from '../services/api';

export default function BatchesDetail(props) {
	const [batch, setBatch] = useState({});

	async function loadBatch() {
		await api.get(`batches/${props.match.params.id}/`)
			.then(response => {
				setBatch(response.data);
			})
			.catch(error => {
				// console.log(error.request.response);
			})
		;
	}

	useEffect(() => {
		loadBatch()
	}, [props]);

	return(
		<div className="container margin-top">
			<p>Código: {batch.code}</p>
			<p>Fabricante: R$ {batch.producer}</p>
			<p>Data de fabricação: {new Date(batch.produce_date).toLocaleDateString()}</p>
			<p>Data de validade: {new Date(batch.shelf_life).toLocaleDateString()}</p>
			<p>Tamanho: {batch.size}</p>
		</div>
	);
}