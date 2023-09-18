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
    progressSlider

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
    constructor(progressSlider, screensContainer, buttonContainer) {
        this.progressSlider = progressSlider
        this.screens = screensContainer.children
        this.buttonContainer = buttonContainer
        this.#setup()
    }

    /**
     * Private function to setup the whole thing, called when class is constructed.
     */
    #setup() {
        // Setup the buttons
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
        this.progressSlider.style.setProperty('--value', newScreenIndex * 100 / (this.screens.length-1) + "%")


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
