const inputs = document.querySelectorAll('.app__input');
let calc__btn = document.querySelector('.app__calc');

calc__btn.addEventListener('click', calcAge);

function calcAge() {
	clearErrors();

	let day = inputs[0].value.trim();
	let month = inputs[1].value.trim();
	let year = inputs[2].value.trim();
	let today = new Date();
	let crryear = today.getFullYear();

	if (!day || !month || !year) {
		// Check for empty inputs
		if (!day) showError('day_error', 'Day is required');
		if (!month) showError('month_error', 'Month is required');
		if (!year) showError('year_error', 'Year is required');
		return;
	}

	day = parseInt(day);
	month = parseInt(month);
	year = parseInt(year);

	if (isNaN(day) || isNaN(month) || isNaN(year)) {
		// Check for valid data
		if (isNaN(day)) showError('day_error', 'Must be a valid day');
		if (isNaN(month)) showError('month_error', 'Must be a valid month');
		if (isNaN(year)) showError('year_error', 'Must be a valid year');
		return;
	}

	const dayInMonth = new Date(year, month, 0).getDate();
	if (day <= 0 || day > dayInMonth) {
		showError('day_error', `Must be a valid day`);
		return;
	}

	if (month <= 0 || month > 12) {
		showError('month_error', 'Must be a valid month (1-12)');
		return;
	}

	if (year > crryear) {
		showError('year_error', 'Year must be in the past');
		return;
	}

	if (year <= 0 || year < 1900) {
		showError('year_error', 'must be greater than 1900');
		return;
	}

	// if all okay
	let start = new Date(
		`${year}-${String(month).padStart('0', 2)}-${String(day).padStart(
			'0',
			2
		)}`
	);
	let days = getDaysNumbers(start, today);

	// calc age
	let years = days / 365.25;
	years = Math.floor(years);
	let months = (days % 365.25) / 30;
	months = Math.floor(months);
	let dayss = (days % 365.25) % 30;
	dayss = Math.floor(dayss);
	const placeHolders = document.querySelectorAll('.placeholder');
	placeHolders[0].textContent = years;
	placeHolders[1].textContent = months;
	placeHolders[2].textContent = dayss;
}

function clearErrors() {
	const errors = document.querySelectorAll('.app_error_msg');
	errors.forEach((error) => {
		error.classList.add('hide');
		error.previousElementSibling.classList.remove('app__input-error');
		error.previousElementSibling.previousElementSibling.classList.remove(
			'error'
		);
	});
}

function showError(error_id, message) {
	const error_element = document.getElementById(error_id);
	error_element.textContent = message;
	error_element.previousElementSibling.classList.add('app__input-error');
	error_element.previousElementSibling.previousElementSibling.classList.add(
		'error'
	);
	error_element.classList.remove('hide');
}

function getDaysNumbers(start, end) {
	if (isNaN(start.getTime()) || isNaN(end.getTime())) {
		throw new Error('Invalid date');
	}
	const diffInMilliseconds = end - start;

	const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
	const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay);

	return diffInDays;
}
