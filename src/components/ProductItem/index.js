import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function ProductItem({ product }) {
    return(
        <li>
			<Link id='detail-link' to={`/product-detail/${product.id}`}>
				<img src={product.image_url} alt={product.nome}></img>
			
				<strong>R$ {product.preco}</strong>
				<h4>{product.nome}</h4>
			</Link>
			{/* <Link id="update-link" to={`/product-update/${product.id}`}>Alterar</Link>
			<Link id="delete-link" to={`/product-delete/${product.id}`}>Deletar</Link> */}
        </li>
    );
}