# conServe

[conServe](https://con--serve.herokuapp.com/) is an online tool that helps you serve delicious food while conserving groceries, by keeping track of the expiration dates of your food providing recipes from around the world.

This project was created by Livia Zhu and Anna Wei for the 2020 HackDuke Code For Good hackathon, winning 3rd Best Energy & Environment Track Hack. 

## Inspiration
All too often, we reach into the back of our fridges and pull out an apple or jar of peanut butter that expired just a week ago. Instead of making Peanut Butter Apple Bars, we create CO2 emissions through food waste, which is responsible for around 6% of all total CO2 emissions. We wanted to create a tool that would let users keep track of when their food will expire and provide ideas for recipes that they might want to try to use up the ingredients that are soon to expire. Enter conServe.

## What it does
First, you enter the groceries that you have in your fridge. If there is a match in our database, we automatically populate the Expiration Date field, or you can manually add/change it. You can view your list of groceries, automatically ordered by expiration date, and modify them as necessary. Then, you can optionally select a few groceries and we will generate a list of delicious recipes using those selected groceries. If none is selected, we will automatically generate recipes for the food items set to expire within the week. On the recipes page, you can compare which recipes use up the most of your selected food items/expiring food items and explore what others they require. You can also click into each for more details or freely remove any ingredients that you no longer want to use and the list of recipes will automatically update. Additionally, if you select multiple food items with the same name, we also take care of the duplication and only show each item once on the Recipes page.

### What track are you submitting this project to?
Energy and Environment

### Describe the problem your solution addresses? (150 word limit)
Around 1/3 of all food produced globally is wasted. This is about 1.3 billion tons of food, which may be enough to feed every undernourished person. Wasted food is a social, humanitarian, and environmental issue. When food is wasted, so is all the energy and water spent into growing and selling it. Food waste accounts for around 11% of all greenhouse gas emissions from the food system. If food enters the landfill and rots, it produces methane, a greenhouse gas even more detrimental than CO2. In the US alone, wasted food generates the equivalent of 37 million cars’ worth of greenhouse gas emissions.

We want to help reduce food waste and their detrimental social, humanitarian, and environmental impact through a simple yet effective tool. conServe helps people keep track of their food’s expiration dates and generates exciting new recipes that use up leftover groceries, hopefully minimizing food waste.

Source: https://www.worldwildlife.org/stories/fight-climate-change-by-preventing-food-waste

### Why did you pick this solution and how does it address the problem? (150 word limit)
This solution allows people to reduce their food waste by keeping track of what and when groceries will expire and how to cook with them so that they do not have to throw them out. We chose this solution as it not only allows people to help the environment through daily action, it exposes them to the joy of cooking and different recipes and cuisines they may not have thought of before, using ingredients that they already have.

## How we built it
Our website was built using React.js, Bootstrap, and the Recipe Puppy API for recipe generation.

## Challenges we ran into
Neither of us was really familiar with React, so we had to learn a lot about the framework and ran into a few challenges with implementation. We also overcame issues with the asynchronous aspect of JavaScript. In addition, there was a learning curve with finding the right API and calling it, which we had never done before, but we learned a lot from this project!

## Accomplishments that we're proud of
We're proud of creating a polished UI and functional MVP that is user-friendly and responsive, especially using technologies that we have had such little experience with.

## What we learned
We learned much more about how to use React, including passing data around components, routing, and calling APIs.

## What's next for conServe
conServe has huge potential, and we have many plans to improve it, such as:

* Add user accounts and a backend to persist users' grocery lists
* Display the emissions that would result from wasted food so that people can see the impact of their actions
* Connect to a broader database of foods and their expiration timeframes
* Add quantities of groceries to be even more precise
