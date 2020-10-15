import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import ProductItem from '../../components/ProductItem';

import './styles.css';

export default function Products() {
	// const [error, setError] = useState(false);
	const [previousPage, setPreviousPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [pageSize, setPageSize] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	async function loadProducts() {
		await api.get('products/', {
			params: {
				page: currentPage
			}
		})
			.then(response => {
				setPreviousPage(response.data.prev_page);
				setNextPage(response.data.next_page);
				setPageSize(response.data.page_size);
				setCountProducts(response.data.count_results);
				setProducts(response.data.results);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	function handlePreviousPage() {
        if(previousPage !== null) setCurrentPage(previousPage);
    };

    function handleNextPage() {
        if(nextPage !== null) setCurrentPage(nextPage);
    };

	useEffect(() => {
		loadProducts();
	}, [currentPage]);

	return(
		<div className="products">
			<header>
				Quantidade de produtos disponívels: {countProducts}
			</header>

			<div>
				<button 
					disabled={previousPage === null}
					onClick={handlePreviousPage}
				>
					Anterior
				</button>

				<span>
					Page {currentPage} de {Math.ceil(countProducts / pageSize)}
				</span>

				<button
					disabled={nextPage === null}
					onClick={handleNextPage}
				>
					Próxima
				</button>

				{/* <Link to='/product-add'>Adicionar</Link> */}
			</div>

			<div>
				<ul>
					{products.map(product => (
						<ProductItem
							key={product.id}
							product={product}
						/>
					))}
				</ul>
			</div>

			<div>
				<button 
					disabled={previousPage === null}
					onClick={handlePreviousPage}
				>
					Anterior
				</button>

				<span>
					Page {currentPage} de {Math.ceil(countProducts / pageSize)}
				</span>

				<button
					disabled={nextPage === null}
					onClick={handleNextPage}
				>
					Próxima
				</button>

				{/* <Link to='/product-add'>Adicionar</Link> */}
			</div>
		</div>
	)
}