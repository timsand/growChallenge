# Take Home Challenge

## Running Locally\

This app requires Node.JS version 14 or higher to run.

To run this app locally:

1. Clone the repository down
2. Run `npm ci` to download all of the packages
3. Run `npm start` to start the express server

To run the smoketests, optionally download the REST Client addon for VSCode. Navigate to the appropraite file under `smokeTests` and run the file. See [this guide](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for more information on how to use the REST Client addon.

## Info / Caveats

This app fulfills all the requirements laid out in the [Growmies readme](https://github.com/Growmies/node-exercise). While it meets all the requirements, I wanted to go over some of the edge cases that I encountered, how I solved them, and what I might do with this app if I were to continue developing it.

First off, I may have over-engineered a little bit with finding **ALL** people/planets. While I could have hardcoded the number, I noticed that the total number of documents I was retrieving from the API was different from the number stated in the README. Because of this, I decided to make a function that would handle fetching all the documents for me, regardless of how many there are. Another little edge case I ran into dealt with the filtering of the "people" data. I noticed that sometimes certain fields did not exist in the filter field, so in that case they were sorted at the top. Furthermore, the filters are applied in descending order.

Another issue I ran into dealt with replacing the `residents` property from the `planets` API with the `name` field stored in the `people` API. While we could make a network request for each resident in that array, that would dramatically increase the cost of our API call. Instead, I went ahead and simply used the id field as a key to access the data retrieved from fetching all people from the API. However, I noticed that person number 17 **_DOES NOT EXIST_** in the persons API, leading to a more disjointed relationship between the data I retrieve from the API and the data that they have (presumably in a database somewhere). I was able to manually get past this (see the code), but if many more edge-cases like this were to arise, I might need to think of a better solution.

If this app were to move forward, it would certainly need more tests. In addition, it needs some error handling. If a network request fails right now, it will simply crash the server (uh oh!). Since we're retrieving the same data over and over again, using Redis or some other in-memory database to cache that might make sense. If more REST endpoints were constructed here, the `router.js` file would need to get broken up into its own routers folder.

<br>
<br>
<br>

![That's no moon...](https://static.wikia.nocookie.net/starwars/images/9/9d/DSI_hdapproach.png/revision/latest?cb=20130221005853)
