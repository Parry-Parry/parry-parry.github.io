const repoOwner = 'Parry-Parry';
const repoName = 'workstationtracker';

// Function to fetch log data from a specific file in the repository
async function fetchLogData(systemID) {
    const response = await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/logs/${systemID}.log`);
    return await response.text();
}

// Function to parse log data and extract the most recent utilization
function parseLogData(logData, systemID) {
    if (!logData.trim()) {
        // Handle empty log files
        return [{ systemID, error: 'No data available' }];
    }

    // Split log data by lines
    const lines = logData.split('\n');
    
    // Initialize an array to store utilization data
    const utilizationData = [];

    // Process each line of the log data
    for (const line of lines) {
        const [datetime, gpuID, utilization] = line.split('\t');
        
        if (gpuID && utilization) {
            utilizationData.push({
                systemID,
                gpuID: `GPU${gpuID}`,
                utilization: parseInt(utilization)
            });
        }
    }

    return utilizationData;
}

// Function to populate the table with data
async function populateTable() {
    const systemIDs = ['uama', 'bruce', 'neoch']; // Add your system IDs here

    for (const systemID of systemIDs) {
        const logData = await fetchLogData(systemID);
        const utilizationData = parseLogData(logData, systemID);

        for (const data of utilizationData) {
            const row = document.createElement('tr');
            const systemIDCell = document.createElement('td');
            const gpuIDCell = document.createElement('td');
            const utilizationCell = document.createElement('td');

            systemIDCell.textContent = data.systemID;
            if (data.error) {
                gpuIDCell.textContent = 'Error';
                utilizationCell.textContent = data.error;
            } else {
                gpuIDCell.textContent = data.gpuID;
                utilizationCell.textContent = `${data.utilization}%`;
            }
            row.appendChild(systemIDCell);
            row.appendChild(gpuIDCell);
            row.appendChild(utilizationCell);

            document.getElementById('data-table').appendChild(row);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // This code will execute when the page is fully loaded.

    // Call the populateTable() function here.
    populateTable();
});