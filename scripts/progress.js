// Todo: Add extra animation vs minimal animation, maybe by adding another class
// Todo: Add scrollable feature, by padding the parent, possibly....


/**
 * Class to replace the functionality of a scrollbar by using a {@link progressSlider}
 * to scroll/progress through multiple {@link screens}.
 * 
 * Screens sizes should be equal to the parent container's size
 * 
 * Animations should be done using css. This script adds the class 'show' 
 * when the screen is meant be showed and replaces it with the class 'hide' when it is meant to be hidden.
 * 
 * For best visuals, add the class 'hide' to all screens in the html.
 */
class Progress {
    /** 
     * The Progress Bar of the website, replaces the scrollbar
     * @type {HTMLElement}
     */
<<<<<<< Updated upstream
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
=======
    progressSlider
>>>>>>> Stashed changes

    /**
     * The screens the progress bar will progress through
     * @type {HTMLCollectionOf<HTMLElement>}
     */
    screens

    /**
     * Container for the buttons that will change the screens
     * @type {HTMLElement}
     */
    buttonContainer

    /**
     * The MS delay of time when changing screens
     * @type {number}
     */
    changeScreenDelay = 500


    /**
     * Construcs a progress object. 
     * @param {HTMLElement} progressSlider - The element that would be the progress slider
     * @param {HTMLElement} screensContainer - Container of all the screens
     * @param {HTMLElement} buttonContainer - Container that will be filled with buttons to change screens
     */
<<<<<<< Updated upstream
    constructor(progressBar, screens, datalist) {
        this.progressBar = progressBar
        this.#progressBarAnimator = new ProgressBarAnimator(progressBar) 
        this.screens = screens
        this.datalist = datalist
        this.currentScreenIndex = 0
=======
    constructor(progressSlider, screensContainer, buttonContainer) {
        this.progressSlider = progressSlider
        this.screens = screensContainer.children
        this.buttonContainer = buttonContainer
>>>>>>> Stashed changes
        this.#setup()
    }

    /**
     * Private function to setup the whole thing, called when class is constructed.
     */
    #setup() {
<<<<<<< Updated upstream
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
=======
        // Setup the buttons
>>>>>>> Stashed changes
        for (let i = 0; i < this.screens.length; i++) {
            let btn = document.createElement("button")
            btn.innerText = this.screens[i].dataset.title || "Untitled"
            btn.addEventListener("click", () => {
                this.changeScreen(i)
            })
            this.buttonContainer.appendChild(btn)
        }

        this.changeScreen(0)     
    }


    /**
     * Holds the Id of the Timeout Function so only one of it can exist at a time, 
     * otherwise may cause weird screen changes
     */
    _changeScreenTimeoutId
    /**
     * Changes the screen and moves the scrollbar by calling {@link scrollProgressBar}.
     * Index should be between 0 to the length of screens
     * @param {number} newScreenIndex 
     */
    changeScreen(newScreenIndex) {
<<<<<<< Updated upstream
        // this.progressBar.value = newScreenIndex * this._rangeLengthMultiplier
        this.#progressBarAnimator.scrollTo(newScreenIndex * this.rangeLengthMultiplier)
=======
        this.progressSlider.style.setProperty('--value', newScreenIndex * 100 / (this.screens.length-1) + "%")
>>>>>>> Stashed changes


        this.#hideAllScreens()

        clearTimeout(this._changeScreenTimeoutId)
        this._changeScreenTimeoutId = setTimeout(()=>{
                this.#hideAllScreens()
                this.screens[newScreenIndex].classList.replace("hide", "show")
            }, this.changeScreenDelay)
    }

    #hideAllScreens() {
        for (let i = 0; i < this.screens.length; i++){
            let classList = this.screens[i].classList
            classList.add("hide")
            classList.remove("show")
        }
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