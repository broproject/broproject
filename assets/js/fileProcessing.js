let dropArea = document.querySelector(".dropArea");

function showFile(input) {
	let file = input.files[0];

	let reader = new FileReader();

	reader.readAsText(file);

	reader.onload = function() {
		sortData(reader.result);
	};
	reader.onerror = function() {
		console.log(reader.error);
	};
}

function sortData(data) {
	let chars = "0123456789/";

	let dates = data.split("").map( (char) => (chars.includes(char)) ? char : " ").join("").split("  ");

	dates.sort(function(a, b) {
		let aYear = a.split("/")[2];
		let bYear = b.split("/")[2];
		let aMonth = a.split("/")[1];
		let bMonth = b.split("/")[1];

		if( aYear > bYear || (aYear === bYear && aMonth > bMonth) ) {
			return 1;
		}
		else return -1;
	});

	displayStats(dates);
}

function displayStats(dates) {
	dropArea.innerHTML = "<h2>Статистика:</h2>";
	dropArea.classList.remove("empty");

	let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

	while(dates.length) {
		let date = dates[0];
		let amount = 0;

		for(let i = 0; i < dates.length; i++) {
			if(date.slice(-5) == dates[i].slice(-5)) {
				amount++;
				dates.splice(i, 1);
				i--;
			}
		}

		let year = "20" + date.split("/")[2];
		let month = date.split("/")[1];

		let p = document.createElement("p");
		p.innerHTML = months[month - 1] + " " + year + ": " + `<b>${amount}</b>`;

		dropArea.append(p);
	}
}