# State-from-LocalStorage

npm version

[![Licença: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

O State-from-LocalStorage é uma biblioteca JavaScript que permite armazenar o estado de um objeto em Local Storage, mantendo-o sincronizado entre as sessões do navegador.

Instalação
Para instalar a biblioteca, basta utilizar o gerenciador de pacotes npm:

```js
npm install state-from-localstorage
```

Utilização
Para utilizar a biblioteca, importe-a em seu projeto e crie uma instância da classe Store com uma chave única para o objeto que deseja armazenar.

```js
import { Store } from "state-from-localstorage";

const myStore = new Store("my-object");
```

Você pode então adicionar, atualizar ou remover propriedades do objeto armazenado utilizando os métodos addProperty, updateProperty e removeProperty, respectivamente:

```js
// Adicionar uma propriedade ao objeto
myStore.addProperty('propriedade1', 'valor1');

// Atualizar o valor de uma propriedade existente
myStore.updateProperty('propriedade1', 'novo-valor');

// Remover uma propriedade do objeto
myStore.removeProperty('propriedade1');
Para obter o estado atual do objeto, basta utilizar a propriedade state:
```

```js
console.log(myStore.state); // {propriedade1: 'novo-valor'}
```

Você também pode se inscrever para ser notificado sempre que o estado do objeto for atualizado, utilizando o método subscribe:

```js
const myListener = () => {
  console.log("O estado do objeto foi atualizado!");
};

myStore.subscribe(myListener);
```

E, se quiser cancelar a inscrição, basta utilizar o método unsubscribe:

```js
myStore.unsubscribe(myListener);
```

Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/thaciohelmer/state-from-localstorage/blob/main/LICENSE) para mais detalhes.
