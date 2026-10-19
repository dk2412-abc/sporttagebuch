# Sporttagebuch PWA

Eine installierbare, offlinefähige Sporttagebuch-PWA für iPhone und andere moderne Browser. Einträge werden ausschließlich im lokalen Browser-Speicher gespeichert.

## Lokal starten

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
npm run preview
```

Der fertige Build liegt anschließend im Ordner `dist`.

## Auf dem iPhone installieren

1. Die veröffentlichte HTTPS-Adresse in Safari öffnen.
2. Auf „Teilen“ tippen.
3. „Zum Home-Bildschirm“ auswählen.
4. „Hinzufügen“ bestätigen.

## Veröffentlichen

Den Inhalt des erzeugten `dist`-Ordners bei einem HTTPS-Host veröffentlichen, zum Beispiel GitHub Pages, Cloudflare Pages, Netlify oder einem eigenen Webserver.

## Datenspeicherung

Die Einträge liegen in `localStorage` unter dem Schlüssel `sporttagebuch`. Werden Website-Daten gelöscht oder die App entfernt, können die Daten verloren gehen. Für spätere Versionen empfiehlt sich ein Export/Import als JSON oder CSV.
