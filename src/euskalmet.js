const getForecastUrl = (city) => {
  // Add a cache buster parameter that changes every 4 hours
  // in order to avoid caching the JSON with the forecast
  // in the client's browser
  const cache_buster = parseInt(new Date().getTime() / (1000 * 60 * 60 * 4));
  return `https://raw.githubusercontent.com/codesyntax/euskalmet-eguraldi-iragarpena/main/forecasts/${city}-euskalmet.json?time=${cache_buster}`;
};

const AVAILABLE_LANGUAGES = {
  eu: 'BASQUE',
  es: 'SPANISH',
};

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .euskalmet .euskalmet-forecast-day {
      padding: var(--euskalmet-forecast-day-padding, 1rem 1rem);
      text-align: var(--euskalmet-forecast-day-text-align, center)
    }
    .euskalmet-body { display: flex };

  </style>
  <div class="euskalmet">
    <div class="euskalmet-inner">
      <div class="euskalmet-header">
      </div>
      <div class="euskalmet-body">
      </div>
    </div>
  </div>
`;

class Euskalmet extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get city() {
    return this.getAttribute('city');
  }

  get days() {
    return this.getAttribute('days');
  }

  get language() {
    return AVAILABLE_LANGUAGES[this.getAttribute('language')];
  }

  get direction() {
    return this.getAttribute('direction');
  }

  get shortText() {
    return this.getAttribute('short-text');
  }

  get customBaseUrl() {
    return this.getAttribute('custom-base-url');
  }

  get customIconExtension() {
    return this.getAttribute('custom-icon-extension');
  }

  get modernImages() {
    return this.getAttribute('modern-images');
  }

  async connectedCallback() {
    const response = await fetch(getForecastUrl(this.city));
    const data = await response.json();
    const trends = data['trendsByDate'].sort((a, b) => {
      return a['date'].localeCompare(b['date']);
    });
    const body = this._shadowRoot.querySelector('.euskalmet-body');
    body.style = `flex-direction: ${this.direction}`;
    trends.slice(0, parseInt(this.days)).map((item) => {
      let div = document.createElement('div');
      let forecastText = item.weather.nameByLang[this.language];
      div.className = 'euskalmet-forecast-day';

      let dateObject = new Date(item.date);
      let dateText = dateObject.toLocaleDateString('eu-ES', {
        timeZone: 'Europe/Madrid',
      });
      let shortText = this.shortText ? forecastText : '';

      let imageUrl = this.modernImages
        ? this.customBaseUrl
          ? this.customIconExtension
            ? `${this.customBaseUrl}/i${item.weather.id}d.${this.customIconExtension}`
            : `${this.customBaseUrl}/webmet00-${item.weather.icon_name_modern}`
          : item.weather.full_path_modern
        : this.customBaseUrl
        ? this.customIconExtension
          ? `${this.customBaseUrl}/${item.weather.id}.${this.customIconExtension}`
          : `${this.customBaseUrl}/${item.weather.icon_name}`
        : item.weather.full_path;

      div.innerHTML = `
      <p class="euskalmet-forecast-date">
        ${dateText}
      </p>
      <p class="euskalmet-forecast-symbol">
        <img src="${imageUrl}" alt="${forecastText}" /> <br/>
        ${shortText}
      </p>

      <p class="euskalmet-forecast-temperature">
        <span class="euskalmet-forecast-temperature-low">${item.temperatureRange.min} ºC</span> - <span class="euskalmet-forecast-temperature-low">${item.temperatureRange.max} ºC</span>
      </p>

      `;

      body.appendChild(div);
    });
  }
}

window.customElements.define('euskalmet-eguraldia', Euskalmet);
