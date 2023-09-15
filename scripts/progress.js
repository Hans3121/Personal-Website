// Todo: Add extra animation vs minimal animation, maybe by adding another class
// Todo: Add scrollable feature, by padding the parent, possibly....


/**
 * Class to replace the functionality of a scrollbar by using a {@link progressBar}
 * to scroll/progress through multiple {@link screens}.
 * 
 * Screens sizes should be equal to the parent container's size
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
     * Animator for progress bar 
     * @type {ProgressBarAnimator}
     */
    #progressBarAnimator

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
     * parent container of screens
     * @type {HTMLElement}
     */
    screenParent

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
     * The max attribute will be {@link rangeLengthMultiplier} * {@link screens}.length
     * @type {number}
     */
    rangeLengthMultiplier = 1000


    /**
     * Construcs a progress object. Incomplete Documentation
     * @param {HTMLInputElement} progressBar
     * @param {HTMLCollectionOf<Element>} screens
     * @param {HTMLElement} screenParent
     * @param {HTMLDataListElement} datalist
     */
    constructor(progressBar, screens, datalist) {
        this.progressBar = progressBar
        this.#progressBarAnimator = new ProgressBarAnimator(progressBar) 
        this.screens = screens
        this.datalist = datalist
        this.currentScreenIndex = 0
        this.#setup()
    }

    /**
     * Private function to setup the whole thing, called when class is constructed.
     */
    #setup() {
        // Sets up the screens list
        for (let i = 1; i < this.screens.length; i++){
            this.screens[i].classList.add("hide")
        }
        // Sets up the first screen
        this.screens[0].classList.remove("hide")
        this.screens[0].classList.add("show")

        this.#setupProgressBar()
        this.#setupDatalist()
        
    }

    #progressBarChangeTimeoutId
    #setupProgressBar() {
        // Sets up the progress bar
        this.progressBar.max = (this.screens.length - 1) * this.rangeLengthMultiplier
        // this.progressBar.step = this._rangeLengthMultiplier
        this.progressBar.min = 0
        this.progressBar.value = 0
        this.progressBar.addEventListener('change', (ev) => {
            this.#progressBarAnimator.stopAnim()

            clearTimeout(this.#progressBarChangeTimeoutId)
            this.#progressBarChangeTimeoutId = setTimeout(()=>{
                let index = Math.round(this.progressBar.value / this.rangeLengthMultiplier)
                this.changeScreen(index)
            },10)
            
        })
    }

    #setupDatalist() {
        for (let i = 0; i < this.screens.length; i++) {
            let option = document.createElement("option")
            option.value = i * this.rangeLengthMultiplier
            option.label = this.screens[i].dataset.title || "Untitled"
            option.addEventListener("click", (ev) => {
                this.changeScreen(i)
            })
            this.datalist.appendChild(option)
        }
    }


    _changeScreenTimeoutId
    /**
     * Changes the screen and moves the scrollbar by calling {@link scrollProgressBar}.
     * Index should be between 0 to the length of screens
     * @param {number} newScreenIndex 
     */
    changeScreen(newScreenIndex) {
        // this.progressBar.value = newScreenIndex * this._rangeLengthMultiplier
        this.#progressBarAnimator.scrollTo(newScreenIndex * this.rangeLengthMultiplier)

        if (newScreenIndex == this.currentScreenIndex) {
            return
        }

        
        // Hide Current Screen
        let currentScreen = this.screens[this.currentScreenIndex].classList
        currentScreen.remove("show")
        currentScreen.add("hide")

        this.currentScreenIndex = newScreenIndex;

        clearTimeout(this._changeScreenTimeoutId)
        // Show Current Screen after x minutes
        // Simulates a closure.. not pretty though..
        this._changeScreenTimeoutId = setTimeout(()=>{
                let newScreen = this.screens[newScreenIndex].classList
                newScreen.remove("hide")
                newScreen.add("show")
            }, this.changeScreenDelay)
        

    }
}

// Allow scrolling here?
// Maybe, to seperate functionality
class ProgressBarAnimator {
    /**
     * The Input Range bar to animate
     * @type {HTMLInputElement}
     */
    _progressBar

    /**
     * An array containing the would be value of progress bar
     * @type {Function[]}
     */
    _progressValueQueue

    /**
     * Ms of time between every setInterval 
     */
    _timeBetweenAnim = 10

    /**
     * Animation Manager for progressBar
     * @param {HTMLInputElement} progressBar 
     */
    constructor(progressBar) {
        this._progressBar = progressBar
    }

    scrollTo(newValue) {
        this.stopAnim()
        this._lerpFunc(parseInt(this._progressBar.value), newValue)
        this.startAnim()
    }

    startAnim() {
        setTimeout(()=>{
            if (this._progressValueQueue.length) {
                this._progressValueQueue.pop()() // Execute the function
                this.startAnim() // Loop until length runs out
            }
        }, 10)
    }

    stopAnim() {
        this._progressValueQueue = []
    }

    /**
     * @param {number} oldProgressBarValue 
     * @param {number} newProgressBarValue 
     * @param {number} lerpValue 
     */
    _lerpFunc(oldProgressBarValue, newProgressBarValue, lerpValue = 0) {
        lerpValue += 0.015 // Maybe could be customized

        let lerpedProgressBarValue =  ProgressBarAnimator._lerp(
            oldProgressBarValue,
            newProgressBarValue,
            ProgressBarAnimator._ease(lerpValue)
        )

        this._progressBar.value = lerpedProgressBarValue
        
        if (lerpValue < 1) {
            this._progressValueQueue.push(()=>{
                this._lerpFunc(oldProgressBarValue, newProgressBarValue, lerpValue)
            })
        }
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
        x = ProgressBarAnimator.clamp(0, x, 1)
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
    
}