# Barebone widget

This readme supplies an overview concerning the architecture and operation of the barebone widget belonging to the Takahe Magic Mirror project. This barebone
widget provides developers with a skeleton to design and implement widgets to be shown on the Takahe Magic Mirror. 

# Description

The barebone is created as follows, with the intension of being a skeleton for a developer who whishes to create his or her own widgets for the Takahe Magic Mirror. 

- The barebone widget is written as a small Express application
- The barebone widget is a standalone website including front- and backend
- The barebone widget may subscribe itself to biometric information provided by the Takahe Magic Mirror
- The barebone widget makes uses of the websocket technology to notify it's frontend about data changes that should be displayed
- The barebone widget exposes it's entire HTML including styling and frontend Javascript to the Takahe Magic Mirror backend

# Architecture

![The architecture](https://i.ibb.co/gzsq32m/Barebone-Widget-2.jpg)

# Language

The barebone widget is written in nodeJS using Express to act as an HTTP server.

# Operation

The barebone widget runs as a standalone website and is loaded in the Magic Mirror through I-frames. These are sandboxed I-frames which
means the widget can **not** access it's parent elements. Keep this in mind while developing. 

# Biometric data

The skeleton uses websockets (as a client, receiving messages) to provide itself with biometric data which is supplied by the Takahe Magic Mirror. The mirror gathers biometric data
of the user standing in front of it on a regular basis. By using the built in pub-sub system belonging to the Takahe Magic Mirror you as developer can subscribe
on the information relevant for your widget. This happens as follows:

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

The skeleton uses websocket technology to notify the frontend about new data when needed. This usually happens when the Takahe Magic Mirror backend
receives new biometric data such as voice commands or a newly recognized face. When the widget backend sends a websocket message to the widget frontend,
the frontend knows when to pull new information from the widget backend using a fetch request for example. 

# Endpoints

The Takahe Magic Mirror backend expects two endpoints to be able to register the widget and to show the HTML content of the widget/

| Method | Content-Type | URL | Body | Expected response code | Goal |
|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| Post | JSON | '/' | { userId = "5df8aab35fd60a1ad0453a06" } | 201 OK or 400 in case of an error | To register the widget |

| Method | Content-Type | URL | Body | Expected response code | Goal |
|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| Get | HTML | '/:userId' | The entire widget HTML to be shown | 200 OK or 400 in case of an error | To provide the HTML that is to be shown on the Takahe Magic Mirror |

The skeleton uses an HTML template in which replacing content with your own HTML has been made easy. It works by getting the HTML file from the filesystem (using the **public** folder) 
and replacing the line saying:

```{{widgetHTML}}```

by you own HTML. This enables the developer to easily write widgets for the Takahe Magic mirror. 

The skeleton contains one more endpoint which is used by the widget frontend to display the HTML on it's own frontend. Any further implementation is completely up to you.


# Example project

An example project which uses this barebone widget is found [here](https://github.com/nick-caris/moppenTrommel). It's a simple
implementation of a widget that provides the user of jokes and GIFs using voice commands. 

