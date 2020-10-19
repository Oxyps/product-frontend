import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsEdit(props) {
	const history = useHistory();
	
	const { handleSubmit, register, errors, control, setValue } = useForm({
		mode: 'onChange',
		shouldFocusError: false,
	});

	const [product, setProduct] = useState({
		id: props.match.params.id,
		nome: '',
		preco: '0,00',
		descricao: ''
	});

	useEffect(() => {
		loadProduct();
	}, [props]);

	async function loadProduct() {
		await api.get(`/products/${product.id}`)
			.then(response => {
				setProduct(response.data);

				setValue('nome', response.data.nome);
				setValue('preco', parseFloat(response.data.preco.replace('.', ',')));
				setValue('descricao', response.data.descricao);
			})
			.catch(error => {
				// console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O produto com o nome ${product.nome} já existe. Utilize outro nome.`);
				} else {
					toast.error('Não foi possível cadastrar o produto. Contate um desenvolvedor.');
				}
			})
		;
	}

	function handleInputChange(name, value) {
		setProduct({ ...product, [name]: value });
	};

	async function editProduct() {
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

	// useEffect(() => {
	// 	console.log(product.preco.replace('.', ','));
	// }, [product]);

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
				onSubmit={handleSubmit(editProduct)}
				autoComplete="off"
				className="conainer"
			>
				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'O campo de nome precisa ser preenchido.',
							maxLength: {
								value: 30,
								message: 'O nome precisa possuir no máximo 30 letras.'
							}
						})}
						name='nome'

						defaultValue={product.nome}
						onChange={e => handleInputChange('nome', e.target.value)}

						error={!!errors.nome}
						helperText={errors.nome?.message}

						label='Nome'
						fullWidth
					/>
				</div>
				
				<div className="flex-large margin-bottom">
				<Controller
						control={control}
						name='preco'
						value={product.preco}
						defaultValue={product.preco}
						render={ controllerProps => (
							<CurrencyTextField
								value={controllerProps.preco}
								onChange={ e => {
									handleInputChange(
										'preco',
										parseFloat(e.target.value
											.replace('.', '')
											.replace(',', '.')
										)
									);
									controllerProps.onChange(e.target.value);
								}}

								error={!!errors.preco}
								helperText={errors.preco?.message}

								decimalCharacter=','
								digitGroupSeparator='.'
								currencySymbol='R$'
								label='Preço'
								textAlign='left'
								fullWidth
							/>
						)}
						rules={{
							required: 'O campo de preço precisa ser preenchido.',
							maxLength: {
								value: 10,
								message: 'O preço precisa possuir no máximo 10 dígitos.'
							}
						}}
					/>
				</div>
				
				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'O campo de descrição precisa ser preenchido.',
							maxLength: {
								value: 254,
								message: 'A descrição precisa possuir no máximo 254 letras.'
							}
						})}
						name='descricao'

						defaultValue={product.descricao}
						onChange={e => handleInputChange('descricao', e.target.value)}

						error={!!errors.descricao}
						helperText={errors.descricao?.message}

						label='Descrição'
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