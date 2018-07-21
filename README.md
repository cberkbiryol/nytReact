# nytReact

## Description:
This static React app is uses NYT API to retrieve and display news based on a search term and date range provided by the user. The app provides functionallity for the user to save articles for later viewing. These articles are stored in a mongoDB on server. The users can also comment on saved articles which are displayed under each article card in an order from most recent to oldest. The app checks if the search is successful and returns results. If search does not return any results the app displays a informative message in the search results area.  

![top Page](client/public/img/img1.png)

With all the functionallity given above the app does the following: 
1. Generates an API request and sends the API request to NYT on the serveside when via the `/api/news/getnews` route. This ensures that the API Key is secured in the serverside and not visible on the client side.
1. The results of the API search is displayed on screen in the form of cards defined by the `NewsCard` component. The app reformats the `NewsCard` depending on wether the news piece is saved or not. 
1. When the user clicks on the save button for the news piece, a post call to `/api/news/` route is placed and on the server-side the saved pieceis stored in the database. In return the news item is displayed in the `saved news` section at the bottom.
1. When the user clicks on the `comment` button, a hidden `<div>` is toggled containing the input fields for the comment (user name and comment). when the user clicks on the submit button here, a post call to `/api/news/:id` route is placed and this creates a new `comment document` in `comments collection` and populates the associated `news document` in the `news collection` of the mongo database. In return the comment all associated comments are displayed in the associated saved `NewsCard` newest comment being at the top. 
1. The user can remove the saved news pieces by clicking the `close button` above the `comment` button. This generates a delete call to `/api/news/:id` and the news entry is deleted from the database along with the comments. 
1. Main functionality of the app is provided by the `pages/Home.js` statefull component of the app. The remaining components are stateless. Upon mounting of this component the app loads and displays the saved news pieces along with their comments (via the `componentDidMount` life cycle method). 

![middle Page](client/public/img/img2.png)

All the afforementioned updates are carried out realtime making use of reacts core virtual DOM functionality. Hence, The page is dynamic and no reloading of the page takes place. 

![middle Page](client/public/img/img3.png)

## Technologies & Dependencies
### JavaScript:
Following NPM packages are used and required for the app to execute propoerly:

**Server:**
* MongoDB and mongoose
* express
* body-parser

**Client:**
* react-dom
* react-router-dom
* momentJS
* React JS and its dependencies (i.e Babel, JSX, etc...)

### Frontend Framework & Technologies:
* Bootsrap 4.0
* Google Fonts
* Google Material Icons

## How it works
The gif below shows how the app works.

![App view](client/public/img/gif1.gif)

The gif below shows responsive operation of the app.

![Responsive view](client/public/img/gif2.gif)