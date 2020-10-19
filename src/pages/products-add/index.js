import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsAdd() {
	const history = useHistory();
	
	const [product, setProduct] = useState({
		nome: '',
		preco: '0.00',
		descricao: ''
	});

	function handleInputChange(event) {
		const { name, value } = event.target;

		setProduct({ ...product, [name]: value });
	}

	async function handleOnSubmit(event) {
		event.preventDefault();

		await api.post('products/', product)
			.then(() => {
				toast.success('Produto cadastrado com sucesso!');

				history.push('/products/');
			})
			.catch(() => {
				toast.error('Não foi possível cadastrar o produto. Contate um desenvolvedor.');
			})
		;
	}

	return(
		<div className="small-container">
			<div className="flex-row margin-bottom">
				<div className="flex-small vertical-center">
					<h2 className="text-center">Adicionar produto</h2>
				</div>
				<div className="flex-small vertical-center">
					<Link to='/products/' className='button'>Voltar</Link>
				</div>
			</div>

			
			<form onSubmit={handleOnSubmit}>
				<label>Nome:</label>
				<input name="nome" type="text" required
					value={product.nome}
					onChange={handleInputChange}
				/>

				<label>Preço (R$):</label>
				<input name="preco" type="number" step=".01" required
					value={product.preco}
					onChange={handleInputChange}
				/>

				<label>Descrição:</label>
				<textarea name="descricao" cols="50" rows="6" required
					value={product.descricao}
					onChange={handleInputChange}
				/>

				<div className="margin-top flex-row">
					<input type="submit" value="Cadastrar"
						className="flex-small"
					/>
				</div>
			</form>
		</div>
	)
}