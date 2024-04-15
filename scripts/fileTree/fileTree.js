/**
 * @typedef {Object} Folder
 * @property {string} name
 * @property {Folder[] | undefined} fileContents
 * @property {boolean} highlight
 */

/**
 * Creates a file structure figure from a Ul Element.
 * This function will add a '.folders' class to the div element to style it.
 * Folder/file icons are li::before pseudo elements, style them as you wish
 * Folder li elements will have .folder class
 * File li elements will have .file class
 * If highlight is true, then the 'highlight' class will be added to the element
 * @param {HTMLDivElement[]} element - div element to build tree
 * @param {Folder} folderStructure - Folder Structure of the file tree
 */
function createFileTree(elements, folderStructure) {
    for (const element of elements) {
        element.classList.add("folders")
        // element.style.setProperty("--folder-url", `url("${folderIconUrl}")`)
        // element.style.setProperty("--file-url", `url("${fileIconUrl}")`)
        
        const ul = document.createElement("ul")
        element.appendChild(ul)
        createFolder(ul, folderStructure)
    }
    
}

/**
 * Recursive function to create elements in the folder structure object
 * @param {HTMLUListElement} element - ul element that will contain the folder
 * @param {Folder} folderStructure - Folder Structure of the file tree
 */
function createFolder(element, folderStructure) {
    const li = document.createElement("li")
    const p = document.createElement("p")
    element.appendChild(li)
    li.appendChild(p)

    p.innerHTML = folderStructure.name

    if (folderStructure.highlight) {
        li.classList.add("highlight")
    }

    if (folderStructure.fileContents === undefined) {
        li.classList.add("file")
    } else {
        li.classList.add("folder")
        // Create new folder
        const ul = document.createElement("ul")
        li.appendChild(ul)
        for (const folder of folderStructure.fileContents) {
            createFolder(ul, folder)
        }
    }
    
}

/* <ul class="folders">
    <li>
        <p>Course Commenting Web App</p>
        <ul>
            <li>
                <p>FrontEnd</p>
            </li>
            <li>
                <p>BackEnd</p>
            </li>
        </ul>
    </li>
</ul> */
