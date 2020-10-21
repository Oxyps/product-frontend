import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import _ from 'lodash/fp';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductsAdd() {
	const history = useHistory();
	const { handleSubmit, register, errors, control } = useForm({
		mode: 'onChange',
		shouldFocusError: false
	});
	
	const [product, setProduct] = useState({
		nome: '',
		preco: '0,0',
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

	function handleInputChange(name, value) {
		setProduct({ ...product, [name]: value });
	};

	async function addProduct() {
		console.log(product);
		await api.post('products/', product)
			.then(() => {
				toast.success('Produto cadastrado com sucesso!');

				history.push('/products/');
			})
			.catch(error => {
				// console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O produto com o nome '${product.nome}' já existe. Utilize outro nome.`);
				} else {
					toast.error('Não foi possível cadastrar o produto. Erro não programado.');
				}
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
					<Button
						component={RouterLink}
						to='/products/'
						variant='contained'
						color='secondary'
					>Voltar</Button>
				</div>
			</div>

			<form
				onSubmit={handleSubmit(addProduct)}
				autoComplete="off"
				className="container"
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
						defaultValue={product.preco}
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
								fullWidth
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

				<div className="flex-large">
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
						multiline
						rows={4}
						fullWidth
					/>
				</div>

				<div className="flex-large margin-bottom">
					<Controller
						name='batch'
						control={control}
						defaultValue={product.batch}
						rules={{ required: 'Selecione um lote para o produto.' }}
						render={ controllerProps => (
							<Autocomplete
								onChange={ (_, selected) => {
									console.log(selected)
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
					>Cadastrar</Button>
				</div>
			</form>
		</div>
	);
}