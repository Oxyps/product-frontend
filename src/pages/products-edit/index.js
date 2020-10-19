import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

	const handleInputChange = (name) => (event) => {
		setProduct({ ...product, [name]: event.target.value });
	};

	async function handleEditProduct(event) {
		event.preventDefault();

		await api.put(`products/${product.id}/`, product)
			.then(() => {
				toast.success('Produto alterado com sucesso!');

				history.push('/products/');
			})
			.catch(() => {
				toast.error('Não foi possível atualizar o produto. Contate um desenvolvedor.');
			})
		;
	}

	return(
		<div className="small-container">
			<div className="flex-row margin-bottom">
				<div className="flex-small vertical-center">
					<h2 className="text-center">Alterar produto</h2>
				</div>
				<div className="flex-small vertical-center">
					<Button
						component={RouterLink}
						to='/products/'
						variant='contained'
						color='secondary'
					>Voltar</Button>
				</div>
			</div>

			
			<form
				onSubmit={handleEditProduct}
				autoComplete="off"
				className="conainer"
			>
				<div className="flex-large margin-bottom">
					<TextField
						value={product.nome}
						onChange={handleInputChange('nome')}
						label='Nome'
						fullWidth
					/>
				</div>
				
				<div className="flex-large margin-bottom">
					<InputLabel htmlFor='preco'>Preço</InputLabel>
					<Input
						id='preco'
						value={product.preco}
						onChange={handleInputChange('preco')}
						startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
						fullWidth
					/>
				</div>
				
				<div className="flex-large margin-bottom">
					<TextField
						value={product.descricao}
						onChange={handleInputChange('descricao')}
						label='Descrição'
						multiline
						fullWidth
					/>
				</div>
				
				<div className="margin-top flex-row">
					<Button type="submit" className="flex-small"
						variant='contained'
						color='primary'
					>Alterar</Button>
				</div>
			</form>
		</div>
	)
}