/** Saves Rows of Blocks to  Chrome Storage */
function saveOptions() {
    blockTimesMap = []; // Delete Existing Map

    let blocks = document.getElementById("blocks")
    for (const block of blocks.children) {
        let id = block.id
        let number = document.getElementById(`blockNum-${id}`).value
        if (number) { // Only save if number has been filled
            blockTimesMap[id-1] = {
                number: number, 
                startTime: document.getElementById(`blockStart-${id}`).value, 
                endTime: document.getElementById(`blockEnd-${id}`).value
            }
        }
    }

    chrome.storage.sync.set({ 'blockTimesMap': blockTimesMap });
};

/** Pulls data from Chrome Storage and creates rows in the DOM  */
function loadOptions() {
    chrome.storage.sync.get({'blockTimesMap': []},
        (result) => {
            document.getElementById("blocks").innerHTML = ""
            newBlockId = 1

            for (const block of result.blockTimesMap) {
                if (block) { // Some elements may be null from previous deletions
                    addBlock({number: block.number, startTime: block.startTime, endTime: block.endTime})
                }
            }
        }
    );
};

/** Adds a Block row to the DOM */
function addBlock(block = {number: '', startTime: '', endTime: ''}) {
    let newBlock = `<div class="row" id="${newBlockId}">
        <label for="blockNum-${newBlockId}">Block Number: </label>
        <input type="text" name="blockNum-${newBlockId}" id="blockNum-${newBlockId}" value=${block.number}>
        <label for="blockStart-${newBlockId}">Start Time: </label>
        <input type="text" name="blockStart-${newBlockId}" id="blockStart-${newBlockId}" value=${block.startTime}>
        <label for="blockEnd-${newBlockId}">End Time: </label>
        <input type="text" name="blockEnd-${newBlockId}" id="blockEnd-${newBlockId}" value=${block.endTime}>
        <button id="trash-${newBlockId}"><i class="fa fa-trash-o"></i></button>
    </div>`

    document.getElementById("blocks").insertAdjacentHTML('beforeend', newBlock);

    document.getElementById(`trash-${newBlockId}`).addEventListener("click", (event) => {deleteBlock(event)})

    newBlockId++
}

/** Removes a Block row from the DOM */
function deleteBlock(event) {
    let block = event.currentTarget.parentNode
    let blocks = block.parentNode
    blocks.removeChild(block);
}   





/** MAIN */
let blockTimesMap = []; // GLOBAL
let newBlockId = 1 // GLOBAL

document.addEventListener('DOMContentLoaded', () => {loadOptions()});
document.getElementById('addBlock').addEventListener('click', () => {addBlock()});
document.getElementById('save').addEventListener('click', () => {saveOptions()});