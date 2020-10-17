import React from 'react';

export default function ProductForm({ product, setProduct, handleOnSubmit }) {
	function handleInputChange(event) {
		const { name, value } = event.target;

		setProduct({ ...product, [name]: value });
	}

	return(
		<form onSubmit={handleOnSubmit}>
			<input
				name="nome"
				type="text"
				required
				value={product.nome}
				onChange={handleInputChange}
			/>
			<input
				name="preco"
				type="number"
				step=".01"
				required
				value={product.preco}
				onChange={handleInputChange}
			/>
			<textarea
				name="descricao"
				cols="50"
				rows="6"
				required
				value={product.descricao}
				onChange={handleInputChange}
			/>
			{/* <input
				type="file"
				onChange={handleInputChange}
			/> */}

			<input type="submit" />
		</form>
	)
}