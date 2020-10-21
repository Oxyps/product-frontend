import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash/fp';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function BatchesEdit(props) {
	const history = useHistory();

	const { handleSubmit, register, errors, control } = useForm({
		mode: 'onChange',
		shouldFocusError: false
	});
	
	const [oldBatch, setOldBatch] = useState({});
	const [newBatch, setNewBatch] = useState({
		code: '',
		producer: '',
		produceDate: null,
		shelfLife: null,
		size: ''
	});

	async function loadOldBatch() {
		await api.get(`batches/${props.match.params.id}/`)
			.then(response => {
				setOldBatch(response.data);
			})
			.catch(error => {
				// console.log(error.request.response);
			})
		;
	}

	useEffect(() => {
		loadOldBatch();
	}, []);

	function handleInputChange(name, value) {
		setNewBatch({ ...newBatch, [name]: value });
	};

	async function editBatch() {
		//yyyy-mm-dd format dates
		const ISOproduceDate = newBatch.produceDate.toISOString().slice(0, 10);
		const ISOshelfLife = newBatch.shelfLife.toISOString().slice(0, 10);
		
		await api.put(`batches/${oldBatch.id}/`, {
			code: newBatch.code,
			producer: newBatch.producer,
			size: newBatch.size,
			produce_date: ISOproduceDate,
			shelf_life: ISOshelfLife
		})
			.then(() => {
				toast.success('Lote alterado com sucesso!');

				history.push('/batches/');
			})
			.catch(error => {
				// console.log(error.request.response);
				if(error.request.status === 400) {
					toast.error(`O lote com o código '${newBatch.code}' já existe. Utilize outro código.`);
				} else {
					toast.error('Não foi possível alterar o lote. Erro não programado.');
				}
			})
		;
	}

	return(
		<div className="small-container">
			<div className="flex-row">
				<div className="flex-small vertical-center">
					<h2 className="text-center">Adicionar lote</h2>
				</div>
				<div className="flex-small vertical-center">
					<Button
						component={RouterLink}
						to='/batches/'
						variant='contained'
						color='secondary'
					>Voltar</Button>
				</div>
			</div>

			<div className="flex-small">
				<p>Código: {oldBatch.code}</p>
				<p>Fabricante: R$ {oldBatch.producer}</p>
				<p>Data de fabricação: {new Date(oldBatch.produce_date).toLocaleDateString()}</p>
				<p>Data de validade: {new Date(oldBatch.shelf_life).toLocaleDateString()}</p>
				<p>Tamanho: {oldBatch.size}</p>
			</div>

			<form
				onSubmit={handleSubmit(editBatch)}
				autoComplete="off"
				className="container"
			>
				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'Preencha o código do lote.',
							maxLength: {
								value: 30,
								message: 'O código do lote pode ter no máximo 50 caracteres.'
							}
						})}
						name='code'

						defaultValue={newBatch.code}
						onChange={e => handleInputChange('code', e.target.value)}

						error={!!errors.code}
						helperText={errors.code?.message}

						label='Código'
						fullWidth
					/>
				</div>

				<div className="flex-large margin-bottom">
					<TextField
						inputRef={register({
							required: 'Preencha o nome do fabricante.',
							maxLength: {
								value: 254,
								message: 'O nome do fabricante pode ter no máximo 20 letras.'
							}
						})}
						name='producer'
						defaultValue={newBatch.producer}
						onChange={e => handleInputChange('producer', e.target.value)}
						error={!!errors.producer}
						helperText={errors.producer?.message}
						label='Nome do fabricante'
						fullWidth
					/>
				</div>

				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
					<div className="flex-large margin-bottom">
						<Controller
							name='produceDate'
							control={control}
							defaultValue={newBatch.produceDate}
							rules={{
								required: 'Preencha a data de fabricação.',
								validate: date => {
									if(String(date) === 'Invalid Date') return 'Data inválida, utilize o formato dd/mm/yyyy.';
									else if(date?.getTime() >= new Date(newBatch.untilDate)) return 'A data de fabricação deve ser anterior à data de validade.';
								}
							}}
							render={ controllerProps => (
								<KeyboardDatePicker
									onChange={ date => {
										handleInputChange('produceDate', date);
										controllerProps.onChange(date);
									}}
									value={controllerProps.value}
									error={!!errors.produceDate}
									helperText={errors.produceDate?.message}
									format='dd/MM/yyyy'
									views={['year', 'month', 'date']}
									openTo='year'
									label='Data de fabricação'
									clearable
									disableFuture
									cancelLabel='Cancelar'
									clearLabel='Limpar'
									okLabel='Confirmar'
									fullWidth
								/>
							)}
						/>
					</div>
					
					<div className="flex-large margin-bottom">
						<Controller
							name='shelfLife'
							control={control}
							defaultValue={newBatch.shelfLife}
							render={props => (
								<KeyboardDatePicker
									onChange={date => {
										handleInputChange('shelfLife', date);
										props.onChange(date);
									}}
									value={props.value}
									error={!!errors.shelfLife}
									helperText={errors.shelfLife?.message}
									format='dd/MM/yyyy'
									views={['year', 'month', 'date']}
									openTo='year'
									label='Data de validade'
									clearable
									disableFuture
									cancelLabel='Cancelar'
									clearLabel='Limpar'
									okLabel='Confirmar'
									fullWidth
								/>
							)}
							rules={{
								required: 'Preencha a data de validade.',
								validate: date => {
									if(String(date) === 'Invalid Date') return 'Data inválida, formato dd/mm/yyyy.';
									else if(date?.getTime() <= new Date(newBatch.produceDate)) return 'A data de validade deve ser posterior à data de fabricação.'
								}
							}}
						/>
					</div>
				</MuiPickersUtilsProvider>

				<div className="flex-large margin-bottom">
					<Controller
						name='size'
						control={control}
						defaultValue={newBatch.size}
						rules={{ required: 'Selecione um tamanho para os produtos.' }}
						render={ controllerProps => (
							<Autocomplete
								onChange={ (_, selected) => {
									handleInputChange('size', selected?.value);
									controllerProps.onChange(selected?.value);
								}}
								options={[
									{value: 'P', size: 'Pequeno'},
									{value: 'M', size: 'Médio'},
									{value: 'G', size: 'Grande'},
								]}
								getOptionLabel={ option => option.size }
								getOptionSelected={(option, value) => _.isEqual(option, value)}
								renderInput={ params =>
									<TextField
										{...params} label='Tamanho dos produtos'
										error={!!errors.size}
										helperText={errors.size?.message}
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
	);
}