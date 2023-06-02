/** automateBlockTimes
 * 
 * Check for Block letters followed by a * and replace them with their corresponding block times \
 * Ex) "Block A*" becomes "Block A from 8:45am to 10:35am"
 * which is then translated to an event called "Block A" from the time 8:55am to 10:25am in the calendar.
*/
function automateBlockTimes(input_div) {
    title = input_div.value
    for (const block of ["A", "B", "C" , "D"]) { // Check each block
        if (title.includes(` ${block} `)) {
            let day = new Date(document.querySelector("span[data-key='startDate']").innerText)
            let month = day.toLocaleString('default', { month: 'long' })
            let date = day.getDate()

            let rotation = getRotation([month, date]); // Get this from the date of the event

            if (rotation == null) { 
                alert("THE BLOCK TIME AUTOMATION CHROME EXTENSION SAYS:\nThere is no class schedule found for the given date.\nThe schedule is currently only set for weekdays until June 21st, 2023.\nIf you believe this is a error please contact the developer via the chrome store page.")
                return; 
            }
            
            let times = getStartAndEndTimes(rotation, block)

            // Instead of substituting the times in text, create a new event in the month page

            //document.querySelector("button[aria-label='Close']").click()

            //setTimeout(() => {

                // var xpath = "//span[text()='Week']";
                // var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                // matchingElement.click()

                // setTimeout(() => {
                //     var xpath = "//span[text()='Month']";
                //     var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                //     matchingElement.click()

                //     setTimeout(() => {
                //         var xpath = `//h2[text()='${date}']`;
                //         var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                //         console.log({obj: matchingElement})
                //         var datekey = matchingElement.dataset.datekey
                //         console.log(datekey)

                //         var matchingElement = document.querySelector(`div[data-datekey="${datekey}"`)
                //         matchingElement.click()
                        
                        //setTimeout(() => {
                            input_div.value += ` from ${times.start} to ${times.end}` // Remove the * and add the times for google calendar to translate into start and end times
                            document.querySelector("span[data-key='startDate']").click()
                            //setTimeout(() => {
                                //var xpath = `//i[text()='access_time']`; 
                                //var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                //matchingElement.click()
                                // document.querySelector(`div[aria-label='${date} ${month}']`).click()
                                setTimeout(() => {
                                    document.querySelector(`input[aria-label='All day']`).click()
                                    
                                
                                     setTimeout(() => {
                                         var xpath = `//span[text()='Save']`;
                                         var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                         matchingElement.click()

                                    //     setTimeout(() => {
                                    //         var xpath = "//span[text()='Month']";
                                    //         var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                    //         matchingElement.click()

                                    //         setTimeout(() => {
                                    //             var xpath = "//span[text()='Week']";
                                    //             var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                    //             matchingElement.click()
                                    //         }, 2000)
                                        
                                    //     }, 2000)
                                    
                                    }, 200)

                                }, 200)

                           // }, 2000)
                        
                        //}, 2000)

            //         }, 2000)

            //     }, 2000)

            // }, 2000)
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
    
    }   
    return  schedule[date[0]][date[1]]
}


/** MAIN */
input_div_week = document.querySelector("input[placeholder='Add title']")
if (input_div_week) {
    automateBlockTimes(input_div_week)
}

