import { Color } from "three";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<any> = []
  private _tg: HTMLElement
  private _orgInput: HTMLInputElement
  // private _noise: number = Util.randomInt(0, 180)

  constructor(opt:any) {
    super(opt)

    this._orgInput = document.querySelector('.l-org-input input') as HTMLInputElement

    this._orgInput.addEventListener('dragstart', () => {
      this._orgInput.classList.add('is-drag')
    })
    this._orgInput.addEventListener('dragend', () => {
      this._orgInput.classList.remove('is-drag')
    })

    this._c = Util.randomInt(0, 360)

    const org = this.qs('.l-input') as HTMLElement
    this._tg = this.el

    this._tg.addEventListener('click', () => {
      this._eClickInput()
    })

    const num = 20
    for (let i = 0; i < num; i++) {
      const el = org.cloneNode(true) as HTMLElement
      this._tg.appendChild(el)

      this._item.push(
        new Item({
          el: el,
          id: i
        })
      )
    }
    org.remove()
  }

  protected _eClickInput():void {
    // Util.shuffle(this._item)
    this._item.forEach((v, i) => {
      v.change(i * 0)
    })
  }

  protected _update():void {
    super._update()


    // const val = this._orgInput.value

    // フォーカスが当たってるかどうか
    const isF = document.activeElement === this._orgInput

    if(isF) {
      this.addClass('is-focus')
    } else {
      this.removeClass('is-focus')
    }

    // let last = ''
    // const it = 30
    // if(isF && this._c % it <= it * 0.5) last = "|"

    const sw = Func.sw()
    // const sh = Func.sh()

    if(this._c % 1 === 0) {
      const textW = sw * Func.val(0.5, 0.5)
      const textH = 50

      Tween.set(this._tg, {
        width: textW,
        height: textH,
      })

      Tween.set(this._orgInput, {
        width: textW,
        height: textH,
      })

      this._item.forEach((v, i) => {
        const id = v.itemId

        const col = new Color(0x000000).offsetHSL((1 / this._item.length) * i + this._c * 0.015, 1, 0.5)
        const colR = new Color(1 - col.r, 1 - col.g, 1 - col.b)

        Tween.set(v.el, {
          width: textW / this._item.length,
          height: textH,
          // color: col.getStyle(),

          // filter: `hue-rotate(${i * 180 / this._item.length + this._c * 5}deg)`,
        })
        Tween.set(v.input, {
          width: textW,
          height: textH * 0.9,
          x: id * (-textW / this._item.length),
          backgroundColor: colR.getStyle(),
        })

        // v.setValue(val, last)
      })
    }
  }

  protected  _resize(): void {
  }
}