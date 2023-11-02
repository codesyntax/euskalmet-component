# Euskalmet-eko iragarpena zure webgunean

Euskalmeten APIa erabiliz [herrietako iragarpenak JSON formatuan ekarri eta gordetzen ditut](https://github.com/erral/eguraldi_iragarpena).

JavaScript hau erabiliz, zure webgunean iragarpen hori txertatu dezakezu.

Horretarako [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) teknologia darabilt, beraz ez duzu jQuery, React, vue edo beste edonolako ingurunerik behar.

## Erabilera

Kargatu `euskalmet.js` fitxtegia zure HTMLan. Horrelako zerbait izango da:

```html
<script src="https://raw.githubusercontent.com/erral/euskalmet-component/main/src/euskalmet.js" />
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

- city: eibar|antzuola. Momentuz Eibar eta Antzuolako iragarpenak bakarrik ditut, baina laster jarriko ditut Euskalmeten APIak ematen dituen guztiak
- days: zenbat egunetako iragarpena erakutsi nahi duzun. Gehienez 7 egun izan daitezke.
- language: eu|es. Momentuz ez dut testurik bistan erakusten, irudiaren `alt` bezala bakarrik.
- direction: column|row. Ikonoak zutabean edo lerroan erakusteko aukera.

## Adibidea

[Oinarrizko adibidea](https://erral.github.io/euskalmet-component/src/index.html) automatikoki argitaratzen da GitHuben bertan.

Bertan dituzu erabiliera adibide gehiago.

## Zer gehiago?

Osagai hau osatu egin nahi dut eta ezaugarri hauek gehitu:

- Estiloa era erraz baten emateko aukera (CSS aldagaiak erabiliz?)
- Ikonoak erakutsi/ez erakutsi erabakitzea
- Testuak erakutsi/ez erakutsi erabakitzea
- Errore kontrola herri, egun edo hizkuntza okerra sartutakoan
- ... (okurritzen zaizun beste edozer)
