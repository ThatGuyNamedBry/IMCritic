# IMCritic Movie Review Site

IMCritic is an innovative platform that pays homage to IMDb while offering a unique experience for movie enthusiasts. As a soft clone of IMDb, IMCritic is dedicated to providing a space where users can immerse themselves in the world of cinema.
Check it out [here](https://imcritic.onrender.com)!

## Index
[MVP Feature List](https://github.com/ThatGuyNamedBry/IMCritic/wiki/IMCritic-Features-List) | [Database Schema](https://github.com/ThatGuyNamedBry/IMCritic/wiki/DB-SCHEMA) | [User Stories](https://github.com/ThatGuyNamedBry/IMCritic/wiki/IMCritic-User-Stories) | [WireFrames](https://github.com/ThatGuyNamedBry/IMCritic/wiki/Wireframes)



## :hammer_and_wrench: Technologies Used:

- Frontend:
<div id ="badges">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
</div>

- Backend:
<div id ="badges">
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" alt="Python" title="Python" width="40" height="40" />
  <img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original.svg" alt="Flask" title="Flask" width="40" height="40" />
</div>

## Images

### Home Landing Page
![imcritic-homepage](https://github.com/ThatGuyNamedBry/IMCritic/assets/115834757/fed40e9c-cad9-42f9-b5de-d366c5979c53)

### MovieDetails Page
![IMCritic-movieDetails](https://github.com/ThatGuyNamedBry/IMCritic/assets/115834757/194884ed-bd93-4d80-9520-643c880747ff)

<!-- ### Review Modal
![ReviewModal](https://github.com/ThatGuyNamedBry/IMCritic/assets/115834757/e84d4039-48a6-4c93-ab90-9d95c671e917)
-->

## Installation Instructions

1. Install dependencies
```bash
pipenv install -r requirements.txt
```
2. Create a **.env** file based on the example with proper settings for your development environment

4. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```
```bash
flask db upgrade
```
```bash
flask seed all
```
```bash
flask run
```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
