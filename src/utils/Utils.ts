// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { gameConfig } from '../constants/GameConfig';
import GameFacade from '../GameFacade';

export const gameConfiguration: IConfig = {
  type: Phaser.WEBGL,
  width: gameConfig.canvasWidth,
  height: gameConfig.canvasHeight,
  backgroundColor: '#ffffff',
  parent: 'game-container',
  title: '<GAME NAME>',
  scene: [],
  transparent: false,
  dom: {
    createContainer: true,
  },
  plugins: {
    global: [{ key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true }],
    scene: [
      { key: 'i18nPlugin', plugin: I18nPlugin, mapping: 'i18n' },
      {
        key: 'SpineWebGLPlugin',
        url: 'plugins/SpineWebGLPlugin.js',
        sceneKey: 'spine',
      },
    ],
  },
  banner: {
    text: '#ffffff',
    background: ['#fff200', '#38f0e8', '#00bff3', '#ec008c'],
    hidePhaser: false,
  },
};

export function delayRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: Function,
  context?: any,
  ...args: any[]
): Phaser.Time.TimerEvent {
  return _addRunnable(scene, delay, runnable, context, false, ...args);
}

export function loopRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: Function,
  context?: any,
  ...args: any[]
): Phaser.Time.TimerEvent {
  return _addRunnable(scene, delay, runnable, context, true, ...args);
}

function _addRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: Function,
  context?: any,
  loop: boolean = false,
  ...args: any[]
): Phaser.Time.TimerEvent {
  return scene.time.addEvent({
    delay,
    callback: runnable,
    callbackScope: context,
    loop,
    args,
  });
}

export function removeRunnable(runnable: Phaser.Time.TimerEvent): void {
  runnable.destroy();
}

export function postRunnable(
  scene: Phaser.Scene,
  callback: Function,
  context?: any,
): void {
  delayRunnable(scene, scene.game.loop.delta, callback, context);
}

export function getScene(name: string): Phaser.Scene {
  return GameFacade.game.scene.getScene(name);
}

// export async function getFSDataAsync(docId: string): Promise<any> {
//   try {
//     const dataObj: any = await firebase
//       .firestore()
//       .doc(docId)
//       .get();
//     return dataObj;
//   } catch (err) {
//     console.error(err);
//   }
// }

// export async function setFSDataAsync(docId: string, data: any): Promise<void> {
//   try {
//     await firebase
//       .firestore()
//       .doc(docId)
//       .set(serialise(data));
//   } catch (err) {
//     console.error(err);
//   }
// }

export function serialise(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

export function wrapLines(
  text: string,
  charWidth: number,
  maxWidth: number,
): string {
  const oneLineMaxSymbolsCount: number = Math.floor(maxWidth / charWidth);
  let lastWord: string = '';
  let lastWordEndIndex: number = 0;
  const words: string[] = text.split(' ');
  let result: string = '';
  for (
    let i: number = 0;
    i <= Math.floor(text.length / oneLineMaxSymbolsCount);
    i++
  ) {
    const remainingWords: string[] = words.filter((word: string) => {
      return text.indexOf(word) >= lastWordEndIndex;
    });
    let newLine: string = '';
    for (const word of remainingWords) {
      const newLength: number = newLine.length + word.length;
      if (newLength <= oneLineMaxSymbolsCount) {
        newLine += `${word} `;
        lastWord = word;
        lastWordEndIndex = text.indexOf(lastWord) + lastWord.length - 1;
      } else {
        break;
      }
    }
    result += `\n${newLine}`;
  }
  return result;
}

declare global {
  interface Array<T> {
    contains(element: T): boolean;
    remove(element: T): T;
  }

  interface Window {
    // FB: FbSDK;
    // store: IapStore.IStore;
    // HeyzapAds: IHeyzapAds;
    // facebookConnectPlugin: IFacebookConnectPlugin;
    isMobile: () => boolean;
  }
}

Array.prototype.contains = function<T>(element: T) {
  return this.indexOf(element) !== -1;
};
Array.prototype.remove = function<T>(element: T) {
  this.contains(element) && this.splice(this.indexOf(element), 1);
  return element;
};

Array.prototype.contains = function<T>(element: T) {
  return this.indexOf(element) !== -1;
};
Array.prototype.remove = function<T>(element: T) {
  this.contains(element) && this.splice(this.indexOf(element), 1);
  return element;
};

window.isMobile = () => {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  return check;
};

export function formatTime(miliseconds: number): string {
  const allInSecs: number = Math.floor(miliseconds / 1000);
  let minutes: number = Math.floor(allInSecs / 60);
  let seconds: number = allInSecs % 60;
  minutes = minutes < 0 ? 0 : minutes;
  seconds = seconds < 0 ? 0 : seconds;
  return `${minutes < 10 ? '0' + minutes : minutes}։${
    seconds < 10 ? '0' + seconds : seconds
  }`;
}

export function formatValue(
  value: number,
  fixTo: number = 2,
  roundSmallValues: boolean = false,
): string {
  value = +value.toFixed(2);
  let exponent: number = 0;
  while (1000 ** exponent <= value) {
    exponent++;
  }
  exponent -= 1;
  if (exponent < 0) {
    return value.toString();
  }
  let numberPart: number = +(value / 1000 ** exponent);
  numberPart =
    fixTo === 0
      ? Math.floor(+numberPart.toFixed(3))
      : +numberPart.toFixed(fixTo);
  const postfix: string = generateStringPart(exponent);
  const resultNumber: number =
    fixTo >= 1 || postfix.length > 0
      ? +numberPart.toFixed(numberPart < 100 ? 1 : 0)
      : +numberPart.toFixed(roundSmallValues ? 0 : fixTo);
  return resultNumber + postfix;
}

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

function generateStringPart(exponent: number): string {
  let result: string = '';
  switch (exponent) {
    case 0:
      break;
    case 1:
      result = 'K';
      break;
    case 2:
      result = 'M';
      break;
    case 3:
      result = 'B';
      break;
    case 4:
      result = 'T';
      break;
    default:
      const firstElementIndex: number = Math.floor(
        (exponent - 5) / ALPHABET.length,
      );
      const secondElementIndex: number = (exponent - 5) % ALPHABET.length;
      result += ALPHABET[firstElementIndex];
      result += ALPHABET[secondElementIndex];
      break;
  }
  return result;
}

export interface IConfig {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any[];
  title: string;
  backgroundColor: string;
  transparent: boolean;
  dom: any;
  plugins?: any;
  banner?: any;
  physics?: any;
}
