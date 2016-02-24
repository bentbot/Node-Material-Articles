# Node Material Articles

Based on Google's [Material Design](https://www.google.com/design/spec/material-design/introduction.html) tempalte collection, these articles are displayed in an instant with [Jade](http://jade-lang.com/api/) and JSON.

  - Articles are linked based on their file name
  - Material Design template in Jade structure
  - Magic editing and updating with Socket.io

Article files are written in a structure which allows one to choose various template options. Plain HTML can be included in the content and footer areas.
````
{
	"title": "Page Title",
	"color": "orange",
	"content": "<h1>The Strokes</h1><p>It all started in '98...</p>",
	"footer": "Monday July 13, 2015"
}
````

*JSON files can be easily interpreted by applications and are accessible for human modification. [Proper syntax](http://jsonlint.com/) is required for successful viewing.*

### Version
Article 0.7

### Tech

Dillinger uses a number of open source projects to work properly:

* [Node.js](https://nodejs.org/en/) - event-driven backend server for `index.js`
* [Jade](http://jade-lang.com/) - Simple HTML-like structured templates
* [Express](http://expressjs.com/) - node.js server app framework [@tjholowaychuk]
* Socket.io - fast websocket based node.js frontend
* [Read-JSON](https://www.npmjs.com/package/read-json) - file inspecting library for node.js

### Installation

````
$> npm install
````
all components can be installed & preassembled using the command `npm install` in the project directory. This will automatically install the dependencies listed inside the *package.json* file.

Make an attempt to launch the server:
````
$> node index.js
$> nodemon
````


### Development

Additional features that would make for a better article engine:

- User login and article editing capabilitites and site privacy
- A buit in HTML editor such as [Ace](https://ace.c9.io) or  [TinyMCE](https://www.tinymce.com/)
- Template header, footer, and background customizer (colour wheel)
- Image and media upload & asset management
- A database implementation such as MongoDB or MySQL

### Preview
When running correctly, articles will become visible on an alternative web port number, such as `:8080`. Browsing to the correct URL and adding the port suffex will allow you to connect.
````
http://localhost:8080/
````
![img](http://i.imgur.com/4Fp9QOF.png)
````
http://localhost:8080/demo
````
![img](http://i.imgur.com/E5EwsJf.png)

In the examples above, Node is generating the page in HTML and issuing changes to page elements based on the matching JSON file in `./content` folder.

### NGINX Webservice

Providing port proxies to Nginx will allow you to essentially serve  articles as a website. Use a configuration file such as this, located in */etc/nginx/sites-enabled/default*.

````
server {
        listen 80;
        server_name domain.tld;

        location / {
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_http_version 1.1;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                proxy_pass http://localhost:8080;
        }

        error_page 502 /502.html;
        location = /502.html {
                root /home/ubuntu/public_html;
        }
}
````
Adding an optional HTML 500 Error page in */home/ubuntu/public_html/502.html* will display when Node.JS is not running.

License
----

MIT


