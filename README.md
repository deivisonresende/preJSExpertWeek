# preJSExpertWeek

Estudo sobre processamento de dados sob demanda.

Pontos altos:


Funções geradoras ([function*](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*)):  

```javascript
function* palavra(){}
``` 

utilizada conjunto com a palavra chave [yield](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*),podem ser utilizadas para **processamento de dados sob demanda** (streams / fluxos), onde yeld retorna "data", antes do loop terminar. Desta forma, o client recebe os dados a medida em que é processado, como por exemplo:

```javascript

function* run() {
  for (let index = 0; index < 100; index++) {
    const data = {
      id: randomUUID(),
      name: `name-${index}`
    };
    yield data;
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for (const data of run()) {
        console.log(`Sending data`, data);
        this.push(JSON.stringify(data) + '\n');
      }
      this.push(null);
    }
  });

  readable.pipe(response);
}

``` 

**Pipes**,

```javascript
.pipe(
  new Transform({
    transform(chunk, encoding, callback) {
      const item = JSON.parse(chunk);
      const myNumber = /\d+/.exec(item.name)[0];
      let name = item.name;
      if(myNumber % 2 === 0) name = name.concat(' é par')
      else name = name.concat(' é par');
      item.name = name
      callback(null, JSON.stringify(item));
    }
  })
)
``` 

são **"canalizadores"**, que _conduzem_ os dados _direcionando-os_ para o fluxos(streams) definidos. Podem ser utilizados vários "pipes", para realizar diferentes tratamentos a medidas que dos **chuncks**/dados são conduzidos pelos fluxos.
