import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import Autocomplete from '@material-ui/lab/Autocomplete';

import _ from 'lodash/fp';

import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsEdit(props) {
	const history = useHistory();
	
	const { handleSubmit, register, errors, control } = useForm({
		mode: 'onChange',
		shouldFocusError: false,
	});

	const [oldProduct, setOldProduct] = useState({
		id: props.match.params.id,
		nome: '',
		preco: '0,00',
		descricao: '',
		batch: ''
	});
	const [newProduct, setNewProduct] = useState({
		nome: '',
		preco: '0,00',
		descricao: '',
		batch: ''
	});
	
	const [batches, setBatches] = useState([]);

	async function loadBatches() {
		await api.get('batches/')
			.then(response => {
				setBatches(response.data.results);
			})
			.catch(error => {
				console.log(error.request.response);
			})
		;
	}

	useEffect(() => {
		loadBatches();
	}, []);

	async function loadOldProduct() {
		await api.get(`products/${oldProduct.id}/`)
			.then(response => {
				setOldProduct(response.data);
			})
			.catch(error => {
				// console.log(error.request.response);
			})
		;
	}

	useEffect(() => {
		loadOldProduct();
	}, [props]);

	function handleInputChange(name, value) {
		setNewProduct({ ...newProduct, [name]: value });
	};

	async function editProduct() {
		await api.put(`products/${oldProduct.id}/`, newProduct)
			.then(() => {
				toast.success('Produto alterado com sucesso!');

				history.push('/products/');
			})
			.catch(error => {
				console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O produto com o nome ${newProduct.nome} já existe. Utilize outro nome.`);
				} else {
					toast.error('Não foi possível alterar o produto. Erro não programado.');
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
				<p>Código do lote: {oldProduct.batch}</p>
			</div>

			<form
				onSubmit={handleSubmit(editProduct)}
				autoComplete="off"
				className="container"
			>
				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'Preencha o nome do produto.',
							maxLength: {
								value: 30,
								message: 'O nome do produto precisa possuir no máximo 30 letras.'
							}
						})}
						name='nome'
						defaultValue={newProduct.nome}
						onChange={e => handleInputChange('nome', e.target.value)}
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
									handleInputChange(
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
								variant='outlined'
								fullWidth
							/>
						)}
						rules={{
							required: 'Preencha o preço do produto.',
							maxLength: {
								value: 10,
								message: 'O preço do produto precisa possuir no máximo 10 dígitos.'
							},
							validate: valueString => {
								if(parseFloat(valueString.replace(',', '.')) <= 0) {
									return 'O valor do produto precisa ser positivo.'
								}
							}
						}}
					/>
				</div>
				
				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'Preencha uma descrição para o produto.',
							maxLength: {
								value: 254,
								message: 'A descrição do produto precisa possuir no máximo 254 letras.'
							}
						})}
						name='descricao'
						defaultValue={newProduct.descricao}
						onChange={e => handleInputChange('descricao', e.target.value)}
						error={!!errors.descricao}
						helperText={errors.descricao?.message}
						label='Descrição'
						multiline
						rows={4}
						variant='outlined'
						fullWidth
					/>
				</div>
				
				<div className="flex-large margin-bottom">
					<Controller
						name='batch'
						control={control}
						defaultValue={newProduct.batch}
						rules={{ required: 'Selecione um lote para o produto.' }}
						render={ controllerProps => (
							<Autocomplete
								onChange={ (_, selected) => {
									handleInputChange('batch', selected?.code);
									controllerProps.onChange(selected?.code);
								}}
								options={batches}
								getOptionLabel={ option => option.code }
								getOptionSelected={(option, value) => _.isEqual(option, value)}
								renderInput={ params =>
									<TextField
										{...params} label='Código do lote'
										error={!!errors.batch}
										helperText={errors.batch?.message}
										variant='outlined'
										margin='normal'
									/>
								}
								noOptionsText='Nenhuma opção encontrada'
								fullWidth
								autoComplete
							/>
						)}
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