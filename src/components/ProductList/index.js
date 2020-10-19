import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './styles.css';

export default function ProductList({
	products, setProducts, inPage, ofPages
}) {
	async function handleDeleteProduct(id) {
		await api.delete(`/products/${id}/`)
			.then(() => {
				toast.success('Produto deletado com sucesso!');

				products = products.filter(element => element.id !== id)
				setProducts(products)
			})
			.catch(() => {
				toast.error('Não foi possível deletar o produto. Contate um desenvolvedor.');
			})
		;
	}

    return(
		<table>
			<thead>
				<tr>
					<th
						className="text-center"
						style={{width: '17%'}}
					>Nome</th>
					<th
						className="text-center"
						style={{width: '8%'}}
					>Preço</th>
					<th
						className="text-center"
						style={{width: '45%'}}
					>Descrição</th>
					<th
						className="text-center"
						style={{width: '10%'}}
					>Ações</th>
				</tr>
			</thead>

			<tbody>
				{products.length > 0 ? (
					products.map(product => (
						<tr key={product.id}>
							<td
								className="text-center"
							>{product.nome}</td>
							<td
								className="text-center"
							>{product.preco}</td>
							<td
								className="text-center"
							>{product.descricao}</td>
							<td>
								<div className="flex-row vertical-center">
									<Link to={`/products-edit/${product.id}/`}>
										<IconButton
											aria-label='edit-product'
											size='medium'
											color='primary'
											component='span'
										>
											<EditIcon color='primary' fontSize='inherit' />
										</IconButton>
									</Link>
									
									<IconButton
										onClick={() => handleDeleteProduct(product.id)}
										aria-label='delete-product'
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
						<td colSpan={4}>Nenhum produto cadastrado</td>
					</tr>
				)}
			</tbody>

			<tfoot>
				<tr><td colSpan={4} className="text-center">
					Página {inPage} de {ofPages} páginas.
				</td></tr>
			</tfoot>
		</table>
    );
}