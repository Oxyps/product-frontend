# [CRUD de Produtos - FRONTEND](https://product-frontend-oxyps.herokuapp.com/products/)

## Primeiros passos para rodar o projeto
1. Clonar ou baixar o repositório do [projeto](https://github.com/Oxyps/product-frontend);
1. Certificar-se de que possui o [Node.js](https://nodejs.org/en/download/) instalado;
1. Baixar todas as dependências de projeto rodando o comando no terminal:
	``` shell
		> yarn
	```
1. Enquanto as dependências são baixadas certificar-se de já estar rodando a [API](https://github.com/Oxyps/product-backend);
1. Inserir a porta da API no arquivo `./src/services/api`.
1. Começar a servir o cliente:
	``` shell
		> yarn start
	```
1. Abrir o navegador no endereço apresentando.

## Rotas

**Produto**
* Listagem de produtos: `/products/`;
* Cadastro de produtos: `/products-add/`;
* Edição de produtos: `/products-edit/:id/`;
* Detalhe de produtos: `/products-detail/:id/`.

**Lote**
* Listagem de lotes: `/batches/`;
* Cadastro de lotes: `/batches-add/`;
* Edição de lotes: `/batches-edit/:id/`;
* Detalhe de lotes: `/batches-detail/:id/`.


## Tecnologias utilizadas
- [x] [React.js](https://reactjs.org/docs/getting-started.html)
- [x] [Material UI](https://material-ui.com/getting-started/installation/)
- [x] [React Hook Form](https://react-hook-form.com/get-started/)
