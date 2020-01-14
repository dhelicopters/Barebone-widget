# Barebone widget

Deze readme geeft overzicht over de architectuur van de barebone widget behorende bij de Takahe Magic Mirror. Deze barebone widget geeft
developers een skelet om zelf hun widgets te ontwerpen en implementeren voor de Takahe Magic Mirror opdracht.

# Omschrijving

De barebone is als volgt opgesteld om als widget te kunnen dienen als skelet:

- De barebone widget is geschreven als kleine Express applicatie.
- De barebone widget is een volwaardige website inclusief front- en backend.
- De barebone widget kan zich subscriben op biometrische data die door de Takahe Magic Mirror wordt gegenereerd.
- De barebone widget maakt gebruik van websockets om de frontend te kunnen notificeren over gewijzigde data die gepulled moet worden.
- De barebone widget maakt de volledige HTML inclusief styling en frontend Javascript beschikbaar aan de Takahe Magic Mirror backend.

![De architectuur](https://i.ibb.co/stkwQHW/Barebone-Widget.jpg)

# Taal

De barebone widget is geschreven in nodeJS gebruikmakende van Express om te kunnen fungeren als HTTP server.

# Werking

De barebone widget draait als losstaande website en wordt doormiddel van I-frames ingeladen op de Takahe Magic Mirror. Dit zijn
sandboxed I-frames. Dit betekent dat de widget niet bij parent elementen kan. Houdt hier rekening mee. 

# Biometrische data

Het skelet maakt tevens gebruik van websockets (als client) om van biometrische informatie te worden voorzien door de Takahe Magic Mirror. De spiegel verzamelt constant
informatie over de gebruiker die interactie heeft met de spiegel. Dit gebeurt d.m.v. het pub-sub systeem van de Takahe Magic Mirror, waarbij gesubscribed kan worden
op biometrische data. Dit gebeurt op de volgende manier:

```javascript
        wsClient.on('open', () => {
            wsClient.send(
                JSON.stringify({
                    action: 'setWidget',
                    widgetId: 'JOKE_WIDGET',
                    sub_emotion: false,
                    sub_face: false,
                    sub_gesture: false,
                    sub_voice: true,
                    sub_gender: false,
                    sub_age: false,
                })
            );
            resolve(wsClient);
        });
```

# Websockets

Het skelet maakt in de backend gebruik van websockets om de frontend te notificeren over nieuwe data mits nodig. Dit gebeurt doorgaans wanneer
de backend van nieuwe biometrische informatie wordt voorzien, zoals bijvoorbeeld een spraakcommando, of het verschijnen van een nieuw/ander gezicht. Met een websocket
message wordt de frontend verteld om nieuwe informatie te pullen met een fetch commando. 

# Endpoints

De Takahe backend verwacht twee endpoints om de widget aan te kunnen melden
en de webpagina op te vragen bij de widget. 

| Method | URL | Body | Verwachte responsecode | Doel |
|------|------|---------|-----------|------|
| Post (JSON) | '/' | userId = "5df8aab35fd60a1ad0453a06" | 201 als alles goed is gegaan. 400 op error. | Het aanmelden van de widget. |

| Method | URL | Body | Verwachte responsecode | Doel |
|------|------|---------|-----------|------|
| Get (HTML) | '/:userId' | De HTML van de widget | 200 | Het providen van de HTML die op de spiegel geladen zal worden |

Het skelet maakt gebruik van een HTML template waarin gemakkelijk eigen HTML ingeladen kan worden. Door het HTML bestand uit het filesystem (de **public** folder) te lezen
en de {{widgetHTML}} regel te vervangen met de door de developer geschreven HTML, kan gemakkelijk een widget geschreven worden.

Overige endpoints kunnen door de schrijver van de widget naar eigen believe worden geïmplementeerd. Dit skelet bevat een endpoint om de (ruwe) HTML van de widget te tonen, voor testing purposes.

# Voorbeeldproject

Een voorbeeld project dat gebruik maakt van deze barebone widget is [hier](https://github.com/nick-caris/moppenTrommel) te vinden.

