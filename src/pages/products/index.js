import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

import api from '../../services/api';
import ProductList from '../../components/ProductList';
import './styles.css';

export default function Products() {
	const [pageSize, setPageSize] = useState(0);
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
				setPageSize(response.data.page_size);
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
		<div className="full-container">
			<h1 className="text-center">CRUD de Produtos</h1>

			<div className="flex-row margin-bottom">
				<div className="flex-small vertical-center">
					<h2>Listagem de produtos: {countProducts}</h2>
				</div>
				<div className="flex-small vertical-center">
					<Link
						to='/products-add/'
						className='button'
					>Cadastrar produto</Link>
				</div>
			</div>

			<div className="flex-row vertical-center">
				<div className="flex-small-half margin-top">
					<IconButton
						disabled={previousPage === null}
						onClick={handlePreviousPage}
						aria-label="next-page"
						size="large"
						color="primary"
						component="span"
					>
						<NavigateBefore fontSize="inherit" />
					</IconButton>
				</div>

				<div className="flex-small">
					<ProductList
						products={products}
						setProducts={setProducts}
						inPage={currentPage}
						ofPages={Math.ceil(countProducts / pageSize)}
					/>
				</div>

				<div className="flex-small-half margin-top">
					<IconButton
						disabled={nextPage === null}
						onClick={handleNextPage}
						aria-label="next-page"
						size="large"
						color="primary"
						component="span"
					>
						<NavigateNext fontSize="inherit" />
					</IconButton>
				</div>
			</div>
		</div>
	)
}