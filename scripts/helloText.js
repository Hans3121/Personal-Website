/**
 * Class to make a header element say 'Hello' in many different languages.
 * Animations should be implemented in css using 'show' & 'hide' classes
 */
export class HelloText {
    /**
     * Ms of time where the element will be shown
     * @type {number}
     */
    showTime

    /**
     * Ms of time the element will be hidden
     * @type {number}
     */
    hideTime

    /**
     * The element that will become HelloText
     * @type {HTMLParagraphElement | HTMLHeadingElement}
     */
    elt

    /**
     * The interval ID used by the script
     * @type {number}
     */
    _intervalID

    /**
     * Keep showing the text after stopping the animation
     * @type {boolean}
     */
    _keepShow

    /**
     * State of the HelloText. If true, then animation is running
     * @type {boolean}
     */
    _isActive
    
    /**
     * set up the HelloText
     * @param {number} showTime - ms of time where the element will be shown
     * @param {number} hideTime - ms of time where the element will be hidden
     * @param {HTMLHeadingElement | HTMLParagraphElement} elt - the element that will be animated
     */
    constructor(showTime, hideTime, elt) {    
        this.showTime = showTime;  
        this.hideTime = hideTime;  
        this.elt = elt;
        this._intervalID = 0;
        this._keepShow = false
    }

    /**
     * Returns an array containing the word 'hello' in various languages
     * @returns {string[]}
     */
    static get GREETINGS() {
        return [
      "Hello",
      "Hola",
      "Bonjour",
      "Guten Tag",
      "Ciao",
      "Olá",
      "Привет",
      "こんにちは",
      "你好",
      "안녕하세요",
      "مرحبا",
      "नमस्ते",
      "Hujambo",
      "Merhaba",
      "Sawubona",
      "Selamat pagi",
      "Salam",
      "Hej",
      "Dia duit",
      "Salut",
      "Tere",
      "Ahoj",
      "Dobrý den",
      "Zdravo",
      "Hallå",
      "Marhaba",
      "Xin chào",
      "Szia",
      "Góðan dag",
      "Sveiki",
      "Buna ziua",
      "Dzień dobry",
      "Habari",
      "Shalom",
      "Privyet",
      "Namaste",
      "Kamusta",
      "Sain baina uu",
      "Sawatdee",
      "Hallo",
      "Nǐ hǎo",
      "Yasou",
      "God dag",
      "Gamarjoba",
      "Aloha",
      "Shwmae",
      "Salve",
      "Saluton",
      "Kumusta",
      "Labas",
      "Goddag",
      "Privet",
      "Namaskar",
      "Chào",
      "Hei",
      "Dobrý deň",
      "Kia ora",
      "Hoi",
      "Moïen",
        ];
    }

    /**
     * Starts the animation
     */
    start() {
        if (this._isActive == true) {
            return
        }

        this.elt.classList.add("show")
        this._isActive = true


        this._intervalID = setInterval( () => {
            this.elt.classList.remove("show")

            setTimeout(() => {
                if (this._keepShow || this._isActive) {
                    let index = Math.floor(Math.random() * HelloText.GREETINGS.length)
                    this.elt.innerText = HelloText.GREETINGS[index]
                    this.elt.classList.add("show")
                }
            }, this.hideTime)
        }, this.showTime + this.hideTime)
    }


    /**
   * Stops the animation. Should be called only if start has been called.
   * @param {Boolean} keepShowing - If true, the element will still show after the animation ends
   */
    stop(keepShowing = false) {
        if (this._isActive == false){
            return
        }
        this._keepShow = keepShowing
        clearInterval(this._intervalID)
    }
}
