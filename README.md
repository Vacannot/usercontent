# User Based Content

## Beskrivning

Ni ska skapa en användarbaserad plattform där en användare har möjligheten att registrera sig, logga in och skapa innehåll. Vad för innehåll som användaren kan skapa är valfritt med det ska vara baserat på en resurs i erat Express-API. Användardatan ska även den baseras på en egen resurs (users), där lösenordet är krypterat. Samtligt innehåll som skapas, förändras eller tas bort ska sparas till en MongoDB databas. Innehållet som en användare skapar får endast lov att ändras eller tas bort av skaparen. Plattformen ska innehålla en klientapplikation där samtliga operationer som nämnts ovan är genomförbara. Dessutom ska innehållet på något sätt presenteras i gränssnittet och vara synligt föra alla - även om man inte är inloggad.

## Kodbas

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).
Servern har två miljöer konfigurerade, en för utveckling och en för testning.

Servern innehåller några start-filer som kan vara bra att känna till:

- `server.ts` - startfil för utvecklingsmiljön.
- `app.ts` - innehåller all serverlogik.
- `index.ts` - exports till testmiljön.

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.
- `npm test` - Startar testmiljön så du kan jobba med kravlistan.

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt via läroplattformen där ni lämnar in er projektmapp som en zip-fil. I projektmappen ska det finnas (utöver all kod) en README.md fil som innehåller en titel, beskrivning av uppgiften och vad som krävs för att bygga och starta projektet.

En muntligt presentation ska genomföras per grupp där ni visar vad ni har skapat. Samtlig funktionalitet ska demas och kommer att bockas av och Godkännas under presentationen. Upplägg och innehåll i övrigt är valfritt så länge ni håller er till ämnet. Ca 10-15 min per grupp.

Para ihop er i grupp om tre - ni väljer själva vilka ni jobbar med.

**Krav för godkänt:**

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Det ska finnas minst två stycken resurser (users & posts)
- [ ] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [ ] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [ ] Allt innehåll ska sparas i en MongoDB databas.

_Gjorda krav ska kryssar i_

**Krav för väl godkänt:**

- [ ] Alla punkter för godkänt är uppfyllda
- [ ] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [ ] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.

_Gjorda krav ska kryssar i_
