# Euskalmet-eko iragarpena zure webgunean

Euskalmeten APIa erabiliz [herrietako iragarpenak JSON formatuan ekarri eta gordetzen ditut](https://github.com/codesyntax/euskalment-eguraldi-iragarpena).

JavaScript hau erabiliz, zure webgunean iragarpen hori txertatu dezakezu.

Horretarako [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) teknologia darabilt, beraz ez duzu jQuery, React, vue edo beste edonolako ingurunerik behar.

## Erabilera

Kargatu `euskalmet.js` fitxtegia zure HTMLan. Horrelako zerbait izango da:

```html
<script src="https://raw.githubusercontent.com/codesyntax/euskalmet-component/main/src/euskalmet.js" />
```

Eta ondoren erakutsi zure iragarpena:

```html
<euskalmet-eguraldia
  city="eibar"
  days="3"
  language="eu"
  direction="column"
></euskalmet-eguraldia>
```

Erabili daitezkeen aukerak hauexek dira:

- `city`: eibar. Euskalmetek eskaintzen dituen herri guztiak erabili daitezke. [Ikusi zerrenda hemen](https://github.com/codesyntax/euskalmet-eguraldi-iragarpena/tree/main/forecasts)
- `days`: zenbat egunetako iragarpena erakutsi nahi duzun. Gehienez 7 egun izan daitezke.
- `language`: eu|es. Momentuz ez dut testurik bistan erakusten, irudiaren `alt` bezala bakarrik.
- `direction`: column|row. Ikonoak zutabean edo lerroan erakusteko aukera.
- `short-text`: (hautazkoa) true. Hau pasatuz gero, iragarpenaren testu laburra agertuko da (oskarbi, euria, zaparradak, ...)
- `custom-base-url`: (hautazkoa) Euskalmeten ikonoak beharrean beste batzuk erabili nahi badituzu, ikono horiek dauden URLa pasatu hemen. Ikonoen izenak berberak izan behar dira. [Ikusi ikono zerrenda hemen](https://github.com/codesyntax/euskalment-eguraldi-iragarpena/tree/main/images)
- `custom-icon-extension`: (hautazkoa) defektuzko png luzapena erabili beharrean, beste formatu bateko ikonoak sortzen badituzu (adibidez GIF), hemen adierazi ikono horiek fitxategien luzapena. Ikono guztientzat berbera izan behar da. Adi: aukera honek aurrekoarekin batera bakarrik funtzionatuko du.
- `modern-images`: (hautazkoa) true. Hau pasatuz gero, Euskalmeten webgune berriko ikonoak erabiliko dira. [Ikusi ikono berrien zerrenda hemen](https://github.com/codesyntax/euskalmet-eguraldi-iragarpena/tree/main/images-modern). Aukera hau `custom-base-url` eta `custom-icon-extension` aukerekin bateragarria da. Kontuan izan ikono berrien izena zertxobait desberdina dela: `10.png` vs. `webmet00-i10d.svg`

## Adibidea

[Oinarrizko adibidea](https://codesyntax.github.io/euskalmet-component/src/index.html) automatikoki argitaratzen da GitHuben bertan.

Bertan dituzu erabiliera adibide gehiago.

## Zer gehiago?

Osagai hau osatu egin nahi dut eta ezaugarri hauek gehitu:

- Estiloa era erraz baten emateko aukera (CSS aldagaiak erabiliz?)
- Ikonoak erakutsi/ez erakutsi erabakitzea
- Testuak erakutsi/ez erakutsi erabakitzea
- Errore kontrola herri, egun edo hizkuntza okerra sartutakoan
- ... (okurritzen zaizun beste edozer)
