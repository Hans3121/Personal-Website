// Todo: Add extra animation vs minimal animation, maybe by adding another class
// Todo: Add scrollable feature, by padding the parent, possibly....


/**
 * Class to replace the functionality of a scrollbar by using a {@link progressBar}
 * to scroll/progress through multiple {@link screens}.
 * 
 * Animations should be done using css. This script adds the class 'show' 
 * when the screen is meant be showed and replaces it with the class 'hide' when it is meant to be hidden.
 * 
 * For best visuals, add the class 'hide' to all screens in the html.
 */
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

    /**
     * The MS delay of time when changing screens
     * @type {number}
     */
    changeScreenDelay = 500

    /**
     * This will determine the amount of value between screens in the progressBar.
     * The max attribute will be {@link _rangeLengthMultiplier} * {@link screens}.length
     * @type {number}
     */
    _rangeLengthMultiplier = 1000
    
    /**
     * This variable will hold the timeoutId of the SetTimeout that changes the value of the progressBar.
     * Can be used to stop lerping the value of the progressBar
     * @type {number}
     */
    _lerpTimeoutId

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
        this._setup()
    }

    /**
     * Private function to setup the progressbar, called when class is constructed.
     */
    _setup() {
        // Sets up the screens list
        for (let i = 1; i < this.screens.length; i++){
            this.screens[i].classList.add("hide")
        }
        // Sets up the first screen
        this.screens[0].classList.remove("hide")
        this.screens[0].classList.add("show")

        // Sets up the progress bar
        this.progressBar.max = (this.screens.length - 1) * this._rangeLengthMultiplier
        // this.progressBar.step = this._rangeLengthMultiplier
        this.progressBar.min = 0
        this.progressBar.value = 0
        this.progressBar.addEventListener('change', (ev) => {
            this.changeScreen(this.progressBar.value / this._rangeLengthMultiplier)
        })

        // Sets up the Datalist Options
        for (let i = 0; i < this.screens.length; i++) {
            let option = document.createElement("option")
            option.value = i * this._rangeLengthMultiplier
            option.label = this.screens[i].dataset.title || "Untitled"
            option.addEventListener("click", (ev) => {
                this.changeScreen(i)
            })
            this.datalist.appendChild(option)
        }
    }

    /**
     * Changes the screen and moves the scrollbar by calling {@link scrollProgressBar}.
     * Index should be between 0 to the length of screens
     * @param {number} newScreenIndex 
     */
    changeScreen(newScreenIndex) {
        // this.progressBar.value = newScreenIndex * this._rangeLengthMultiplier
        this.scrollProgressBar(newScreenIndex * this._rangeLengthMultiplier)


        // Hide Current Screen
        let currentScreen = this.screens[this.currentScreenIndex].classList
        currentScreen.remove("show")
        currentScreen.add("hide")

        // Show Current Screen after x minutes
        setTimeout(()=>{
            let newScreen = this.screens[newScreenIndex].classList
            newScreen.remove("hide")
            newScreen.add("show")

            this.currentScreenIndex = newScreenIndex 
        }, this.changeScreenDelay)

    }

    /**
     * Scrolls the {@link progressBar} to the value set in {@link newProgressBarValue}, which 
     * should be the newScreenIndex * {@link _rangeLengthMultiplier}
     * 
     * @param {number} newProgressBarValue 
     */
    scrollProgressBar(newProgressBarValue) {
        if (this._lerpTimeoutId){
            clearTimeout(this._lerpTimeoutId)
        }

        let oldProgressBarValue = parseInt(this.progressBar.value)
        let lerpValue = 0

        console.group(oldProgressBarValue, newProgressBarValue, lerpValue)

        this._lerpTimeoutId = setTimeout(()=>{
            this._lerpFunc(oldProgressBarValue, newProgressBarValue, lerpValue)
        }, 1)
    }

    /**
     * Clamp
     * @param {number} a - lower limit
     * @param {number} val - value to be clamped
     * @param {number} b - upper limit
     * @returns {number}
     */
    static clamp(a, val, b) {
        return Math.min(b, Math.max(val, a))
    }

    static _ease(x) {
        x = Progress.clamp(0, x, 1)
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    /**
     * Linear Interpolates between numbers. Use eased values to add easing or other stuff
     * @param {number} a - Beginning value 
     * @param {number} b - Ending value
     * @param {number} value - Value to interpolate between. value isn't clamped.
     * @returns {number} - Interpolated value
     */
    static _lerp(a, b, value) {
        return a + value * (b-a)
    }

    /**
     * @param {number} oldProgressBarValue 
     * @param {number} newProgressBarValue 
     * @param {number} lerpValue 
     */
    _lerpFunc(oldProgressBarValue, newProgressBarValue, lerpValue) {
        lerpValue += 0.015 // Maybe could be customized

        let lerpedProgressBarValue =  Progress._lerp(
            oldProgressBarValue,
            newProgressBarValue,
            Progress._ease(lerpValue)
        )

        this.progressBar.value = lerpedProgressBarValue
        
        if (lerpValue < 1) {
            this._lerpTimeoutId = setTimeout(()=>{
                this._lerpFunc(oldProgressBarValue, newProgressBarValue, lerpValue)
            }, 10)
        } else {
            this._lerpTimeoutId = 0
        }
    }



}

// Allow scrolling here?
// Maybe, to seperate functionality
class ProgressBar {
    constructor() {

    }
}