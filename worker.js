self.onmessage = (e) => {
    const arrayView = new Int32Array(e.data.array)
    const flagview = new Int32Array(e.data.flag)
    /*
    * usando a flag para tratar: 0 para nao disponivel e 1 para disponivel
    * */
    let qtd = 0
    
    for (let i = 0; i < 40000; i++) {
        switch (Math.ceil(Math.random()*3)){

            case 1 :
                //console.log('vou vender!');
                Atomics.wait(flagview,0,0)
                Atomics.store(flagview, 0, 0)

                /*
                * trampo
                * */

                Atomics.add(arrayView,Math.ceil(Math.random()*(arrayView.length-1)),Math.ceil(Math.random()*100))

                break
            case 2:
                //console.log('tô só dando uma olhada!')

                /*
                * trampo
                * */
                qtd = Atomics.load(arrayView,Math.ceil(Math.random()*(arrayView.length-1)))

                break
            case 3:
                //console.log('vou comprar!')
                Atomics.wait(flagview,0,0)
                Atomics.store(flagview, 0, 0)

                /*
                * trampo
                * */
                const pos = Math.ceil(Math.random()*(arrayView.length-1))
                qtd = Math.ceil(Math.random()*10)

                /*
                * se a quantidade for maior que 0 e a quantidade na AH for menor/igual a quantidade requerida*/
                if(arrayView[pos] > 0 && arrayView[pos]<= qtd)
                    Atomics.sub(arrayView,pos,qtd)
                else
                    console.error('nao temos essa quantidade de items por favor seja mais humilde')
                break
        }


        /*
        * apos fazer a operação liberando para o proximo worker trabalhar*/
        Atomics.store(flagview,0 ,1)
        Atomics.notify(flagview, 0, 1)
    }
};