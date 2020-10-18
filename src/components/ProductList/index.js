import React from 'react';
import { Link } from 'react-router-dom';
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
			.catch(error => {
				toast.error(error);
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
						style={{width: '35%'}}
					>Descrição</th>
					<th
						className="text-center"
						style={{width: '15%'}}
					>Ações</th>
				</tr>
			</thead>

			<tbody>
				{products.length > 0 ? (
					products.map(product => (
						<tr key={product.id}>
							<td>{product.nome}</td>
							<td
								className="text-center"
							>{product.preco}</td>
							<td>{product.descricao}</td>
							<td>
								<div className="flex-row vertical-center space-between">
									<Link
										to={`/products-edit/${product.id}/`}
										className="button muted-button"
									>Editar</Link>
									<button
										onClick={() => handleDeleteProduct(product.id)}
										className="button muted-button"
									>Deletar</button>
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