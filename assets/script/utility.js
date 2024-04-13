function getCurrentDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const monthsIndex = currentDate.getMonth();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    
    const formattedDate = months[monthsIndex] + " " + day + ", " + year;
    return formattedDate;
}

export { getCurrentDate };
export { isEmpty };

function isEmpty(value){
     if(value === undefined || value === null || value === '') {
        return true;
     } else {
        return false;
     }
}