# Welcome to Pantry Perfect!

Hello! Pantry Perfect is a web application that allows a user to track the quantity of the items they regularly buy so that they can see how much food they need to purchase without going home first. Users can also add regularly cooked recipes and tie them to the items they track, so that they can build a grocery list on the fly by what meal they want to cook. The application updates the pantry quantities based on user input, and tracks certain stats so that the user can see their most cooked meals and most frequently thrown out groceries.

The true purpose for this application is to remove the pain point of having to go home first to see how much food you need to buy for dinner. Typically, people shop for many meals at a time to help eliminate this problem. Realistically, though, life has a way to intervening and pushing meals back or completely out of the plan. Days go by, food spoils, the trash can gets fed, and guilt sets in as you see dollar signs float away and remember that there are starving people all over the world.

The target user is one who wants to be fiscally and socially responsible about food waste and would shop for one or two meals at a time to help fight that. The application is designed to eliminate the pain points of that reality.

Visit Pantry Perfect: https://pantry-perfect.herokuapp.com

## Pantry UI

Below are some helpful gifs for how to make use of pantry perfect once you visit!

For the best demonstration of all of the features, a base profile has been built with quite a bit of starter data to play with. At the login screen, type 

username: ricky

password: 123

![Login Demo](https://github.com/ricky-bruner/Pantry-Perfect-Midstone/blob/master/readmegifs/login.gif?raw=true)

Once logged in, there are several pantry items already entered for perusal. You can add new items, edit current items, and even delete them. You may also convert the quantity type into whatever format works best for you from a list, and designate an amount to "toss". You may also entirely reset the amount to whatever you choose.

![Pantry Demo](https://github.com/ricky-bruner/Pantry-Perfect-Midstone/blob/master/readmegifs/pantry-search-convert.gif?raw=true)

On the recipes side, you may add a recipe and the ingredients that you track for it. Recipes can be "favorited" or "unfavorited" by clicking the heart icon next to the title. Details can be viewed and hidden as well. When the **Cook?** icon is clicked, a popup will appear giving you a view of what the recipe calls for vs what is currently "in stock" in the pantry. Green means you have more than enough to cook the meal, blue means you have exactly enough, and red means you are short and need to shop. You may select the ingredients that youd like to buy with the slider next to it, and select **Add to Grocery List** below to build a grocery list. 

![Recipes Demo](https://github.com/ricky-bruner/Pantry-Perfect-Midstone/blob/master/readmegifs/recipe-features.gif?raw=true)

As you grocery shop, you may update the grocery list with the amount of the item you purchase, and the pantry will update with the new added total. Then you may revist the **Cook?** feature and select **Mark As Cooked**. The pantry will have those totals subtracted from each ingredient used, and the stats will reflect that you cooked that meal. 

![Stats Demo](https://github.com/ricky-bruner/Pantry-Perfect-Midstone/blob/master/readmegifs/stats-tracking.gif?raw=true)

With that, you've viewed most of Pantry Perfect's features from it's initial build!

Current plans for v2 are to restructure the page layout in a way that allows for a more mobile friendly user experience. Media queries will be implemented to change everything for ideal support. 

## Tech Talk

Pantry Perfect is build in **React.js** and styled with **Semantic UI** for React. Many components are used and heavily altered for the current look of the project, with CSS handling the bulk of the styled look. **Charts.js** was implemented for the stats views, with **tilt.js** sprinkled in mostly because I wanted to be "extra" and implement as many things as I could find to build my experience with those types of plugins.

The "database" is a JSON file hosted off of json server, deployed to Heroku. The app has been updated with the new appropriate fetch calls. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

NPM is a major for this project. It was created with npx create-react-app and makes use of react-router-dom as well as the various plugins for the style base.

Here's a preview of the package-json:
```
"dependencies": {
    "chart.js": "^2.1.1",
    "react": "^16.5.2",
    "react-chartjs": "^1.2.0",
    "react-chartjs-2": "^2.7.4",
    "react-dom": "^16.5.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.5",
    "react-tilt": "^0.1.4",
    "semantic-ui-css": "^2.4.0",
    "semantic-ui-react": "^0.82.5"
  },
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc








![Pantry Perfect ERD](https://github.com/ricky-bruner/Pantry-Perfect-Midstone/blob/master/PantryAppERD.png)