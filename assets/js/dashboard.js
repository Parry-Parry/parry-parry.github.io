const repoOwner = 'Parry-Parry';
const repoName = 'workstationtracker';

// Function to fetch log data from a specific file in the repository
async function fetchLogData(systemID) {
    const response = await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/logs/${systemID}.log`);
    return await response.text();
}

// Function to parse log data and extract the most recent utilization
function parseLogData(logData, systemID) {
    // Split log data by lines
    const lines = logData.split('\n');
    
    // Initialize an array to store utilization data
    const utilizationData = [];

    // Process each line of the log data
    for (const line of lines) {
        // Trim the line to remove leading and trailing whitespace
        const trimmedLine = line.trim();
        
        // Check if the line is not empty after trimming
        if (trimmedLine) {
            const [datetimestr, gpuID, utilization] = trimmedLine.split('\t');
            const [datePart, timePart] = datetimestr.split(' ');

            const [year, month, day] = datePart.split('-');
            const [hours, minutes, seconds] = timePart.split(':');

            // print the datetime, gpuID, and utilization to the console
            console.log(datetime, gpuID, utilization);
            if (gpuID && utilization) {
                utilizationData.push({
                    datetime: new Date(year, month - 1, day, hours, minutes, seconds),
                    systemID,
                    gpuID: `GPU${gpuID}`,
                    utilization: parseInt(utilization)
                });
            }
        }
    }
    return utilizationData;
}
// Function to find the most recent utilization data by datetime

function findMostRecentUtilization(logData) {
    const utilizationMap = new Map(); // Map to store the most recent utilization data

    for (const entry of logData) {
        const key = `${entry.systemID}-${entry.gpuID}`;
        if (!utilizationMap.has(key) || entry.datetime > utilizationMap.get(key).datetime) {
            utilizationMap.set(key, entry);
        }
    }

    return Array.from(utilizationMap.values());
}

// Function to populate the table with data
async function populateTable() {
    const systemIDs = ['uama', 'bruce', 'neoch']; // Add your system IDs here

    for (const systemID of systemIDs) {
        try {
            const logData = await fetchLogData(systemID);
            const mostRecentUtilizationData = findMostRecentUtilization(logData);

            for (const data of mostRecentUtilizationData) {
                const row = document.createElement('tr');
                const systemIDCell = document.createElement('td');
                const gpuIDCell = document.createElement('td');
                const utilizationCell = document.createElement('td');

                systemIDCell.textContent = data.systemID;
                gpuIDCell.textContent = data.gpuID;
                utilizationCell.textContent = `${data.utilization}%`;

                row.appendChild(systemIDCell);
                row.appendChild(gpuIDCell);
                row.appendChild(utilizationCell);

                const dataTable = document.getElementById('data-table');
                if (dataTable) {
                    dataTable.appendChild(row);
                } else {
                    console.error("Element with ID 'data-table' not found in the HTML.");
                }
            }
        } catch (error) {
            console.error(`Error fetching or processing data for systemID ${systemID}: ${error.message}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // This code will execute when the page is fully loaded.

    // Call the populateTable() function here.
    populateTable();
});