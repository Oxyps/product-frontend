import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsEdit(props) {
	const history = useHistory();

	const [product, setProduct] = useState({
		id: props.match.params.id,
		nome: '',
		preco: '0.00',
		descricao: ''
	})

	useEffect(() => {
		setProduct({ ...product, id: props.match.params.id });
		loadProduct();
	}, [props]);

	async function loadProduct() {
		await api.get(`/products/${product.id}`)
			.then(response => {
				setProduct(response.data);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	function handleInputChange(event) {
		const { name, value } = event.target;

		setProduct({ ...product, [name]: value });
	}

	async function handleEditProduct(event) {
		event.preventDefault();

		await api.put(`products/${product.id}/`, product)
			.then(() => {
				toast.success('Produto alterado com sucesso!');

				history.push('/products/');
			})
			.catch(error => {
				toast.error(error);
			})
		;
	}

	return(
		<div className="small-container">
			<div className="flex-row margin-bottom">
				<div className="flex-small vertical-center">
					<h2 className="text-center">Editar produto</h2>
				</div>
				<div className="flex-small vertical-center">
					<Link to='/products/' className='button'>Voltar</Link>
				</div>
			</div>
			
			<form onSubmit={handleEditProduct}>
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
				<textarea name="descricao" rows="6" required
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