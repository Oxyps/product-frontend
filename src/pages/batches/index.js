import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

import api from '../../services/api';
import BatchList from '../../components/BatchList';

export default function Batches() {
	const [pageSize, setPageSize] = useState(0);
	const [previousPage, setPreviousPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const [countBatches, setCountBatches] = useState(0);
	const [batches, setBatches] = useState([]);

	function handlePreviousPage() {
        if(previousPage !== null) setCurrentPage(previousPage);
    };

    function handleNextPage() {
        if(nextPage !== null) setCurrentPage(nextPage);
    };

	async function loadBatches() {
		await api.get('batches/', {
			params: {
				page: currentPage
			}
		})
			.then(response => {
				setPageSize(response.data.page_size);
				setPreviousPage(response.data.prev_page);
				setNextPage(response.data.next_page);
				setCountBatches(response.data.count_results);
				setBatches(response.data.results);
			})
			.catch(error => {
				console.log(error);
			})
		;
	}

	useEffect(() => {
		loadBatches();
	}, [currentPage]);

	return(
		<div className="full-container">
			<h1 className="text-center">Listagem de Lotes</h1>

			<div className="flex-row margin-bottom">
				<div className="flex-large vertical-center">
					<h2>Lotes cadastrados: {countBatches}</h2>
				</div>
				<div className="flex-small vertical-center">
					<Button
						component={RouterLink}
						to='/batches-add/'
						variant='contained'
						color='primary'
					>
						Adicionar Lote
					</Button>
				</div>
			</div>

			<div className="flex-row vertical-center">
				<div className="flex-small-half margin-top">
					<IconButton
						disabled={previousPage === null}
						onClick={handlePreviousPage}
						aria-label='previous-page'
						size='medium'
						color='primary'
						component='span'
					>
						<NavigateBefore fontSize='inherit' />
					</IconButton>
				</div>

				<div className="flex-small">
					<BatchList
						batches={batches}
						setBatches={setBatches}
						countBatches={countBatches}
						setCountBatches={setCountBatches}
						inPage={currentPage}
						ofPages={Math.ceil(countBatches / pageSize)}
					/>
				</div>

				<div className="flex-small-half margin-top">
					<IconButton
						disabled={nextPage === null}
						onClick={handleNextPage}
						aria-label='next-page'
						size='medium'
						color='primary'
						component='span'
					>
						<NavigateNext fontSize='inherit' />
					</IconButton>
				</div>
			</div>
		</div>
	);
}