# Google Apps Script: Anmeldung für Events

Die Events-Seite sendet Anmeldungen per POST an dein Google Apps Script.  
**URL:** `https://script.google.com/macros/s/AKfycbxcPyb4JUoQXjKKQM75j7NQJyAPR41h9hzlrLotZP2Sx4oq0ONCtgiZNe_b4nK3d3HO/exec`

## Gesendete Formularfelder

| Feld | Beschreibung |
|------|--------------|
| `eventTitle` | Titel der Veranstaltung |
| `eventDate` | Datum + Uhrzeit, z.B. "30.10.2026, 19:00 Uhr" |
| `vorname` | Vorname |
| `nachname` | Nachname |
| `email` | E-Mail Adresse (für Bestätigungs-Mail) |
| `personenanzahl` | Anzahl Personen |
| `kommentar` | Kommentar (kann leer sein) |
| `newsletter` | "Ja" oder "Nein" |

## Was das Script tun soll

1. **In Google Sheet schreiben**  
   Eine Zeile pro Anmeldung mit: Zeitstempel, eventTitle, eventDate, vorname, nachname, email, personenanzahl, kommentar, newsletter.

2. **Automatische E-Mail an den Teilnehmer**  
   An die Adresse aus `email` mit:
   - Betreff z.B.: *Anmeldung bestätigt – [eventTitle]*
   - Inhalt u.a.:
     - Danke für die Anmeldung
     - Die Anmeldung war erfolgreich
     - Wir freuen uns, dich am [Datum] um [Uhrzeit] bei uns begrüßen zu dürfen
   - `eventDate` enthält Datum und Uhrzeit (z.B. "30.10.2026, 19:00 Uhr") und kann so in der Mail verwendet werden.

## Beispiel doPost (Google Apps Script)

```javascript
function doPost(e) {
  const params = e.parameter;
  const eventTitle = params.eventTitle || '';
  const eventDate = params.eventDate || '';
  const vorname = params.vorname || '';
  const nachname = params.nachname || '';
  const email = params.email || '';
  const personenanzahl = params.personenanzahl || '';
  const kommentar = params.kommentar || '';
  const newsletter = params.newsletter || 'Nein';

  // 1) In Sheet schreiben (deine Spreadsheet-ID und Blattname anpassen)
  const ss = SpreadsheetApp.openById('DEINE_SPREADSHEET_ID');
  const sheet = ss.getSheetByName('Anmeldungen'); // oder getSheets()[0]
  sheet.appendRow([
    new Date(),
    eventTitle,
    eventDate,
    vorname,
    nachname,
    email,
    personenanzahl,
    kommentar,
    newsletter
  ]);

  // 2) Bestätigungs-Mail an den Teilnehmer
  const betreff = 'Anmeldung bestätigt – ' + eventTitle;
  const body =
    'Hallo ' + vorname + ',\n\n' +
    'vielen Dank für deine Anmeldung! Deine Anmeldung war erfolgreich.\n\n' +
    'Wir freuen uns, dich am ' + eventDate + ' bei uns im phil begrüßen zu dürfen.\n\n' +
    'Bis dahin,\nDein phil-Team';
  GmailApp.sendEmail(email, betreff, body, { name: 'phil Cafe & Bookshop' });

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- **Spreadsheet:** Tab „Anmeldungen“ (oder erstes Blatt) mit passenden Spaltenüberschriften.  
- **E-Mail:** `GmailApp.sendEmail` nutzt das Konto des Script-Inhabers; bei Bedarf Absender-Name anpassen.

## Altes Script

Falls dein bestehendes Script noch die alten Felder (`name`, `personCount` statt `vorname`, `nachname`, `personenanzahl`) erwartet, muss es auf die neuen Feldnamen und die E-Mail-Logik umgestellt werden. Die Website sendet nur noch die neuen Felder.
