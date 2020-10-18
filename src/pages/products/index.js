import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import ProductList from '../../components/ProductList';
import './styles.css';

export default function Products() {
	const [previousPage, setPreviousPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const [countProducts, setCountProducts] = useState(0);
	const [products, setProducts] = useState([]);

	function handlePreviousPage() {
        if(previousPage !== null) setCurrentPage(previousPage);
    };

    function handleNextPage() {
        if(nextPage !== null) setCurrentPage(nextPage);
    };

	async function loadProducts() {
		await api.get('products/', {
			params: {
				page: currentPage
			}
		})
			.then(response => {
				setPreviousPage(response.data.prev_page);
				setNextPage(response.data.next_page);
				setCountProducts(response.data.count_results);
				setProducts(response.data.results);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	useEffect(() => {
		loadProducts();
	}, [currentPage]);

	return(
		<div className="container">
			<h1 className="text-center">CRUD de Produtos</h1>

			<div className="flex-row margin-bottom">
				<div className="flex-small vertical-center">
					<h2>{countProducts} produtos disponíveis</h2>
				</div>
				<div className="flex-small vertical-center">
					<Link
						to='/products-add/'
						className='link-button'
					>Cadastrar produto</Link>
				</div>
			</div>

			<div className="flex-row vertical-center">
				<div className="flex-small-half margin-top">
					<button
						disabled={previousPage === null}
						onClick={handlePreviousPage}
					>
						Anterior
					</button>
				</div>

				<div className="flex-small">
					<ProductList
						products={products}
						setProducts={setProducts}
					/>
				</div>

				<div className="flex-small-half margin-top">
					<button
						disabled={nextPage === null}
						onClick={handleNextPage}
					>
						Próxima
					</button>
				</div>
			</div>
		</div>
	)
}