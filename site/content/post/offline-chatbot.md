---
title: "Building an offline chatbot"
date: "2018-05-20"
---

Having a borderline unhealthy obsession with making stuff run offline (my "dayjob" is partly to blame here), an idea started keeping me up at night - why not a chatbot? The idea [turned into a talk](https://www.youtube.com/watch?v=tJLIzsR9QZI) (not english tho) I gave at a local meetup but it still feels like it deserves a more in-depth treatise on the why and how of building an offline chatbot.

## Why?

I mean, why not? 😎 With [PWAs](https://en.wikipedia.org/wiki/Progressive_Web_Apps) becoming more mainstream, we can expect to see more "edgy" stuff in the browser, working offline and acting like a desktop app. So if we can have [various games](https://outweb.io/), [tomato timers](https://tomatoes.work/), [file sharing](https://onedoes.github.io/snapdrop/) and even [google drive / docs](https://drive.google.com) running offline, why not a measly chatbot? For whenever you feel like talking to a not-particularly-smart glorified if / else statement? No? Doesn't matter, read on 😆.

## How?

Take one part [create-react-app](https://github.com/facebook/create-react-app), one part [compromise.js](http://compromise.cool/) with a sprinkle of react for UI and "brains" on top, et voila - a chatbot basis. The `create-react-app` bit is not particularly interesting here, so we'll skip that and get into `compromise.js` a bit before we get into the actually interesting parts.

### 1. Compromise.js

The self-described "modest natural-language processing in javascript" library is in fact a very cool piece of tech. It may not be the [cleverest nor the fastest](https://github.com/spencermountain/compromise/wiki/Justification) NLP solution out there, even when it comes to JavaScript land, but it runs in the browser and is perfectly capable of running offline, as it doesn't depend on any third party services. Best of all, it weights around 200kb (which is around the same size as jQuery, only cooler 😉). With that size, it still manages to be [84%-86% accurate](https://github.com/spencermountain/compromise/wiki/Accuracy). Effin' amazing. 

How it achieves that takes a bit of reading and theory to understand fully, but the gist of it is: 

1. 80% of the used english language consists of the [top 1000 words](https://github.com/spencermountain/compromise/wiki/Justification#justification).
2. Statistically, the most common word type is a noun, so it makes sense to assume that any word unknown to the library is a noun.
3. With some word [stemming / lemmatization](https://en.wikipedia.org/wiki/Stemming), we can reduce the size of the dictionary needed for the library to run (word suffixes, for example).
4. And some sentence-level postprocessing on top, leads us to the numbers mentioned above.

A thousand word dictionary is perfectly acceptable for in-browser use, considering modern JS library sizes. A more in-depth explanation on how compromise works [here](http://compromise.cool/) and [here](https://github.com/spencermountain/compromise/wiki/How-it-Works). Oh, did I mention it also does plugins and custom lexicons?

### 2. The "brains" part

Compromise.js sounds great and all, but how does that help us build a chatbot? Well it doesn't directly, but we'll get to that. Fundamentally, a chatbot can be described as a program that responds to natural language via request / response cycles. So, a very dumb and basic chatbot would simply be a "reactive<sup>[1](#1)</sup>" program that can respond to given strings. Ergo, we need a function that responds to a given user input:

{{< highlight js "linenos=table" >}}
const getReply = (input) => {
  return 'This is your chatbot responding';
};

export default {
  getReply,
};
{{< /highlight >}}

Now, this gives us a one-trick-pony of a chatbot that only knows to return the response above. To make it smarter we'll "pirate" a page off of Amazon Alexa - we'll organize everything the bot knows into __skills__: 

{{< highlight js "linenos=table" >}}
// The structure of a "bare" skill

const ID = "skill_identifier_here";

const lexicon = {};

const matchRules = [];

const reply = (input, context) => {};

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};
{{< /highlight >}}

The theory here is that we'll have an index of all of the skills our bot knows, and we'll have a way of looking up the most appropriate one by using the magic of compromise.js. Now, before we get any further into making the above mentioned lookup work, we need a bit more info on what compromise can do to simplify that otherwise tedious task. 

When we give an input to compromise.js, it's nice enough to tag all of 



1. <span id="1"></span> Not reactive as used in programming, but reactive as in "[readily responsive to a stimulus](https://www.merriam-webster.com/dictionary/reactive)" - although the two feel very similar here.