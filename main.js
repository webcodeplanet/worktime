const timeContainer = document.getElementById('timeContainer');
const totalDifference = document.getElementById('totalDifference');

document.getElementById('addTime').addEventListener('click', () => {
    const timeGroup = document.createElement('div');
    timeGroup.classList.add('time-group');
    timeGroup.innerHTML = `
        <input type="time" class="input1" />
        <input type="time" class="input2" />
        <span class="result">00:00</span>
        <img src="close.png" class="delete" >
    `;
    timeContainer.appendChild(timeGroup);


    const inputs = timeGroup.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => calculateDifference(timeGroup));
    });


    const deleteButton = timeGroup.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        timeContainer.removeChild(timeGroup);
        updateTotalDifference(); 
    });
});


function calculateDifference(group) {
    const input1 = group.querySelector('.input1').value;
    const input2 = group.querySelector('.input2').value;
    const result = group.querySelector('.result');

    if (input1 && input2) {
        const time1 = parseTime(input1);
        const time2 = parseTime(input2);
        const diff = Math.abs(time2 - time1); 
        result.textContent = formatTime(diff);
    } else {
        result.textContent = '00:00';
    }
    updateTotalDifference(); 
}


function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
}


function formatTime(ms) {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


function updateTotalDifference() {
    let totalMs = 0;
    timeContainer.querySelectorAll('.time-group').forEach(group => {
        const resultText = group.querySelector('.result').textContent;
        const [hours, minutes] = resultText.split(':').map(Number);
        totalMs += (hours * 60 + minutes) * 60 * 1000;
    });
    totalDifference.textContent = formatTime(totalMs);
}


document.getElementById('calculateAll').addEventListener('click', updateTotalDifference);
