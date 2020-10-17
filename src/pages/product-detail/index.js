import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function ProductDetail(props) {
	const id = props.match.params.id;
	
	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState(null);
	const [descricao, setDescricao] = useState('');
	// const [imageUrl, setImageUrl] = useState('');

	async function loadProduct() {
		await api.get(`products/${id}`)
			.then(response => {
				setNome(response.data.nome);
				setPreco(response.data.preco);
				setDescricao(response.data.descricao);
				// setImageUrl(response.data.image_url);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	async function handleDelete() {
		const response = await api.delete(`/products/${id}`);
		
		if(response)
			// toast.success('Produto deletada com sucesso!');
			console.log('Produto deletada com sucesso!');
		else
			// toast.warn('Algo de errado aconteceu.. chame o desenvolvedor!');
			console.log('Algo de errado aconteceu.. chame o desenvolvedor!');

		setTimeout(() => window.location.href= '/products', 200);
	}

	useEffect(() => {
		loadProduct();
	}, []);

    return(
		<>
			<button onClick={props.history.goBack}>Voltar</button>

			<article>
				{/* <img src={imageUrl} alt={nome} /> */}
				<h1>Nome: {nome}</h1>
				<strong>Preço: R$ {preco}</strong>
				<p>Descrição: {descricao}</p>

				<div>
					<Link to={`/product-update/${id}`}>Alterar</Link>
					<button onClick={handleDelete}>Deletar</button>
				</div>
			</article>
		</>
    );
}