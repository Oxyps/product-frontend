import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsEdit(props) {
	const history = useHistory();
	
	const { handleSubmit, register, errors, control, setValue } = useForm({
		mode: 'onChange',
		shouldFocusError: false,
	});

	const [oldProduct, setOldProduct] = useState({
		id: props.match.params.id,
		nome: '',
		preco: 0,
		descricao: ''
	});
	const [newProduct, setNewProduct] = useState({
		nome: '',
		preco: 0,
		descricao: ''
	});
	
	async function loadOldProduct() {
		await api.get(`/products/${oldProduct.id}`)
			.then(response => {
				setOldProduct(response.data);
			})
			.catch(error => {
				// console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O produto com o nome ${newProduct.nome} já existe. Utilize outro nome.`);
				} else {
					toast.error('Não foi possível cadastrar o produto. Contate um desenvolvedor.');
				}
			})
		;
	}

	useEffect(() => {
		loadOldProduct();
	}, [props]);

	useEffect(() => {
		// setValue('nome', oldProduct.nome);
		// setValue('preco', oldProduct.preco.replace('.', ','));
		// setValue('descricao', oldProduct.descricao);
	}, [oldProduct]);

	function handleNewProductChange(name, value) {
		setNewProduct({ ...newProduct, [name]: value });
	};

	async function editProduct() {
		await api.put(`products/${oldProduct.id}/`, newProduct)
			.then(() => {
				toast.success('Produto alterado com sucesso!');

				history.push('/products/');
			})
			.catch(error => {
				// console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O produto com o nome ${newProduct.nome} já existe. Utilize outro nome.`);
				} else {
					toast.error('Erro não programado. Contate um desenvolvedor.');
				}
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

			<div className="flex-small">
				<p>Nome: {oldProduct.nome}</p>
				<p>Preço: R$ {oldProduct.preco}</p>
				<p>Descrição: {oldProduct.descricao}</p>
			</div>

			<DevTool control={control} />
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

						defaultValue={newProduct.nome}
						onChange={e => handleNewProductChange('nome', e.target.value)}

						error={!!errors.nome}
						helperText={errors.nome?.message}

						label='Nome'
						variant='outlined'
						fullWidth
					/>
				</div>
				
				<div className="flex-large margin-bottom">
				<Controller
						control={control}
						name='preco'
						defaultValue={newProduct.preco}
						render={controllerProps => (
							<CurrencyTextField
								value={controllerProps.preco}
								onChange={ e => {
									const { value } = e.target
									handleNewProductChange(
										'preco',
										value.replace('.', '').replace(',', '.')
									);
									controllerProps.onChange(value);
								}}
								error={!!errors.preco}
								helperText={errors.preco?.message}
								decimalCharacter=','
								digitGroupSeparator='.'
								currencySymbol='R$'
								label='Preço'
								textAlign='left'
								fullWidth
								variant='outlined'
							/>
						)}
						rules={{
							required: 'O campo de preço precisa ser preenchido.',
							maxLength: {
								value: 10,
								message: 'O preço precisa possuir no máximo 10 dígitos.'
							},
							validate: valueString => {
								if(parseFloat(valueString.replace(',', '.')) <= 0) {
									return 'O valor precisa ser positivo.'
								}
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

						defaultValue={newProduct.descricao}
						onChange={e => handleNewProductChange('descricao', e.target.value)}

						error={!!errors.descricao}
						helperText={errors.descricao?.message}

						label='Descrição'
						variant='outlined'
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