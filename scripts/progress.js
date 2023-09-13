export class Progress {
    /** 
     * The Progress Bar of the website, replaces the scrollbar
     * @type {HTMLInputElement}
     */
    progressBar

    /**
     * HTMLDatalistElement for labelling the progress bar
     * @type {HTMLDataListElement}
     */
    datalist

    /**
     * The screens the progress bar will progress through
     * @type {HTMLCollectionOf<Element>}
     */
    screens

    /**
     * The Index of the current screen
     * @type {number}
     */
    currentScreenIndex

    _rangeLengthMultiplier = 100
    
    /**
     * Construcs a progress object. Incomplete Documentation
     * @param {HTMLInputElement} progressBar
     * @param {HTMLCollectionOf<Element>} screens
     * @param {HTMLDataListElement} datalist
     */
    constructor(progressBar, screens, datalist) {
        this.progressBar = progressBar
        this.screens = screens
        this.datalist = datalist
        this.currentScreenIndex = 0
        this.setup()
    }

    setup() {
        this.screens[0].classList.add("show")

        // Sets up the progress bar
        this.progressBar.max = (this.screens.length - 1) * this._rangeLengthMultiplier
        this.progressBar.step = this._rangeLengthMultiplier
        this.progressBar.min = 0
        this.progressBar.value = 0
        this.progressBar.addEventListener('change', (ev) => {
            this.changeScreen(this.progressBar.value / this._rangeLengthMultiplier)
        })

        // Sets up the Datalist Options
        for (let i = 0; i < this.screens.length; i++) {
            let option = document.createElement("option")
            option.value = i * this._rangeLengthMultiplier
            option.label = this.screens[i].title || "Untitled"
            option.addEventListener("click", (ev) => {
                this.progressBar.value = i * this._rangeLengthMultiplier
                this.changeScreen(i)
            })
            this.datalist.appendChild(option)
        }
    }

    changeScreen(newScreenIndex) {
        this.screens[this.currentScreenIndex].classList.remove("show")
        this.screens[newScreenIndex].classList.add("show")
        this.currentScreenIndex = newScreenIndex
    
    }
}

// Allow scrolling here?
class ProgressBar {
    constructor() {

    }
}