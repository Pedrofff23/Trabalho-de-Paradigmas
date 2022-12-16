self.onmessage = (e) => {
  const arrayView = new Int32Array(e.data.vetor);
  const flagview = new Int32Array(e.data.flag);

  while (true) {
    //Pega 2 jogadores para fazer 1 vs 1
    player = Math.ceil(Math.random() * 200);

    let partida = Math.ceil(Math.random() * 49);

    //Sorteia novamente ate pegar 2 jogadores diferentes
    while (arrayView.find((num) => num === player)) {
      player = Math.ceil(Math.random() * 200);
    }
    //Se tem algo em arrayView
    if (arrayView[partida] === 0) {
      switch (Math.ceil(Math.random() * 2)) {
        case 1:
          //Espera que o vertor esteja desponivel
          Atomics.wait(flagview, 0, 0);
          Atomics.store(flagview, 0, 0);

          //A cada 2 posições ocapadas por jogadores é 1 partida
          Atomics.store(arrayView, partida, player);

          break;
        case 2:
          //Espera que o vertor esteja desponivel
          break;
      }
    } else if (ArrayBuffer[partida + 1 === 0]) {
      if (arrayView[partida] === 0) {
        switch (Math.ceil(Math.random() * 2)) {
          case 1:
            //Espera que o vertor esteja desponivel
     
            //A cada 2 posições ocapadas por jogadores é 1 partida
            Atomics.store(arrayView, partida + 1, player);

            break;
          case 2:
            //Espera que o vertor esteja desponivel
            break;
        }
      }
    }

    Atomics.store(flagview, 0, 1);
    Atomics.notify(flagview, 0, 1);
  }
};
