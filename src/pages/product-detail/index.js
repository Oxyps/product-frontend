import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function ProductDetail(props) {
	const [id, setId] = useState(props.match.params.id);
	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState(null);
	const [descricao, setDescricao] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	async function loadProduct() {
		await api.get(`products/${id}`)
			.then(response => {
				setNome(response.data.nome);
				setPreco(response.data.preco);
				setDescricao(response.data.descricao);
				setImageUrl(response.data.image_url);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	function handleDelete() {
		console.log('delete clicked');
	}

	useEffect(() => {
		loadProduct();
		console.log(imageUrl);
	}, []);

    return(
		<>
			<Link to='/products'>Voltar</Link>

			<article>
				<img src={imageUrl} alt={nome} />
				<h1>Nome: {nome}</h1>
				<strong>Preço: R$ {preco}</strong>
				<p>Descrição: {descricao}</p>

				<div>
					<Link to={`/products-update/${id}`}>Alterar</Link>
					<button onClick={handleDelete}>Deletar</button>
				</div>
			</article>
		</>
    );
}