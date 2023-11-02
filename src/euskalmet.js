const getForecastUrl = (city) => {
  return `https://raw.githubusercontent.com/erral/eguraldi_iragarpena/main/forecasts/${city}-euskalmet.json`;
};

const AVAILABLE_LANGUAGES = {
  eu: "BASQUE",
  es: "SPANISH",
};

const template = document.createElement("template");

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
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get city() {
    return this.getAttribute("city");
  }

  get days() {
    return this.getAttribute("days");
  }

  get language() {
    return AVAILABLE_LANGUAGES[this.getAttribute("language")];
  }

  get direction() {
    return this.getAttribute("direction");
  }

  async connectedCallback() {
    const response = await fetch(getForecastUrl(this.city));
    const data = await response.json();
    const trends = data["trendsByDate"].sort((a, b) => {
      return a["date"].localeCompare(b["date"]);
    });
    const body = this._shadowRoot.querySelector(".euskalmet-body");
    body.style = `flex-direction: ${this.direction}`;
    trends.slice(0, parseInt(this.days)).map((item) => {
      let div = document.createElement("div");
      let forecastText = item.weather.nameByLang[this.language];
      div.className = "euskalmet-forecast-day";
      div.innerHTML = `
      <p class="euskalmet-forecast-symbol">
        <img src="${item.weather.full_path}" alt="${forecastText}" />
      </p>

      <p class="euskalmet-forecast-temperature">
        <span class="euskalmet-forecast-temperature-low">${item.temperatureRange.min}</span> - <span class="euskalmet-forecast-temperature-low">${item.temperatureRange.max}</span>
      </p>

      `;

      body.appendChild(div);
    });
  }
}

window.customElements.define("euskalmet-eguraldia", Euskalmet);
