const getForecastUrl = (city) => {
  // Add a cache buster parameter that changes every 4 hours
  // in order to avoid caching the JSON with the forecast
  // in the client's browser
  const cache_buster = parseInt(new Date().getTime() / (1000 * 60 * 60 * 4));
  return `https://raw.githubusercontent.com/erral/eguraldi_iragarpena/main/forecasts/${city}-euskalmet.json?time=${cache_buster}`;
};

const AVAILABLE_LANGUAGES = {
  eu: 'BASQUE',
  es: 'SPANISH',
};

const template = document.createElement('template');

template.innerHTML = `
  <style type="text/css">
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
      const dateText = item.date.split('T')[0];
      const shortText = this.shortText ? forecastText : '';

      const imageUrl = this.customBaseUrl
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
