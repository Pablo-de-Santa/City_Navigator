const navItems = document.querySelector('.navItems');
const slidingBar = document.querySelector('.slidingBar');
const cityTime = document.querySelector('.cityTime');

let activeButton = null;
let activeCity = null;

//please note - cities are hardcoded. Didn't find API fetching requirements for this task.
const cities = [
	{
		section: "cupertino",
		label: "Cupertino",
		timezone: "America/Los_Angeles"
	},
	{
		section: "new-york-city",
		label: "New York City",
		timezone: "America/New_York"
	},
	{
		section: "london",
		label: "London",
		timezone: "Europe/London"
	},
	{
		section: "amsterdam",
		label: "Amsterdam",
		timezone: "Europe/Amsterdam"
	},
	{
		section: "tokyo",
		label: "Tokyo",
		timezone: "Asia/Tokyo"
	},
	{
		section: "hong-kong",
		label: "Hong Kong",
		timezone: "Asia/Hong_Kong"
	},
	{
		section: "sydney",
		label: "Sydney",
		timezone: "Australia/Sydney"
	}
];

cities.forEach(function(city) {
  const cityButton = document.createElement('button');
  cityButton.textContent = city.label;
  cityButton.dataset.section = city.section;
  cityButton.addEventListener('click', () => handleCitySelection(cityButton, city));
  navItems.appendChild(cityButton);
});

function handleCitySelection(cityButton, city) {
  if (activeButton) {
    activeButton.classList.remove('active');
  }

  cityButton.classList.add('active');
  activeButton = cityButton;
  activeCity = city;

  updateSlidingBar(cityButton);
  toggleCityButtonsDisabled(true);
  updateCityTimeDisplay(true);
}

function updateSlidingBar(cityButton) {
  const buttonRect = cityButton.getBoundingClientRect();
  const navRect = navItems.getBoundingClientRect();

  slidingBar.style.width = buttonRect.width + 'px';
  slidingBar.style.left = (buttonRect.left - navRect.left) + 'px';
}

function toggleCityButtonsDisabled(disabled) {
  const buttons = navItems.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = disabled;
  });
}

function updateCityTimeDisplay(animated = false) {
  if (!activeCity) return;

  const currentTimeOfTheDay = new Date();
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: activeCity.timezone
  };
  const formattedCityTimeTxt = `${activeCity.label}: ${currentTimeOfTheDay.toLocaleTimeString('en-US', timeOptions)}`;

  if (animated) {
    cityTime.classList.add('fade-out');

    setTimeout(() => {
      cityTime.textContent = formattedCityTimeTxt;
      cityTime.classList.remove('fade-out');
      cityTime.classList.add('fade-in');
    }, 300);
  } else {
    cityTime.textContent = formattedCityTimeTxt;
  }
}

cityTime.addEventListener('transitionend', function() {
  cityTime.classList.remove('fade-in');
  toggleCityButtonsDisabled(false);
});

setInterval(function() {
  updateCityTimeDisplay(false);
}, 1000);
