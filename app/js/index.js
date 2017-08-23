import { Scene } from './scene';
import { Player } from './player';
import { Game } from './game';

const control = document.getElementById('control');

let nicknameDom = document.getElementById('nickname');
let modeDom = document.getElementById('mode');
let addDom = document.getElementById('add');

document.querySelector('.ok').onclick = function() {
  let nickname = nicknameDom.value;
  let mode = +modeDom.options[modeDom.selectedIndex].value;
  let add = +addDom.options[addDom.selectedIndex].value;
  let setting = { mode, add }
  let game = new Game({ nickname, setting, sence: new Scene() });
  control.style.display = 'none';
  window.onunload = function() {
    if (game.online) {
      game.online.close(nickname);
    }
  }
}

document.querySelector('.reset').onclick = function() {

}



document.querySelector('.close').onclick = function() {
  control.style.display = 'none';
}
