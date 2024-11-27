function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;   
}

function parseTime(time) {
    const [hours, minutes] = time.split(/[hm]/).map(Number); 
    return hours * 60 + minutes;
}

let duration = 310
let durationNew = "3h 30m"

console.log(formatTime(duration));
console.log(parseTime(durationNew));

