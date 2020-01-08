# minnojs-qiat
Implementation of qiat in MinnoJS

### Installation
In order to use the qiat, first copy the [settings file](./settings.js) and modify it according to your needs.
Documentation of all parameters can be found inline.
Upload the settings file to a server and make sure you know the URL to it.

Next, in order to integrate with qualtrics, create a text question in your survey and set it up as a `Multiline` question.
Make sure that there is a page break before and after it.

Click the cog at the left of the question in order to see the question settings dropdown.
Choose `Add Javascript`, and copy-paste the code from [`qulatrics.js`](./qualtrics.js).
Change the `url` variable at the top of the file to point to your settings file.
That's it.

The qiat will save the results of the task as a CSV into the question column.
You can use the code in [`qiat.R`](./qiat.R) in order to parse your data.

```r
df <- read.csv('data.csv', stringsAsFactors = FALSE)
qiat.parse(df, ResponseId, Q4)
```

### Legend
Each row in the reponse represents a single stimulus-response pair.
The interpertation of the data exported from the qIAT is as follows:

Column      | Description
----------- | -----------
id          | The value of the ID column as defined in minno.parse
condition   | Randomization condition (can be 0 or 1)
group       | The name of the stimulus group as defined in the settings file (e.g. category1.name)
latency     | The response latency in miliseconds
block       | Block number
stimulus    | The index of the stimulus as defined in the settings file
correct     | Whether the initial response was correct (1 if yes, 0 if no)