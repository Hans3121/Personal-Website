import { HelloText } from "./scripts/helloText.js"
import { Progress } from "./scripts/progress.js"


let helloText = document.getElementById("hello-text")
let hello = new HelloText(2000, 500, helloText)
hello.start()

let progressSlider = document.getElementById("nav-slider") /* See CSS of nav-slider and children in index.css, since progress.js animates on it*/
let screens = document.getElementById("screens") /* See CSS of screens and children in index.css, since progress.js animates on it */
let buttonContainer = document.getElementsByTagName("nav")[0]
let progress = new Progress(progressSlider, screens, buttonContainer)
// progress.changeScreen(1)
