/** Load the stored options in the extension from Chrome Storage into this JS script to be used in conversions from block numbers to times */
function loadBlockTimesMap() {
    chrome.storage.sync.get({'blockTimesMap': []},
        (result) => {
            blockTimesMap = result.blockTimesMap;
        }
    );
}

/** Check for Block numbers followed by a * and replace them with their corresponding block times \
 * Ex) "Block 4*" becomes "Block 4 from 8:55am to 10:25am"
 * which is then translated to an event called "Block 4" from the time 8:55am to 10:25am in the calendar.
*/
function automateBlockTimes(e) {
    input_div = e.target
    title = input_div.value
    for (const block of blockTimesMap) { // Check each block number in the map
        if (title.includes(block.number+"*")) {
            input_div.value = input_div.value.slice(0, -1)  + ` from ${block.startTime} to ${block.endTime}` // Remove the * and add the times for google calendar to translate into start and end times
        }
    }
}

/** MAIN */
let blockTimesMap = []; // GLOBAL

// Create an observer instance to watch for changes in the DOM
var observer = new MutationObserver(function () {
    const input_div = document.querySelector("input[placeholder='Add title and time']")
    if (input_div) {
        loadBlockTimesMap() // Refresh Block Times Map
        input_div.addEventListener("input", automateBlockTimes)
    }
}); // GLOBAL

observer.observe(document.body, {childList: true, subtree: true});

  
