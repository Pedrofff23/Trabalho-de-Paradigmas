self.onmessage = (e) => {
  const arrayView = new Int32Array(e.data.vetor);
  const flagview = new Int32Array(e.data.flag);

  while (true) {
    //Pega 2 jogadores para fazer 1 vs 1
    player1 = Math.ceil(Math.random() * 200);
    player2 = Math.ceil(Math.random() * 200);

    aceitar1 = Math.ceil(Math.random() * 2);
    aceitar2 = Math.ceil(Math.random() * 2);

    let partida = Math.ceil(Math.random() * 49);

    //Sorteia novamente ate pegar 2 jogadores diferentes
    while (player1 == player2) {
      player1 = Math.ceil(Math.random() * 200);
    }

    //Se os 2 jogadores darem match
    if (aceitar1 == aceitar2) {
      //Espera que o vertor esteja desponivel
      Atomics.wait(flagview, 0, 0);
      Atomics.store(flagview, 0, 0);

      //A cada 2 posições ocapadas por jogadores é 1 partida
      Atomics.store(arrayView, partida, player1);
      Atomics.store(arrayView, partida + 1, player2);
    }

    Atomics.store(flagview, 0, 1);
    Atomics.notify(flagview, 0, 1);
  }
};
