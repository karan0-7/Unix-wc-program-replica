const fs = require('fs');

let filePath = process.argv[2] || '';
let options = process.argv.slice(3) || [];

function fileInfo(fileName) {
    let totalBytes = 0, showBytes = false;
    let totalLines = 0, showLines = false;
    let totalWords = 0, showWords = false;
    let totalCharacters = 0, showCharacters = false;
    let state = 'VALID_CHAR';
    let startTime = new Date();
    let isInvalidOption = '';

    for (let option of options) {
        switch (option) {
            case '-c': showBytes = true; break;
            case '-m': showCharacters = true; break;
            case "-l": showLines = true; break;
            case "-w": showWords = true; break;
            default: isInvalidOption = option;
        }

        if(isInvalidOption)break;
    }

    if(isInvalidOption){console.log(`Invalid option: ${isInvalidOption}. Accepted values: -c -m -l -w`); return;}

    if(!showBytes && !showCharacters && !showLines && !showWords)    
         showBytes=showCharacters=showLines=showWords=true;
        

    try {
        let readStream = fs.createReadStream(fileName);
        readStream.on("data", (data) => {

            if (showBytes)
                totalBytes += data.length;

            let dataStringFormat = data.toString();

            for (let item of dataStringFormat) {
                if (showCharacters)
                    totalCharacters++;

                // We differentitate between words if they are separated by a space, new line or tab
                if (showWords) {
                    if ([" ", "\n", "\t"].includes(item)) {
                        if (state == 'VALID_CHAR')
                            totalWords++;
                        state = 'INVALID_CHAR';
                    }
                    else
                        state = 'VALID_CHAR';
                }

                // Every newline is identified by the occurence of a newline escape character
                if (showLines && item == '\n')
                    totalLines++;
            }

        });
        readStream.on("end", () => {
        showBytes && console.log("TOTAL BYTES OF FILE:", totalBytes);
        showCharacters && console.log("TOTAL CHARACTERS OF FILE:", totalCharacters);
        showLines && console.log("TOTAL LINES OF FILE:", totalLines);
        showWords && console.log("TOTAL WORDS OF FILE:", totalWords);        
        console.log("TOTAL TIME TAKEN:", new Date() - startTime, "ms")}
    );
    }
    catch (err) {
        console.log("Error occurred:", err)
    }
}

// Pass the path of the file to the below function:
fileInfo(filePath)
