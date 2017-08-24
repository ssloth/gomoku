export const mode = {
  personal: 0,
  online: 1,
  Observer: 2
}

export const modeScore = {
  rd1: 100,
  rl1: 200,
  rd2: 350,
  rl2: 400,
  rd3: 500,
  rl3: 600,
  rd4: 1000,
  rl4: 9999,
  rl5: 9999,
  md1: 110,
  ml1: 210,
  md2: 360,
  ml2: 410,
  md3: 510,
  ml3: 610,
  md4: 5000,
  ml4: 10000,
  ml5: 10000,
}

export const directionMap = {
  'U':'B',
  'L':'R',
  'LU':'RB',
  'RU':'LB',
  'B':'U',
  'R':'L',
  'RB':'LU',
  'LB':'RU',
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
