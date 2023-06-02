# User Based Content

## Starta programmet

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.

Sedan navigera till client mappen -`cd client` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.

För att köra programmet behövs även en .env fil i server src mappen som innehåller:

MONGO_URL = mongodb+srv://XXXXXXXXXXX
och
SESSION_SECRET = XXXXXXXXXXXXXXX

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [Z] Uppgiften lämnas in i tid!
- [x] Det ska finnas minst två stycken resurser (users & posts)
- [x] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [x] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [x] Allt innehåll ska sparas i en MongoDB databas.
- [x] Alla punkter för godkänt är uppfyllda
- [x] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [x] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.
