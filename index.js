import { HelloText } from "./scripts/helloText.js"
import { Progress } from "./scripts/progress.js"


let helloText = document.getElementById("hello-text")
let hello = new HelloText(2000, 500, helloText)
hello.start()

let progressBar = document.getElementById("progress")
let screens = document.getElementsByClassName("screen")
let datalist = document.getElementById("screen-labels")
let progress = new Progress(progressBar, screens, datalist)

