document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the hidden activities
    const hiddenActivities = document.querySelectorAll('.hidden');
    hiddenActivities.forEach(activity => {
        activity.style.display = 'none';
    });
});

function toggleActivities() {
    const hiddenActivities = document.querySelectorAll('.hidden');
    hiddenActivities.forEach(activity => {
        if (activity.style.display === 'none') {
            activity.style.display = 'list-item';
        } else {
            activity.style.display = 'none';
        }
    });
}

// Activities Section (for generating report or displaying selected activities)
function displaySelectedActivities() {
    addSectionTitle("Activities");
    const activitiesList = document.getElementById("activitiesList");
    if (activitiesList) {
        const checkedActivities = Array.from(activitiesList.querySelectorAll("input[type='checkbox']:checked"))
            .map(checkbox => checkbox.value);

        if (checkedActivities.length > 0) {
            const activitiesText = checkedActivities.map(activity => `- ${activity}`).join('\n');
            addSubHeadingAndText("Selected Activities", activitiesText);
        } else {
            addSubHeadingAndText("Selected Activities", "None selected");
        }
    }
    addPage();
}

// Update Slider Values and Risk Calculations
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", () => {
        const sliderValue = slider.nextElementSibling;
        sliderValue.innerText = slider.value; // Update displayed slider value
        updateRiskScore(); // Recalculate risk score dynamically
        updateRecommendations(); // Generate recommendations dynamically
        initializeRadarChart(); // Update radar chart dynamically
    });
});

// Dynamic Risk Calculations
function updateRiskScore() {
    const weights = {
        erosion: 0.15,
        vegetation: 0.15,
        waterQuality: 0.1,
        habitatDisruption: 0.1,
        airQuality: 0.1,
        noisePollution: 0.15,
        wasteManagement: 0.15,
        biodiversity: 0.05,
        carbonFootprint: 0.05,
    };

    const riskMetrics = [
        "erosion", "vegetation", "water-quality", "habitat-disruption", "air-quality",
        "noise-pollution", "waste-management", "biodiversity", "carbon-footprint"
    ];

    let totalRiskScore = 0;

    riskMetrics.forEach(metric => {
        const value = parseFloat(document.getElementById(metric).value) * weights[metric];
        totalRiskScore += value;
        console.log(`${metric} value: ${value}`); // Log each metric value
    });

    const riskScoreElement = document.getElementById("risk-score");
    if (riskScoreElement) {
        riskScoreElement.innerText = Math.round(totalRiskScore);
    } else {
        console.error("Element with ID 'risk-score' not found.");
    }

    const riskLevelElement = document.getElementById("risk-level");
    if (riskLevelElement) {
        if (totalRiskScore <= 30) {
            riskLevelElement.innerText = "Low Risk";
            riskLevelElement.style.color = "green";
        } else if (totalRiskScore <= 60) {
            riskLevelElement.innerText = "Moderate Risk";
            riskLevelElement.style.color = "orange";
        } else {
            riskLevelElement.innerText = "High Risk";
            riskLevelElement.style.color = "red";
        }
    } else {
        console.error("Element with ID 'risk-level' not found.");
    }

    console.log(`Total Risk Score: ${totalRiskScore}`); // Log total risk score
}

function updateRecommendations() {
    const recommendations = [];
    const erosionValue = parseFloat(document.getElementById("erosion").value);
    const vegetationValue = parseFloat(document.getElementById("vegetation").value);
    const waterQualityValue = parseFloat(document.getElementById("water-quality").value);
    const habitatDisruptionValue = parseFloat(document.getElementById("habitat-disruption").value);
    const airQualityValue = parseFloat(document.getElementById("air-quality").value);
    const noisePollutionValue = parseFloat(document.getElementById("noise-pollution").value);
    const wasteManagementValue = parseFloat(document.getElementById("waste-management").value);
    const biodiversityValue = parseFloat(document.getElementById("biodiversity").value);
    const carbonFootprintValue = parseFloat(document.getElementById("carbon-footprint").value);

    if (erosionValue > 90) {
        recommendations.push("Consider terracing and retaining walls for severe erosion control.");
    } else if (erosionValue > 70) {
        recommendations.push("Install erosion control blankets and geotextiles to stabilize soil.");
    } else if (erosionValue > 50) {
        recommendations.push("Implement erosion control measures such as sediment traps.");
    }

    if (vegetationValue > 90) {
        recommendations.push("Establish a long-term vegetation monitoring and maintenance program.");
    } else if (vegetationValue > 70) {
        recommendations.push("Implement a comprehensive reforestation plan with diverse native species.");
    } else if (vegetationValue > 50) {
        recommendations.push("Revegetate damaged areas with native species.");
    }

    if (waterQualityValue > 90) {
        recommendations.push("Implement advanced water filtration systems to maintain high water quality.");
    } else if (waterQualityValue > 70) {
        recommendations.push("Install silt fences and sediment basins to control runoff.");
    } else if (waterQualityValue > 50) {
        recommendations.push("Minimize sediment runoff using buffer zones.");
    }

    if (habitatDisruptionValue > 90) {
        recommendations.push("Implement habitat restoration projects to rehabilitate degraded areas.");
    } else if (habitatDisruptionValue > 70) {
        recommendations.push("Create wildlife corridors to facilitate safe animal movement.");
    } else if (habitatDisruptionValue > 50) {
        recommendations.push("Preserve wildlife habitats and minimize disruptions.");
    }

    if (airQualityValue > 90) {
        recommendations.push("Adopt stringent emission control technologies and practices.");
    } else if (airQualityValue > 70) {
        recommendations.push("Install air quality monitoring stations to track pollution levels.");
    } else if (airQualityValue > 50) {
        recommendations.push("Reduce emissions and control dust in sensitive areas.");
    }

    if (noisePollutionValue > 90) {
        recommendations.push("Adopt advanced noise reduction technologies and practices.");
    } else if (noisePollutionValue > 70) {
        recommendations.push("Implement noise monitoring and mitigation strategies.");
    } else if (noisePollutionValue > 50) {
        recommendations.push("Introduce noise barriers and schedule activities during off-peak hours.");
    }

    if (wasteManagementValue > 90) {
        recommendations.push("Adopt advanced waste treatment and recycling technologies.");
    } else if (wasteManagementValue > 70) {
        recommendations.push("Implement a zero-waste policy and conduct regular waste audits.");
    } else if (wasteManagementValue > 50) {
        recommendations.push("Improve waste management practices, including recycling and waste minimization.");
    }

    if (biodiversityValue > 90) {
        recommendations.push("Implement a comprehensive biodiversity action plan with regular monitoring.");
    } else if (biodiversityValue > 70) {
        recommendations.push("Establish biodiversity hotspots and protected areas.");
    } else if (biodiversityValue > 50) {
        recommendations.push("Enhance biodiversity through habitat restoration and conservation programs.");
    }

    if (carbonFootprintValue > 90) {
        recommendations.push("Achieve carbon neutrality through extensive carbon offset projects.");
    } else if (carbonFootprintValue > 70) {
        recommendations.push("Implement energy efficiency measures and reduce fossil fuel use.");
    } else if (carbonFootprintValue > 50) {
        recommendations.push("Adopt renewable energy sources and carbon offset measures.");
    }

    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = recommendations.length
        ? `<ul>${recommendations.map(rec => `<li>${rec}</li>`).join("")}</ul>`
        : "No significant risks detected. Monitoring recommended.";
}

// Radar Chart Initialization
function initializeRadarChart() {
    const ctx = document.getElementById("impact-chart").getContext("2d");

    // Define the chart data
    const chartData = {
        labels: [
            "Erosion", "Vegetation", "Water Quality", "Habitat Disruption", "Air Quality",
            "Noise Pollution", "Waste Management", "Biodiversity", "Carbon Footprint"
        ],
        datasets: [
            {
                label: "Impact Levels",
                data: [
                    parseInt(document.getElementById("erosion").value),
                    parseInt(document.getElementById("vegetation").value),
                    parseInt(document.getElementById("water-quality").value),
                    parseInt(document.getElementById("habitat-disruption").value),
                    parseInt(document.getElementById("air-quality").value),
                    parseInt(document.getElementById("noise-pollution").value),
                    parseInt(document.getElementById("waste-management").value),
                    parseInt(document.getElementById("biodiversity").value),
                    parseInt(document.getElementById("carbon-footprint").value),
                ],
                backgroundColor: "rgba(44, 110, 73, 0.2)",
                borderColor: "rgba(44, 110, 73, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(44, 110, 73, 1)",
            },
        ],
    };

    // Define the chart configuration
    const radarChartConfig = {
        type: "radar",
        data: chartData,
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.3, // Smoothens the lines for a rounder look
                },
            },
            scales: {
                r: {
                    angleLines: {
                        display: true, // Show angle lines for aesthetic
                    },
                    suggestedMin: 0, // Start at 0
                    suggestedMax: 100, // Ensure the maximum value is fixed at 100
                    ticks: {
                        stepSize: 20, // Steps of 20 for better readability
                        display: true,
                        color: "#6ba583", // Green tick marks
                    },
                    grid: {
                        circular: true, // Makes the chart circular
                    },
                    pointLabels: {
                        font: {
                            size: 14, // Increase size for better readability
                        },
                        color: "#2a6f4b", // Match the deep green for labels
                    },
                },
            },
            plugins: {
                legend: {
                    display: false, // No legend to keep it clean
                },
            },
        },
    };
    // Destroy the existing chart if it exists
    if (window.radarChart) {
        window.radarChart.destroy();
    }

    // Create a new chart instance
    window.radarChart = new Chart(ctx, radarChartConfig);
}

// Reinitialize Radar Chart on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initializeRadarChart();
    updateRiskScore();
    updateRecommendations();
});

// Save Data to CSV
document.getElementById("save-local").addEventListener("click", () => {
    const headers = ["Field", "Value"];
    const data = [
        ["Project Name", document.getElementById("project-name").value || "N/A"],
        ["Location", document.getElementById("location").value || "N/A"],
        ["Assessor Name", document.getElementById("assessor-name").value || "N/A"],
        ["Date of Assessment", document.getElementById("date").value || "N/A"],
        ["Project Description", document.getElementById("project-description").value || "N/A"],
        ["Project Purpose", document.getElementById("project-purpose").value || "N/A"],
        ["Flora & Fauna", document.getElementById("flora-fauna").value || "N/A"],
        ["Soil Types", document.getElementById("soil-types").value || "N/A"],
        ["Waterways", document.getElementById("waterways").value || "N/A"],
        ["Distance to Sensitive Ecosystems", document.getElementById("ecosystems-distance").value || "N/A"],
        ["Distance to Critical Infrastructure", document.getElementById("infrastructure-distance").value || "N/A"],
        ["Land Use History", document.getElementById("land-use").value || "N/A"],
        ["Current Site Activities", document.getElementById("current-activities").value || "N/A"],
        ["Site Accessibility", document.getElementById("site-accessibility").value || "N/A"],
        ["Erosion Impact", document.getElementById("erosion").value || "0"],
        ["Vegetation Damage", document.getElementById("vegetation").value || "0"],
        ["Water Quality Impact", document.getElementById("water-quality").value || "0"],
        ["Habitat Disruption", document.getElementById("habitat-disruption").value || "0"],
        ["Air Quality Impact", document.getElementById("air-quality").value || "0"],
        ["Noise Pollution", document.getElementById("noise-pollution").value || "0"],
        ["Waste Management", document.getElementById("waste-management").value || "0"],
        ["Biodiversity Index", document.getElementById("biodiversity").value || "0"],
        ["Carbon Footprint", document.getElementById("carbon-footprint").value || "0"],
    ];

    // Add mitigation measures dynamically
    const mitigationItems = document.querySelectorAll("#mitigation-measures .mitigation-item");
    mitigationItems.forEach(item => {
        const category = item.querySelector("h4").textContent;
        const description = item.querySelector("p").textContent;
        data.push([category, description]);
    });

    // Add timeline milestones dynamically
    const milestones = document.querySelectorAll("#timeline-container .timeline-item");
    milestones.forEach(item => {
        const milestoneName = item.querySelector("h4").textContent;
        const milestoneDate = item.querySelector("input[type='date']").value || "N/A";
        data.push([milestoneName, milestoneDate]);
    });

    const csvContent = [
        headers.join(","),
        ...data.map(row => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Assessment_Data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Trigger file input on button click
document.getElementById("load-progress").addEventListener("click", () => {
    document.getElementById("csv-upload").click(); // Open the file dialog
});

// Handle file selection and load the data
document.getElementById("csv-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Please select a valid CSV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const csvData = reader.result.split("\n").map(row => row.split(","));
        const headers = csvData[0]; // First row as headers
        const values = csvData[1]; // Second row as corresponding data

        // Map headers to corresponding input fields
        headers.forEach((header, index) => {
            if (header === "Project Name") document.getElementById("project-name").value = values[index] || "";
            if (header === "Location") document.getElementById("location").value = values[index] || "";
            if (header === "Assessor Name") document.getElementById("assessor-name").value = values[index] || "";
            if (header === "Date of Assessment") document.getElementById("date").value = values[index] || "";
            if (header === "Project Description") document.getElementById("project-description").value = values[index] || "";
            if (header === "Project Purpose") document.getElementById("project-purpose").value = values[index] || "";
            if (header === "Flora & Fauna") document.getElementById("flora-fauna").value = values[index] || "";
            if (header === "Soil Types") document.getElementById("soil-types").value = values[index] || "";
            if (header === "Waterways") document.getElementById("waterways").value = values[index] || "";
            if (header === "Distance to Sensitive Ecosystems") document.getElementById("ecosystems-distance").value = values[index] || "";
            if (header === "Distance to Critical Infrastructure") document.getElementById("infrastructure-distance").value = values[index] || "";
            if (header === "Land Use History") document.getElementById("land-use").value = values[index] || "";
            if (header === "Current Site Activities") document.getElementById("current-activities").value = values[index] || "";
            if (header === "Site Accessibility") document.getElementById("site-accessibility").value = values[index] || "";
            if (header === "Erosion Impact") document.getElementById("erosion").value = values[index] || "0";
            if (header === "Vegetation Damage") document.getElementById("vegetation").value = values[index] || "0";
            if (header === "Water Quality Impact") document.getElementById("water-quality").value = values[index] || "0";
            if (header === "Habitat Disruption") document.getElementById("habitat-disruption").value = values[index] || "0";
            if (header === "Air Quality Impact") document.getElementById("air-quality").value = values[index] || "0";
            if (header === "Noise Pollution") document.getElementById("noise-pollution").value = values[index] || "0";
            if (header === "Waste Management") document.getElementById("waste-management").value = values[index] || "0";
            if (header === "Biodiversity Index") document.getElementById("biodiversity").value = values[index] || "0";
            if (header === "Carbon Footprint") document.getElementById("carbon-footprint").value = values[index] || "0";
            // Add additional fields as necessary
        });

        alert("Progress successfully loaded from CSV!");
    };
    reader.readAsText(file);
});

// Custom Heatmap Visualization (NEW FEATURE)
function initializeHeatmap() {
    const heatmapCanvas = document.getElementById("heatmap-canvas").getContext("2d");

    // Define the heatmap data
    const heatmapData = {
        labels: [
            "Erosion", "Vegetation", "Water Quality", "Habitat Disruption", "Air Quality",
            "Noise Pollution", "Waste Management", "Biodiversity", "Carbon Footprint"
        ],
        datasets: [{
            label: "Impact Levels",
            data: [
                parseInt(document.getElementById("erosion").value),
                parseInt(document.getElementById("vegetation").value),
                parseInt(document.getElementById("water-quality").value),
                parseInt(document.getElementById("habitat-disruption").value),
                parseInt(document.getElementById("air-quality").value),
                parseInt(document.getElementById("noise-pollution").value),
                parseInt(document.getElementById("waste-management").value),
                parseInt(document.getElementById("biodiversity").value),
                parseInt(document.getElementById("carbon-footprint").value),
            ],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                return value > 70
                    ? "rgba(200, 79, 67, 0.8)" // High (Red)
                    : value > 40
                        ? "rgba(240, 199, 94, 0.8)" // Moderate (Orange)
                        : "rgba(107, 165, 131, 0.8)"; // Low (Green)
            },
            borderWidth: 1,
        }]
    };

    // Heatmap configuration
    const heatmapConfig = {
        type: "bar",
        data: heatmapData,
        options: {
            responsive: true,
            indexAxis: "y", // Horizontal bar chart
            scales: {
                x: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
        },
    };

    // Destroy existing heatmap if it exists
    if (window.heatmapChart) {
        window.heatmapChart.destroy();
    }

    // Create new heatmap instance
    window.heatmapChart = new Chart(heatmapCanvas, heatmapConfig);
}

// Initialize Heatmap on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initializeHeatmap();
});

// Global array to store milestones
let milestones = [
    { milestone: "Assessment Start", date: "", editable: false },
    { milestone: "Mitigation Measures Planned", date: "", editable: false },
    { milestone: "Project Completion Estimated", date: "", editable: false }
];

// Function to initialize the timeline
function initializeTimeline() {
    const timelineContainer = document.getElementById("timeline-container");
    timelineContainer.innerHTML = ""; // Clear existing timeline

    milestones.forEach((entry, index) => {
        const milestoneElement = document.createElement("div");
        milestoneElement.className = "timeline-item";

        milestoneElement.innerHTML = `
            <h4>${entry.milestone}</h4>
            <input type="date" value="${entry.date}" 
                onchange="updateMilestoneDate(${index}, this.value)">
            ${entry.editable 
                ? `<button onclick="deleteMilestone(${index})">Delete</button>` 
                : ""}
        `;
        timelineContainer.appendChild(milestoneElement);
    });
}

// Function to update a milestone's date
function updateMilestoneDate(index, newDate) {
    if (!newDate) {
        alert("Please provide a valid date.");
        return;
    }
    milestones[index].date = newDate;
    console.log(`Updated "${milestones[index].milestone}" to date: ${newDate}`);
    initializeTimeline(); // Refresh the timeline display to reflect changes
}

// Function to delete a user-created milestone
function deleteMilestone(index) {
    if (!milestones[index].editable) {
        alert("Default milestones cannot be deleted.");
        return;
    }
    milestones.splice(index, 1); // Remove milestone from the array
    initializeTimeline(); // Refresh the timeline display
}

// Event Listener for "Add Milestone" button
document.getElementById("add-milestone-button").addEventListener("click", () => {
    const milestoneName = document.getElementById("milestone-name").value.trim();
    const milestoneDate = document.getElementById("milestone-date").value;

    if (!milestoneName || !milestoneDate) {
        alert("Please provide both a milestone name and a date.");
        return;
    }

    // Add the new milestone to the array
    milestones.push({ milestone: milestoneName, date: milestoneDate, editable: true });

    // Clear the input fields
    document.getElementById("milestone-name").value = "";
    document.getElementById("milestone-date").value = "";

    // Update the timeline visualization
    initializeTimeline();
});

// Initialize timeline on page load
document.addEventListener("DOMContentLoaded", initializeTimeline);

// Mitigation Measures Section (NEW FEATURE)
function populateMitigationMeasures() {
    const mitigationContainer = document.getElementById("mitigation-measures");
    mitigationContainer.innerHTML = ""; // Clear any existing content

    const measures = [
        { category: "Erosion Control", description: "Install sediment traps, silt fences, and check dams." },
        { category: "Revegetation", description: "Replant native vegetation in degraded areas." },
        { category: "Water Quality", description: "Establish riparian buffer zones to reduce runoff." },
        { category: "Biodiversity", description: "Implement wildlife corridors and habitat restoration projects." },
        { category: "Carbon Reduction", description: "Adopt renewable energy sources and reduce emissions." }
    ];

    measures.forEach(measure => {
        const measureElement = document.createElement("div");
        measureElement.className = "mitigation-item";
        measureElement.innerHTML = `
            <h4>${measure.category}</h4>
            <p>${measure.description}</p>
        `;
        mitigationContainer.appendChild(measureElement);
    });
}

// Initialize Mitigation Measures on Page Load
document.addEventListener("DOMContentLoaded", () => {
    populateMitigationMeasures();
});

// Advanced Recommendations System (Improved Feature)
function rankRecommendationsByUrgency() {
    const rankedRecommendations = [];
    const metrics = [
        { id: "erosion", weight: 1.0, message: "Prioritize erosion control measures immediately." },
        { id: "vegetation", weight: 0.9, message: "Revegetate to stabilize soil and improve ecosystem health." },
        { id: "water-quality", weight: 0.8, message: "Focus on protecting water bodies from contamination." },
        { id: "noise-pollution", weight: 0.7, message: "Install noise barriers in high-impact areas." },
        { id: "biodiversity", weight: 0.6, message: "Preserve and enhance biodiversity on-site." }
    ];

    metrics.forEach(metric => {
        const value = parseInt(document.getElementById(metric.id).value);
        console.log(`${metric.id} value: ${value}`); // Log each metric value
        if (value > 50) {
            rankedRecommendations.push({ message: metric.message, urgency: metric.weight * value });
        }
    });

    // Sort by urgency descending
    rankedRecommendations.sort((a, b) => b.urgency - a.urgency);

    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = rankedRecommendations.length
        ? `<ol>${rankedRecommendations.map(rec => `<li>${rec.message}</li>`).join("")}</ol>`
        : "No urgent actions required. Continue monitoring.";

    console.log("Ranked Recommendations:", rankedRecommendations); // Log ranked recommendations
}

// Update recommendations dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", () => {
        rankRecommendationsByUrgency();
        updateRecommendations(); // Ensure both functions are called
    });
});

// Track User Progress (NEW FEATURE)
function trackProgress() {
    const progressContainer = document.getElementById("progress-tracker");
    const totalMetrics = 9; // Total number of sliders
    const completed = Array.from(document.querySelectorAll("input[type='range']"))
        .filter(slider => parseInt(slider.value) > 0).length;

    const progress = Math.round((completed / totalMetrics) * 100);
    progressContainer.innerText = `Progress: ${progress}% completed`;

    // Change color based on progress
    progressContainer.style.color = progress === 100 ? "green" : progress > 50 ? "orange" : "red";
}

// Monitor progress updates dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", trackProgress);
});

// Initialize Progress Tracker on Page Load
document.addEventListener("DOMContentLoaded", () => {
    trackProgress();
});

// Long-term Impact Projections (NEW FEATURE)
function calculateLongTermProjections() {
    const projectionContainer = document.getElementById("long-term-projections");
    projectionContainer.innerHTML = ""; // Clear existing content

    const riskMetrics = [
        { id: "erosion", label: "Erosion Impact" },
        { id: "vegetation", label: "Vegetation Damage" },
        { id: "water-quality", label: "Water Quality Impact" },
        { id: "habitat-disruption", label: "Habitat Disruption" },
        { id: "air-quality", label: "Air Quality Impact" },
        { id: "noise-pollution", label: "Noise Pollution" },
        { id: "waste-management", label: "Waste Management" },
        { id: "biodiversity", label: "Biodiversity Index" },
        { id: "carbon-footprint", label: "Carbon Footprint" }
    ];

    const years = [10, 20, 50]; // Time intervals for projections
    const projectionFactor = 1.1; // Assumes a 10% annual increase in risk without mitigation

    riskMetrics.forEach(metric => {
        const baseValue = parseInt(document.getElementById(metric.id).value);

        const projections = years.map(year => {
            const projectedValue = Math.min(100, Math.round(baseValue * Math.pow(projectionFactor, year / 10)));
            return `${year} years: ${projectedValue}`;
        }).join('\n');

        const metricElement = document.createElement("div");
        metricElement.className = "projection-item";
        metricElement.innerHTML = `
            <h4>${metric.label}</h4>
            <pre>${projections}</pre>
        `;

        projectionContainer.appendChild(metricElement);
    });
}

// Initialize Long-term Impact Projections on Page Load
document.addEventListener("DOMContentLoaded", () => {
    calculateLongTermProjections();
});

// Update projections dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", calculateLongTermProjections);
});

function generatePolicyComplianceChecklist() {
    const policies = [
        { name: "Water Protection Act Compliance", status: "Met", reference: "https://waterprotection.example.com" },
        { name: "Biodiversity Preservation Standards", status: "Unmet", reference: "https://biodiversity.example.com" },
        { name: "Air Quality Regulations", status: "Met", reference: "https://airquality.example.com" },
        { name: "Waste Management Guidelines", status: "Unmet", reference: "https://wastemanagement.example.com" },
        { name: "Carbon Emission Reduction Targets", status: "Met", reference: "https://carbonreduction.example.com" },
    ];

    const checklistContainer = document.getElementById("policy-compliance-checklist");
    console.log(checklistContainer); // Check if this is null
    checklistContainer.innerHTML = "";

    let metCount = 0;

    policies.forEach(policy => {
        const element = document.createElement("div");
        element.className = "policy-item";
        element.innerHTML = `
            <p><strong>${policy.name}:</strong> 
                <span style="color: ${policy.status === "Met" ? "green" : "red"};">
                    ${policy.status}
                </span>
                ${policy.status === "Unmet" ? `<a href="${policy.reference}" target="_blank">Learn More</a>` : ""}
            </p>
        `;
        checklistContainer.appendChild(element);
        if (policy.status === "Met") metCount++;
    });

    const complianceScore = Math.round((metCount / policies.length) * 100);
    document.getElementById("compliance-score").innerHTML = `Compliance Score: ${complianceScore}%`;
}
document.addEventListener("DOMContentLoaded", generatePolicyComplianceChecklist);
// Initialize Policy Compliance Checklist on Page Load
document.addEventListener("DOMContentLoaded", () => {
    generatePolicyComplianceChecklist();
});

// Real-time Dynamic Chart Updates
function updateAllCharts() {
    initializeRadarChart();
    initializeHeatmap();
}

// Trigger chart updates dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", updateAllCharts);
});

// Budget Allocation and Cost Tracking (UPDATED FEATURE)
function calculateBudgetAllocations() {
    const budgetContainer = document.getElementById("budget-allocations");
    budgetContainer.innerHTML = ""; // Clear any existing content

    const projectArea = parseFloat(document.getElementById("project-area").value) || 1; // Default to 1 if not provided

    const allocations = [
        { category: "Erosion Control", inputId: "erosion", costPerUnit: 100 },
        { category: "Revegetation", inputId: "vegetation", costPerUnit: 200 },
        { category: "Water Quality", inputId: "water-quality", costPerUnit: 150 },
        { category: "Noise Pollution", inputId: "noise-pollution", costPerUnit: 80 },
        { category: "Waste Management", inputId: "waste-management", costPerUnit: 120 }
    ];

    let totalCost = 0;

    allocations.forEach(allocation => {
        const value = parseInt(document.getElementById(allocation.inputId).value);
        const cost = value * allocation.costPerUnit * projectArea; // Adjust cost based on project area
        totalCost += cost;

        const allocationElement = document.createElement("div");
        allocationElement.className = "budget-item";
        allocationElement.innerHTML = `
            <p><strong>${allocation.category}:</strong> $${cost.toLocaleString()}</p>
        `;

        budgetContainer.appendChild(allocationElement);
    });

    const totalElement = document.createElement("div");
    totalElement.className = "budget-total";
    totalElement.innerHTML = `
        <h4>Total Estimated Cost:</h4>
        <p><strong>$${totalCost.toLocaleString()}</strong></p>
    `;

    budgetContainer.appendChild(totalElement);
}

// Initialize Budget Allocations on Page Load
document.addEventListener("DOMContentLoaded", () => {
    calculateBudgetAllocations();
});

// Update budget allocations dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", calculateBudgetAllocations);
});
document.getElementById("project-area").addEventListener("input", calculateBudgetAllocations);

// Dynamic Stakeholder Involvement Tracker (NEW FEATURE)
function trackStakeholderInvolvement() {
    const stakeholders = [
        { role: "Project Manager", status: "Confirmed", email: "pm@example.com", phone: "123-456-7890", comments: "Key decision maker" },
        { role: "Environmental Consultant", status: "Pending", email: "env.consultant@xyz.com", phone: "987-654-3210", comments: "Awaiting feedback" },
        { role: "Community Representative", status: "Confirmed", email: "rep@community.org", phone: "555-123-4567", comments: "Local liaison" },
        { role: "Regulatory Advisor", status: "Pending", email: "advisor@regulations.gov", phone: "456-789-0123", comments: "Approval required" },
    ];

    const trackerContainer = document.getElementById("stakeholder-tracker");
    trackerContainer.innerHTML = "";
    
    let confirmedCount = 0;

    stakeholders.forEach(stakeholder => {
        if (stakeholder.status === "Confirmed") confirmedCount++;

        const element = document.createElement("div");
        element.className = "stakeholder-item";
        element.innerHTML = `
            <h4>${stakeholder.role}</h4>
            <p>Status: 
                <select aria-label="Update Status">
                    <option ${stakeholder.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                    <option ${stakeholder.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option>In Progress</option>
                </select>
            </p>
            <p>Email: ${stakeholder.email}</p>
            <p>Phone: ${stakeholder.phone}</p>
            <p>Comments: ${stakeholder.comments}</p>
        `;
        trackerContainer.appendChild(element);
    });

    const progress = Math.round((confirmedCount / stakeholders.length) * 100);
    document.getElementById("stakeholder-progress").innerText = `Progress: ${progress}% confirmed`;
}
document.addEventListener("DOMContentLoaded", trackStakeholderInvolvement);

// Initialize Stakeholder Tracker on Page Load
document.addEventListener("DOMContentLoaded", () => {
    trackStakeholderInvolvement();
});

let stakeholders = []; // Array to store stakeholder data

// Function to add a stakeholder
function addStakeholder() {
    const role = document.getElementById("stakeholder-role").value.trim();
    const status = document.getElementById("stakeholder-status").value;
    const email = document.getElementById("stakeholder-email").value.trim();
    const phone = document.getElementById("stakeholder-phone").value.trim();
    const comments = document.getElementById("stakeholder-comments").value.trim();

    if (!role) {
        alert("Please provide a stakeholder role.");
        return;
    }

    const newStakeholder = { role, status, email, phone, comments };
    stakeholders.push(newStakeholder); // Add stakeholder to the array

    updateStakeholderTracker();
    resetStakeholderForm();
}

// Function to reset the form
function resetStakeholderForm() {
    document.getElementById("stakeholder-role").value = "";
    document.getElementById("stakeholder-status").value = "Pending";
    document.getElementById("stakeholder-email").value = "";
    document.getElementById("stakeholder-phone").value = "";
    document.getElementById("stakeholder-comments").value = "";
}

// Function to update the Stakeholder Tracker
function updateStakeholderTracker() {
    const trackerContainer = document.getElementById("stakeholder-tracker");
    trackerContainer.innerHTML = ""; // Clear current tracker content

    let confirmedCount = 0;

    stakeholders.forEach(stakeholder => {
        if (stakeholder.status === "Confirmed") confirmedCount++;

        const element = document.createElement("div");
        element.className = "stakeholder-item";
        element.innerHTML = `
            <h4>${stakeholder.role}</h4>
            <p>Status: ${stakeholder.status}</p>
            <p>Email: ${stakeholder.email || "N/A"}</p>
            <p>Phone: ${stakeholder.phone || "N/A"}</p>
            <p>Comments: ${stakeholder.comments || "None"}</p>
        `;
        trackerContainer.appendChild(element);
    });

    const progress = stakeholders.length > 0 ? Math.round((confirmedCount / stakeholders.length) * 100) : 0;
    document.getElementById("stakeholder-progress").innerText = `Progress: ${progress}% confirmed`;
}

// Event listener for adding stakeholders
document.getElementById("add-stakeholder").addEventListener("click", addStakeholder);

// Initialize empty tracker on page load
document.addEventListener("DOMContentLoaded", updateStakeholderTracker);

function generateStakeholderReport(doc) {
    stakeholders.forEach(stakeholder => {
        doc.text(`Role: ${stakeholder.role}`, 10, doc.internal.pageSize.height - 10);
        doc.text(`Status: ${stakeholder.status}`, 10, doc.internal.pageSize.height - 10);
        doc.text(`Email: ${stakeholder.email || "N/A"}`, 10, doc.internal.pageSize.height - 10);
        doc.text(`Phone: ${stakeholder.phone || "N/A"}`, 10, doc.internal.pageSize.height - 10);
        doc.text(`Comments: ${stakeholder.comments || "None"}`, 10, doc.internal.pageSize.height - 10);
    });
}

// Real-time Risk Comparison Feature (NEW FEATURE)
function compareCurrentVsPreviousAssessment() {
    const comparisonContainer = document.getElementById("risk-comparison");
    comparisonContainer.innerHTML = ""; // Clear existing content

    const metrics = [
        { id: "erosion", label: "Erosion Impact", previousValue: 30 },
        { id: "vegetation", label: "Vegetation Damage", previousValue: 40 },
        { id: "water-quality", label: "Water Quality Impact", previousValue: 50 },
        { id: "habitat-disruption", label: "Habitat Disruption", previousValue: 20 },
        { id: "air-quality", label: "Air Quality Impact", previousValue: 35 }
    ];

    metrics.forEach(metric => {
        const currentValue = parseInt(document.getElementById(metric.id).value);
        const difference = currentValue - metric.previousValue;
        const trend = difference > 0 ? "Increase" : difference < 0 ? "Decrease" : "No Change";

        const comparisonElement = document.createElement("div");
        comparisonElement.className = "comparison-item";
        comparisonElement.innerHTML = `
            <p>
                <strong>${metric.label}:</strong> 
                Previous: ${metric.previousValue}, Current: ${currentValue} 
                (<span style="color: ${trend === "Increase" ? "red" : trend === "Decrease" ? "green" : "gray"};">
                    ${trend} by ${Math.abs(difference)}
                </span>)
            </p>
        `;

        comparisonContainer.appendChild(comparisonElement);
    });
}

// Initialize Risk Comparison on Page Load
document.addEventListener("DOMContentLoaded", () => {
    compareCurrentVsPreviousAssessment();
});

// Interactive Guidance System (NEW FEATURE)
function interactiveGuidance() {
    const guidanceContainer = document.getElementById("interactive-guidance");
    guidanceContainer.innerHTML = ""; // Clear existing guidance

    const tips = [
        { topic: "Starting Your Assessment", advice: "Ensure all project details are filled out accurately." },
        { topic: "Risk Evaluation", advice: "Use sliders to adjust environmental risk levels based on real-world observations." },
        { topic: "Recommendations", advice: "Review recommendations regularly and implement mitigation measures as soon as possible." },
        { topic: "Visualization Tools", advice: "Leverage charts and heatmaps to communicate findings effectively." },
        { topic: "Compliance", advice: "Check policy compliance status and address unmet areas promptly." },
    ];

    tips.forEach(tip => {
        const tipElement = document.createElement("div");
        tipElement.className = "guidance-tip";
        tipElement.innerHTML = `
            <h4>${tip.topic}</h4>
            <p>${tip.advice}</p>
        `;
        guidanceContainer.appendChild(tipElement);
    });
}

// Initialize Interactive Guidance on Page Load
document.addEventListener("DOMContentLoaded", () => {
    interactiveGuidance();
});

// Enhanced User Feedback System (NEW FEATURE)
function gatherUserFeedback() {
    const feedbackContainer = document.getElementById("user-feedback");
    feedbackContainer.innerHTML = ""; // Clear existing feedback section

    const feedbackForm = `
        <h4>We value your feedback!</h4>
        <form id="feedback-form">
            <label for="feedback">Please share your thoughts:</label>
            <textarea id="feedback" rows="3" placeholder="Type your feedback here..." aria-label="Feedback Input"></textarea>
            <button type="submit" class="button" aria-label="Submit Feedback">Submit Feedback</button>
        </form>
    `;
    feedbackContainer.innerHTML = feedbackForm;

    // Handle feedback submission
    document.getElementById("feedback-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const feedback = document.getElementById("feedback").value.trim();
        if (!feedback) {
            alert("Please provide some feedback before submitting.");
            return;
        }
        alert(`Thank you for your feedback! Here's what you submitted:\n\n${feedback}`);
    });
}

// Initialize User Feedback System on Page Load
document.addEventListener("DOMContentLoaded", () => {
    gatherUserFeedback();
});

// Real-time Notifications System (NEW FEATURE)
function notifyUser(action) {
    const notificationContainer = document.getElementById("notifications");
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = `Action performed: ${action}`;
    notificationContainer.appendChild(notification);

}

// Attach Notifications to Key Actions
document.getElementById("save-local").addEventListener("click", () => {
    saveAssessment(); // Save data into localStorage
    notifyUser("Data saved locally.");
});

document.getElementById("load-progress").addEventListener("click", () => {
    loadAssessment();
    notifyUser("Progress loaded from local storage.");
});

document.getElementById("generate-report").addEventListener("click", () => {
    notifyUser("PDF report generated.");
});

// Accessibility Improvements (NEW FEATURE)
function improveAccessibility() {
    const elements = document.querySelectorAll("form input, form textarea, button");
    elements.forEach(element => {
        element.setAttribute("aria-label", element.placeholder || element.innerText);
    });
}

// Initialize Accessibility Enhancements on Page Load
document.addEventListener("DOMContentLoaded", () => {
    improveAccessibility();
});

// Save Assessment Data Locally
function saveAssessment() {
    const projectName = document.getElementById("project-name").value.trim();
    if (!projectName) {
        alert("Please provide a project name before saving.");
        return;
    }

    const assessmentData = {
        projectName,
        location: document.getElementById("location").value.trim(),
        assessorName: document.getElementById("assessor-name").value.trim(),
        date: document.getElementById("date").value,
        projectDescription: document.getElementById("project-description").value.trim(),
        projectPurpose: document.getElementById("project-purpose").value.trim(),
        floraFauna: document.getElementById("flora-fauna").value.trim(),
        soilTypes: document.getElementById("soil-types").value,
        waterways: document.getElementById("waterways").value,
        ecosystemsDistance: document.getElementById("ecosystems-distance").value,
        infrastructureDistance: document.getElementById("infrastructure-distance").value,
        landUse: document.getElementById("land-use").value.trim(),
        currentActivities: document.getElementById("current-activities").value.trim(),
        siteAccessibility: document.getElementById("site-accessibility").value.trim(),
        sliders: Array.from(document.querySelectorAll("input[type='range']")).map(slider => slider.value),
    };

    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    alert("Progress saved locally.");
}

// Load Assessment Data from Local Storage
function loadAssessment() {
    const savedData = JSON.parse(localStorage.getItem("assessmentData"));
    if (!savedData || Object.keys(savedData).length === 0) {
        alert("No saved progress found.");
        return;
    }

    document.getElementById("project-name").value = savedData.projectName || "";
    document.getElementById("location").value = savedData.location || "";
    document.getElementById("assessor-name").value = savedData.assessorName || "";
    document.getElementById("date").value = savedData.date || "";
    document.getElementById("project-description").value = savedData.projectDescription || "";
    document.getElementById("project-purpose").value = savedData.projectPurpose || "";
    document.getElementById("flora-fauna").value = savedData.floraFauna || "";
    document.getElementById("soil-types").value = savedData.soilTypes || "";
    document.getElementById("waterways").value = savedData.waterways || "";
    document.getElementById("ecosystems-distance").value = savedData.ecosystemsDistance || "";
    document.getElementById("infrastructure-distance").value = savedData.infrastructureDistance || "";
    document.getElementById("land-use").value = savedData.landUse || "";
    document.getElementById("current-activities").value = savedData.currentActivities || "";
    document.getElementById("site-accessibility").value = savedData.siteAccessibility || "";

    document.querySelectorAll("input[type='range']").forEach((slider, index) => {
        slider.value = savedData.sliders[index] || 0;
    });

    alert("Progress loaded successfully.");
}

document.addEventListener("DOMContentLoaded", () => {
    // Attach Delete Data Functionality
    const deleteButton = document.getElementById("delete-data");
    deleteButton.removeEventListener("click", deleteAssessmentData); // Remove any existing listeners
    deleteButton.addEventListener("click", deleteAssessmentData); // Add the listener
});

function deleteAssessmentData() {
    // Show a warning alert with confirmation
    if (confirm("WARNING: This will permanently clear all form inputs, sliders, charts, and progress. Are you sure you want to proceed?")) {
        // Clear all form inputs
        document.querySelectorAll("form input, form textarea").forEach(input => {
            if (input.type === "text" || input.type === "email" || input.type === "tel" || input.type === "date") {
                input.value = ""; // Clear text-based inputs
            } else if (input.type === "range") {
                input.value = 0; // Reset sliders to default
            }
        });

        // Clear stakeholder array and refresh tracker
        stakeholders = [];
        updateStakeholderTracker();

        // Clear charts and reinitialize
        initializeRadarChart();
        initializeHeatmap();

        // Reset recommendations and progress tracker
        document.getElementById("recommendations").innerHTML = "No significant risks detected. Monitoring recommended.";
        document.getElementById("progress-tracker").innerText = "Progress: 0% completed";

        // Clear long-term projections and compliance checklist
        document.getElementById("long-term-projections").innerHTML = "";
        document.getElementById("policy-compliance-checklist").innerHTML = "";
        document.getElementById("budget-allocations").innerHTML = "";
        document.getElementById("stakeholder-tracker").innerHTML = "";
        document.getElementById("notifications").innerHTML = "";

        // Refresh the page       
        location.reload(); 
        
        // Notify user
        notifyUser("All data deleted.");

        alert("All data has been cleared.");
    }
}

// Base64 Conversion Function
function convertToBase64(url, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable cross-origin requests
    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png"); // Convert to Base64
        callback(dataURL);
    };
    img.src = url;
}

// Generate PDF
document.getElementById("generate-report").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    // Prompt the user for a file name
    const pdfName = prompt("Enter the file name for your PDF:", "EIA_Report") || "";

    // Exit if the user cancels or leaves the input empty
    if (!pdfName.trim()) {
        alert("PDF generation canceled.");
        return;
    }

    try {
        const doc = new jsPDF();
        const headerColor = "#2a6f4b";
        const accentColor = "#15643f";
        const textColor = "#333";
        const sectionTitleFontSize = 16;
        const subHeadingFontSize = 14;
        const textFontSize = 12;
        const footerFontSize = 10;
        const margin = 15;
        const footerText = "Confidential - Produced with EIA Tool by Jay Rowley";
        let yOffset = margin;

// Helper functions for styling
const drawSeparator = () => {
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yOffset, doc.internal.pageSize.width - margin, yOffset);
    yOffset += 10; // Increased the gap below the line
};

const addPage = () => {
    doc.addPage();
    yOffset = margin; // Reset vertical offset for the new page
};

const addFooter = (currentPage, totalPages) => {
    doc.setFontSize(footerFontSize);
    doc.setTextColor(textColor);
    doc.text(
        `${footerText} | Page ${currentPage} of ${totalPages}`,
        margin,
        doc.internal.pageSize.height - 10
    );
};


        const addHeader = () => {
            doc.setFontSize(18);
            doc.setTextColor(headerColor);
            doc.text("Environmental Consultancy Company", margin, 20);
            doc.setFontSize(12);
            doc.setTextColor(textColor);
            doc.text("Environmental Impact Assessment Report", margin, 30);
            yOffset = 40;
        };

        const addSectionTitle = (title) => {
            if (yOffset > 270) addPage();
            doc.setFontSize(sectionTitleFontSize);
            doc.setTextColor(headerColor);
            doc.text(title, margin, yOffset);
            yOffset += 10;
            drawSeparator();
        };

        const addSubHeadingAndText = (subHeading, text) => {
            doc.setFontSize(subHeadingFontSize);
            doc.setTextColor(accentColor);
            if (yOffset > 270) addPage();
            doc.text(`${subHeading}:`, margin, yOffset);
            yOffset += 6;

            doc.setFontSize(textFontSize);
            doc.setTextColor(textColor);
            const splitText = doc.splitTextToSize(text, 180);
            splitText.forEach(line => {
                if (yOffset > 270) addPage();
                doc.text(line, margin, yOffset);
                yOffset += 6;
            });
            yOffset += 5;
        };

        // Add cover page with styled title
        doc.setFontSize(26);
        doc.setTextColor(headerColor);
        doc.text("Environmental Impact Assessment Report", margin, 60);
        doc.setFontSize(14);
        doc.setTextColor(accentColor);
        doc.text("Prepared by: Environmental Consultancy Company", margin, 75);
        doc.setFontSize(12);
        doc.setTextColor(textColor);
        doc.text("Confidential Document", margin, 85);
        doc.addPage();

        // Add header to the first page
        addHeader();

        // Table of Contents
        addSectionTitle("Table of Contents");
        const contents = [
            "Project Details",
            "Site Information",
            "Risk Assessment",
            "Recommendations",
            "Budget Allocations",
            "Long-term Impact Projections",
            "Charts",
            "Activities",
            "Interactive Guidance",
            "User Feedback",
            "Notifications"
        ];
        contents.forEach((item, index) => {
            doc.text(`${index + 1}. ${item}`, margin, yOffset);
            yOffset += 8; // Increase spacing for a cleaner look
        });
        yOffset += 10; // Add extra spacing after the table of contents
        drawSeparator();
        addPage();

        // Project Details
        addSectionTitle("Project Details");
        addSubHeadingAndText("Project Name", document.getElementById("project-name").value || "N/A");
        addSubHeadingAndText("Location", document.getElementById("location").value || "N/A");
        addSubHeadingAndText("Assessor Name", document.getElementById("assessor-name").value || "N/A");
        addSubHeadingAndText("Date of Assessment", document.getElementById("date").value || "N/A");
        addSubHeadingAndText("Project Description", document.getElementById("project-description").value || "N/A");
        addSubHeadingAndText("Project Purpose", document.getElementById("project-purpose").value || "N/A");
        addPage();

        // Site Information
        addSectionTitle("Site Information");
        addSubHeadingAndText("Flora & Fauna", document.getElementById("flora-fauna").value || "N/A");
        addSubHeadingAndText("Soil Types", document.getElementById("soil-types").value || "N/A");
        addSubHeadingAndText("Waterways", document.getElementById("waterways").value || "N/A");
        addSubHeadingAndText("Distance to Sensitive Ecosystems", document.getElementById("ecosystems-distance").value || "N/A");
        addSubHeadingAndText("Distance to Critical Infrastructure", document.getElementById("infrastructure-distance").value || "N/A");
        addSubHeadingAndText("Land Use History", document.getElementById("land-use").value || "N/A");
        addSubHeadingAndText("Current Site Activities", document.getElementById("current-activities").value || "N/A");
        addSubHeadingAndText("Site Accessibility", document.getElementById("site-accessibility").value || "N/A");
        addPage();

        // Risk Assessment
        addSectionTitle("Risk Assessment");
        const riskMetrics = [
            { id: "erosion", label: "Erosion Impact" },
            { id: "vegetation", label: "Vegetation Damage" },
            { id: "water-quality", label: "Water Quality Impact" },
            { id: "habitat-disruption", label: "Habitat Disruption" },
            { id: "air-quality", label: "Air Quality Impact" },
            { id: "noise-pollution", label: "Noise Pollution" },
            { id: "waste-management", label: "Waste Management" },
            { id: "biodiversity", label: "Biodiversity Index" },
            { id: "carbon-footprint", label: "Carbon Footprint" }
        ];
        riskMetrics.forEach(metric => {
            addSubHeadingAndText(metric.label, document.getElementById(metric.id).value || "0");
        });
        addPage();

        // Recommendations
        addSectionTitle("Recommendations");
        const recommendationsElement = document.getElementById("recommendations");
        if (recommendationsElement) {
            const recommendationsHTML = recommendationsElement.innerHTML;
            const recommendationsText = recommendationsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            const recommendationsList = recommendationsText.split('.').filter(rec => rec.trim() !== '');

            recommendationsList.forEach(rec => {
                if (rec.trim()) {
                    doc.setFontSize(textFontSize);
                    doc.setTextColor(textColor);
                    if (yOffset > 270) addPage();
                    doc.text(`• ${rec.trim()}`, margin, yOffset);
                    yOffset += 8; // Add more spacing for a polished appearance
                }
            });
        } else {
            doc.text("No recommendations available.", margin, yOffset);
        }
        addPage();

        // Budget Allocations
        addSectionTitle("Budget Allocations");
        const budgetAllocationsElement = document.getElementById("budget-allocations");
        if (budgetAllocationsElement) {
            const budgetAllocationsHTML = budgetAllocationsElement.innerHTML;
            const budgetAllocationsText = budgetAllocationsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Budget Allocations", budgetAllocationsText);
        } else {
            addSubHeadingAndText("Budget Allocations", "No budget allocation data available.");
        }
        addPage();

        // Long-term Impact Projections
        addSectionTitle("Long-term Impact Projections");
        const projectionsElement = document.getElementById("long-term-projections");
        if (projectionsElement) {
            const riskMetrics = [
                { id: "erosion", label: "Erosion Impact" },
                { id: "vegetation", label: "Vegetation Damage" },
                { id: "water-quality", label: "Water Quality Impact" },
                { id: "habitat-disruption", label: "Habitat Disruption" },
                { id: "air-quality", label: "Air Quality Impact" },
                { id: "noise-pollution", label: "Noise Pollution" },
                { id: "waste-management", label: "Waste Management" },
                { id: "biodiversity", label: "Biodiversity Index" },
                { id: "carbon-footprint", label: "Carbon Footprint" }
            ];

            riskMetrics.forEach(metric => {
                const baseValue = parseInt(document.getElementById(metric.id).value);
                const years = [10, 20, 50];
                const projectionFactor = 1.1;

                const projections = years.map(year => {
                    const projectedValue = Math.min(100, Math.round(baseValue * Math.pow(projectionFactor, year / 10)));
                    return `${year} years: ${projectedValue}`;
                }).join('\n');

                addSubHeadingAndText(metric.label, projections);
            });
        } else {
            addSubHeadingAndText("Long-term Impact Projections", "No projection data available.");
        }
        addPage();

        // Charts
        addSectionTitle("Charts");
        const chartCanvas = document.getElementById("impact-chart");
        if (chartCanvas) {
            const chartImage = chartCanvas.toDataURL("image/png");
            const chartWidth = 180;
            const chartHeight = (chartCanvas.height / chartCanvas.width) * chartWidth;
            if (yOffset + chartHeight > 270) addPage();
            doc.addImage(chartImage, "PNG", margin, yOffset, chartWidth, chartHeight);
            yOffset += chartHeight + 10;
        } else {
            doc.text("Impact Chart not available.", margin, yOffset);
        }

        const heatmapCanvas = document.getElementById("heatmap-canvas");
        if (heatmapCanvas) {
            const heatmapImage = heatmapCanvas.toDataURL("image/png");
            const heatmapWidth = 180;
            const heatmapHeight = (heatmapCanvas.height / heatmapCanvas.width) * heatmapWidth;
            if (yOffset + heatmapHeight > 270) addPage();
            doc.addImage(heatmapImage, "PNG", margin, yOffset, heatmapWidth, heatmapHeight);
            yOffset += heatmapHeight + 10;
        } else {
            doc.text("Heatmap not available.", margin, yOffset);
        }
        addPage();

        // Activities Section
        addSectionTitle("Activities");
        const activitiesList = document.querySelectorAll("#activitiesList input:checked");
        if (activitiesList.length > 0) {
            activitiesList.forEach((activity, index) => {
                doc.text(`${index + 1}. ${activity.value}`, margin, yOffset);
                yOffset += 8; // Adjusted spacing for a polished look
                if (yOffset > 270) addPage();
            });
        } else {
            doc.text("No activities selected.", margin, yOffset);
        }
        addPage();

        // Interactive Guidance
        addSectionTitle("Interactive Guidance");
        const guidanceElement = document.getElementById("interactive-guidance");
        if (guidanceElement) {
            const guidanceHTML = guidanceElement.innerHTML;
            const guidanceText = guidanceHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Interactive Guidance", guidanceText);
        } else {
            addSubHeadingAndText("Interactive Guidance", "No interactive guidance data available.");
        }
        addPage();

        // User Feedback
        addSectionTitle("User Feedback");
        const feedbackElement = document.getElementById("user-feedback");
        if (feedbackElement) {
            const feedbackHTML = feedbackElement.innerHTML;
            const feedbackText = feedbackHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("User Feedback", feedbackText);
        } else {
            addSubHeadingAndText("User Feedback", "No user feedback available.");
        }
        addPage();

        // Notifications
        addSectionTitle("Notifications");
        const notificationsElement = document.getElementById("notifications");
        if (notificationsElement) {
            const notificationsHTML = notificationsElement.innerHTML;
            const notificationsText = notificationsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Notifications", notificationsText);
        } else {
            addSubHeadingAndText("Notifications", "No notifications available.");
        }
        addPage();

        // Add footers to all pages
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addFooter(i, totalPages);
        }

        // Save the PDF
        doc.save(`${pdfName}.pdf`);
    } catch (error) {
        alert("An error occurred during PDF generation: " + error.message);
        console.error(error);
    }
});
