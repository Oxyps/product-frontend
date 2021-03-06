import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function ProductList({
	products, setProducts, inPage, ofPages, countProducts, setCountProducts
}) {
	async function handleDeleteProduct(id) {
		await api.delete(`/products/${id}/`)
			.then(() => {
				toast.success('Produto deletado com sucesso!');

				products = products.filter(element => element.id !== id);
				setProducts(products);
				setCountProducts(countProducts - 1);
			})
			.catch(() => {
				toast.error('Não foi possível deletar o produto. Erro não programado.');
			})
		;
	}

    return(
		<table>
			<thead>
				<tr>
					<th
						className="text-center"
						style={{width: '15%'}}
					>Nome</th>
					<th
						className="text-center"
						style={{width: '15%'}}
					>Preço</th>
					<th
						className="text-center"
						style={{width: '10%'}}
					>Lote</th>
					<th
						className="text-center"
						style={{width: '35%'}}
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
							<td className="text-center">
								{product.nome}
							</td>
							<td className="text-center">
								R$ {product.preco.replace('.', ',')}
							</td>
							<td className="text-center">{product.batch}</td>
							<td className="text-center">{product.descricao}</td>
							
							<td>
								<div className="flex-row vertical-center">
									<Link
										component={RouterLink}
										to={`/products-edit/${product.id}/`}
									>
										<IconButton
											aria-label='edit-product'
											size='medium'
											color='primary'
											component='span'
										>
											<EditIcon
												color='primary'
												fontSize='inherit'
											/>
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
						<td colSpan={5}>Nenhum produto cadastrado</td>
					</tr>
				)}
			</tbody>

			<tfoot>
				<tr><td colSpan={5} className="text-center">
					Página {inPage} de {ofPages} páginas.
				</td></tr>
			</tfoot>
		</table>
    );
}