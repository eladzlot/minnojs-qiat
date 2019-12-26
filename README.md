# minnojs-qiat
Implementation of qiat in MinnoJS

In order to use the qiat, first copy the [settings file](./settings.js) and modify it according to your needs.
Documentation of all parameters can be found inline.
Next, in order to integrate with qualtrics, create a text question in your survey.
Make sure that there is a page break before and after it.
Open the Javascript page for you question and copy-paste the code from [`qulatrics.js`](./qualtrics.js).
Change the `url` variable at the head of the file to point to your settings file.
That's it.

The qiat will save the results of the task as a JSON into the question column.
You can use the code in [`qiat.R`](./qiat.R) in order to parse your data.
