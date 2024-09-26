import * as cheerio from "cheerio";

function getLastDateFromString(inputString) {
    const monthAbbreviations = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    // Split the input string by spaces to get individual date parts
    const dateParts = inputString.trim().split(' ');

    // Parse the month and day from the last date part
    const [month, day] = dateParts.slice(-2);

    if (!Object.keys(monthAbbreviations).includes(month)) {
        return undefined;
    }

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Create a new Date object with the current year, parsed month, and day
    const lastDate = new Date(currentYear, monthAbbreviations[month], day);

    if (!lastDate.getTime()) {
        return undefined;
    }

    console.log('linalg last date: ', lastDate);

    // LinAlg gives you 6 days time for some reason?
    return lastDate.setDate(lastDate.getDate() + 6);
}

export default async function parse() {
    const baseUrl = "https://ti.inf.ethz.ch/ew/courses/LA24/index.html";
    const res = await fetch(baseUrl);

    if (!res.ok) {
        console.log('Response not OK');
        return;
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const rows = [];

    // Iterate through each table row in the tbody
    $('table tbody tr').each((index, element) => {
        const columns = $(element).find('td'); // Ensure columns are extracted

        if (columns.length < 2) {
            return;
        }

        const exercisePDF = $(columns[5]).find('a').eq(0).attr('href'); // First <a> tag's href (assignment PDF)
        const solutionPDF = $(columns[5]).find('a').eq(1).attr('href'); // Second <a> tag's href (solution PDF)
        
        // Extract the file names from URLs
        const exerciseName = exercisePDF?.split('/').pop().replace('.pdf', '') || ''; // Extracts 'assignment_0'
        const solutionName = solutionPDF?.split('/').pop().replace('.pdf', '') || ''; // Extracts 'solution_0'
        
        const bonusLink = $(columns[6]).find('a').attr('href'); // Bonus link remains the same
        const dueDate = getLastDateFromString($(columns[1]).text()); // Extract the due date from the second column
        
        console.log(exerciseName); // Outputs 'assignment_0'
        console.log(solutionName); // Outputs 'solution_0'

        // Create an object for the row and push it to the array
        rows.push({
            exerciseName,
            exercisePDF,
            solutionPDF,    
            bonusLink,
            dueDate,
        });
    });

    const exercises = rows.filter(e => e.exerciseName && e.exercisePDF);

    return { 
        exercises,
        website: baseUrl,
        video: "https://video.ethz.ch/lectures/d-math/2024/autumn/401-0131-00L.html",
    };
}
