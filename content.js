/** automateBlockTimes
 * 
 * Check for Block letters followed by a * and replace them with their corresponding block times \
 * Ex) "Block A*" becomes "Block A from 8:45am to 10:35am"
 * which is then translated to an event called "Block A" from the time 8:55am to 10:25am in the calendar.
*/
function automateBlockTimes(e) {
    input_div = e.target
    title = input_div.value
    for (const block of ["A", "B", "C", "D"]) { // Check each block
        if (title.includes(block+"*")) {
            let day = new Date(document.querySelector("span[data-key='startDate']").innerText)

            let rotation = getRotation([day.toLocaleString('default', { month: 'long' }), day.getDate()]); // Get this from the date of the event

            if (rotation == null) { 
                alert("THE BLOCK TIME AUTOMATION CHROME EXTENSION SAYS:\nThere is no class schedule found for the given date.\nThe schedule is currently only set for weekdays until June 21st, 2023.\nIf you believe this is a error please contact the developer via the chrome store page.")
                return; 
            }

            let times = getStartAndEndTimes(rotation, block)

            input_div.value = input_div.value.slice(0, -1)  + ` from ${times.start} to ${times.end}` // Remove the * and add the times for google calendar to translate into start and end times
        }
    }
}

/** getStartAndEndTimes 
 * 
 * Returns the start and end times of a given block based on the current rotation.
 * 
 * The period times are hardcoded in here from the schedule.
*/
function getStartAndEndTimes(rotation, block) {
    let period1 = {
        "start": "8:45am",
        "end": "10:35am"
    }
    let period2 = {
        "start": "10:40am",
        "end": "11:50am"
    }
    let period3 = {
        "start": "12:30pm",
        "end": "1:40pm"
    }
    let period4 = {
        "start": "1:45pm",
        "end": "2:55pm"
    }

    /** Index this by blockToTimeMap["*Rotation*"]["*Specific Desired Block Time*"] */
    let blockToTimeMap = {
        "A": {
            "A": period1,
            "B": period2,
            "C": period3,
            "D": period4
        },
        "B": {
            "B": period1,
            "A": period2,
            "D": period3,
            "C": period4
        },
        "C": {
            "C": period1,
            "D": period2,
            "A": period3,
            "B": period4
        },
        "D": {
            "D": period1,
            "C": period2,
            "B": period3,
            "A": period4
        }
    }

    return blockToTimeMap[rotation][block]
}

/** getRotation
 * 
 * Gets the rotation letter for a given date based on the hardcoded schedule
 * 
 * date: an array of month and date, ex) ["June", "4"]
 */
function getRotation(date) {
    return  schedule[date[0]][date[1]]
}

function createAutomateButton(addTimeButton) {
    let automateButton = document.createElement("BUTTON");
    let style = 'color: rgb(95,99,104);border-color: var(--gm-hairlinebutton-outline-color,rgb(218,220,224));height: 28px;margin-top: 0;margin-bottom: 0;padding: 0 8px 0 8px;font-size: .75rem;will-change: unset;border-width: 1px;font-family: "Google Sans",Roboto,Arial,sans-serif;letter-spacing: .0107142857em;font-weight: 500;text-transform: none;transition: border .28s cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1);box-shadow: none;border-style: solid;position: relative;display: inline-flex;-webkit-box-align: center;justify-content: center;box-sizing: border-box;min-width: 20px;outline: none;line-height: inherit;    user-select: none;-webkit-appearance: none;overflow: visible;vertical-align: middle;background: transparent;align-items: center;text-decoration: none;'
    automateButton.id = "automateButton"
    automateButton.style = style
    automateButton.innerHTML = `<svg style="width:20px; height:20px" width="20" height="20" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 406.6"><path d="M334.1 1.64a202.504 202.504 0 0 1 135.16 77.02c68.84 88.6 52.82 216.19-35.78 285.03-.08.05-.14.11-.22.18-88.57 68.82-216.15 52.81-284.97-35.76-.04-.06-.09-.12-.14-.17A204.822 204.822 0 0 1 125.31 291a168.69 168.69 0 0 0 37.79-5.42 172.61 172.61 0 0 0 13.55 20.29c56.7 72.81 161.67 85.86 234.46 29.15 72.8-56.69 85.84-161.66 29.15-234.46-40.28-51.71-107.08-75.09-170.82-59.79a171.08 171.08 0 0 0-21.88-31.29c2.46-.8 4.95-1.51 7.46-2.21 25.77-7.13 52.69-9.03 79.19-5.63h-.11zM0 129.16v-15.4C3.97 50.8 56.26.95 120.21.92h.05c66.58-.01 120.55 53.93 120.59 120.51.03 66.58-53.93 120.56-120.51 120.59C56.33 242.04 3.97 192.17 0 129.16zm158.04-71.34c-1.65-1.11-3.51-1.62-5.4-1.24-1.87.37-3.51 1.37-4.63 2.99l-6.4 9.04c-4.34-1.93-9.86-3.2-14.54-3.89l-2-11.79c-.4-1.99-1.4-3.49-2.91-4.64-1.63-1.12-3.38-1.5-5.38-1.12l-14.8 2.62c-1.9.39-3.39 1.27-4.65 2.9-1.11 1.62-1.62 3.38-1.25 5.4l1.89 10.78c-4.56 1.9-9.08 4.68-12.92 7.78l-10.04-6.92c-1.63-1.12-3.38-1.61-5.25-1.24-1.91.38-3.54 1.39-4.65 3.01l-8.53 12.16c-1.14 1.64-1.63 3.51-1.25 5.4.36 2 1.36 3.51 3.01 4.62l9.02 6.42c-1.91 4.28-3.21 9.89-3.89 14.55l-11.78 2c-2.02.38-3.51 1.38-4.67 2.89-1.11 1.64-1.49 3.38-1.11 5.38l2.62 14.8c.4 1.89 1.27 3.4 2.91 4.65 1.63 1.13 3.39 1.64 5.39 1.26l10.78-1.89c2 4.73 4.72 8.97 7.78 13.06l-6.92 9.91c-1.11 1.62-1.62 3.38-1.24 5.25.38 1.88 1.38 3.51 3.02 4.64l12.29 8.65a6.88 6.88 0 0 0 5.38 1.14c1.89-.38 3.52-1.25 4.78-2.89l6.38-9.16c4.41 1.94 9.81 3.18 14.57 3.91l2 11.78c.37 2 1.37 3.51 2.88 4.63 1.65 1.13 3.39 1.51 5.39 1.13l14.8-2.62c1.89-.39 3.38-1.27 4.65-2.9 1.13-1.62 1.64-3.37 1.24-5.37l-1.86-10.79c4.77-2.02 8.91-4.72 13.04-7.8l9.92 6.92c1.62 1.11 3.36 1.61 5.36 1.24 2.02-.36 3.51-1.38 4.66-3.01l8.65-12.29c1.12-1.62 1.51-3.53 1.12-5.38-.36-1.89-1.25-3.51-2.87-4.8l-9.16-6.25c1.91-4.31 3.21-9.88 3.87-14.55l11.8-2c2-.39 3.51-1.39 4.67-2.9 1.11-1.62 1.49-3.37 1.11-5.37l-2.64-14.81c-.38-1.87-1.27-3.38-2.89-4.63-1.63-1.15-3.39-1.66-5.39-1.26l-10.78 1.87c-2.08-4.69-4.56-8.92-7.78-12.92l6.9-10.03c1.13-1.64 1.64-3.4 1.24-5.26-.36-1.88-1.36-3.5-3-4.66l-12.17-8.51-.37.11zm-37.61 32.04c17.46 0 31.63 14.16 31.63 31.62s-14.17 31.62-31.63 31.62-31.62-14.16-31.62-31.62 14.16-31.62 31.62-31.62zm177.19 14.65c1.24-9.88 10.24-16.88 20.09-15.64h.04c9.82 1.32 16.73 10.32 15.46 20.13l-11.7 94.09 65.06 50.55c7.85 6.1 9.3 17.4 3.2 25.28a18.011 18.011 0 0 1-11.95 6.82c-4.73.62-9.51-.68-13.26-3.62l-72.82-56.61a17.818 17.818 0 0 1-5.79-7.08 18.336 18.336 0 0 1-1.46-9.67l13.13-104.2v-.05z"/></svg>`
    addTimeButton.parentElement.appendChild(automateButton)
}

/** MAIN */

// Hardcoded Block Rotation
let schedule = {
    "May": {
        "24": "A",
        "25": "C",
        "26": "D", 
        "29": "A", 
        "30": "B", 
        "31": "C", 
    },
    "June": {
        "1": "C",
        "2": "D",
        "5": "A",
        "6": "B",
        "7": "D",
        "8": "C",
        "9": "D",
        "12": "A",
        "13": "B",
        "14": "D",
        "15": "C",
        "16": "D",
        "19": "A",
        "20": "B",
        "21": "C"
    }
} // GLOBAL
let modalOpen = false; // GLOBAL

// Create an observer instance to watch for changes in the DOM
var observer = new MutationObserver(function () {
    const input_div = document.querySelector("input[placeholder='Add title and time']")
    if (input_div) {
        if (!modalOpen) {
            modalOpen = true;
            input_div.addEventListener("input", automateBlockTimes)
        }
    } else {
        modalOpen = false;
    }
}); // GLOBAL

observer.observe(document.body, {childList: true, subtree: true});