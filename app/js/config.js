export const mode = {
  personal: 0,
  online: 1,
  Observer: 2
}

export const modeScore = {
  rd1: 0,
  rl1: 50,
  rd2: 150,
  rl2: 200,
  rd3: 250,
  rl3: 300,
  rd4: 350,
  rl4: 400,
  rl5: 500,
  md1: 10,
  ml1: 60,
  md2: 160,
  ml2: 210,
  md3: 260,
  ml3: 310,
  md4: 360,
  md4: 410,
  ml5: 500
}

export const modeMapR = {
  '-1': 'rd1',
  '1': 'rl1',
  '-2': 'rd2',
  '2': 'rl2',
  '-3': 'rd3',
  '3': 'rl3',
  '-4': 'rd4',
  '4': 'rl4',
  '5': 'rl5'
}

export const modeMapM = {
  '-1': 'md1',
  '1': 'ml1',
  '-2': 'md2',
  '2': 'ml2',
  '-3': 'md3',
  '3': 'ml3',
  '-4': 'md4',
  '4':' ml4',
  '5': 'ml5'
}

export const direction = {
  ['L']() {},
  ['R']() {},
  ['U']() {},
  ['B']() {},
  ['LU']() {},
  ['LB']() {},
  ['RU']() {},
  ['RB']() {},
}

export const POTR = 8088;
