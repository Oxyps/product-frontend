import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function BatchList({
	batches, setBatches, inPage, ofPages, countBatches, setCountBatches
}) {
	async function handleDeleteBatch(id) {
		await api.delete(`/batches/${id}/`)
			.then(() => {
				toast.success('Lote deletado com sucesso!');

				batches = batches.filter(element => element.id !== id);
				setBatches(batches);
				setCountBatches(countBatches - 1);
			})
			.catch(error => {
				console.log(error.request.response);
				if(error.request.status === 500) {
					toast.error('Não foi possível deletar este lote. Ainda há produtos relacionados a ele.');
				} else {
					toast.error('Não foi possível deletar o lote. Erro não programado.');
				}
			})
		;
	}

    return(
		<table>
			<thead>
				<tr>
					<th className="text-center">Lote</th>
					<th className="text-center">Fabricante</th>
					<th className="text-center">Tamanho</th>
					<th className="text-center">Data de Fabricação</th>
					<th className="text-center">Data de validade</th>
					
					<th className="text-center">Ações</th>
				</tr>
			</thead>

			<tbody>
				{batches.length > 0 ? (
					batches.map(batch => (
						<tr key={batch.id}>
							<td className="text-center">{batch.code}</td>
							<td className="text-center">{batch.producer}</td>
							<td className="text-center">{batch.size}</td>
							<td className="text-center">
								{new Date(batch.produce_date).toLocaleDateString()}
							</td>
							<td className="text-center">
								{new Date(batch.shelf_life).toLocaleDateString()}
							</td>

							<td>
								<div className="flex-row vertical-center">
									<Link
										component={RouterLink}
										to={`/batches-edit/${batch.id}/`}
									>
										<IconButton
											aria-label='edit-batch'
											size='medium'
											color='primary'
											component='span'
										>
											<EditIcon color='primary' fontSize='inherit' />
										</IconButton>
									</Link>

									<IconButton
										onClick={() => handleDeleteBatch(batch.id)}
										aria-label='delete-batch'
										size='medium'
										color='primary'
										component='span'
									>
										<DeleteIcon fontSize='inherit' />
									</IconButton>
								</div>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={6}>Nenhum lote cadastrado</td>
					</tr>
				)}
			</tbody>

			<tfoot>
				<tr><td colSpan={6} className="text-center">
					Página {inPage} de {ofPages} páginas.
				</td></tr>
			</tfoot>
		</table>
    );
}