# Build your first custom dashboard

In previous parts of the tutorial, you have learned how several sections of Netdata dashboard worked. 

This guide will show you how to easily create custom pages and set up a custom dashboard to fit your custom 
or specific needs.

## What you'll learn in this part

In this part of the Netdata guide, you'll learn how to:

-   create a custom-dashboard.html file
-   Add dashboard.js
-   Set the default Netdata server
-   Create a chart, set its duration and size
-   Set dimensions for your custom chart

Let's get on with it!

## Create a custom-dashboard.html file

You can create your dashboard using simple HTML; in some cases for basic dashboards, 
you may not need Javascript.

On the same custom dashboard, you can make use of any available chart libraries ([Google Chart](https://developers.google.com/chart/), [D3.js](http://d3js.org/), and so on).

You can also use data from one or any number of Netdata servers on the same dashboard as well as 
host your dashboard HTML page on any web server.

You can also add Netdata charts to existing web pages.

In your local Netdata installation (http://myhost:19999/dashboard.html), you can find a custom dashboard template 
which houses samples of all supported charts that can help you get a good idea of how to put together your custom dashboard.

On your local server, `/usr/share/netdata/web` is the default web root directory with the HTML and JS files.

It is worthy of note that the main dashboard is also in that directory and called `index.html`. 
The `index.html` has a different syntax which you should not use as a template for custom dashboards.

To create a new dashboard, add the following on an empty html file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Your dashboard</title>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- here you will add dashboard.js -->

</head>
<body>

<!-- here you will add charts -->

</body>
</html>
```

## Add dashboard.js

You need to include the `dashboard.js` file of a Netdata server to add Netdata charts to any web page.

For example, if your Netdata server listens at `http://LOCAL_IP:19999/`, 
you will need to add the following to the head section of your web page:

```js
<script type="text/javascript" src="http://LOCAL_IP:19999/dashboard.js"></script>
```

### What does `dashboard.js` do?

  `dashboard.js` automatically loads the following:

-   `dashboard.css`, required for the Netdata charts

-   `jquery.min.js`, (only if jQuery is not already loaded for this web page)

-   `bootstrap.min.js` (only if Bootstrap is not already loaded) and bootstrap.min.css.

    You can disable this by adding the following before loading dashboard.js:

    ```js
    <script>var netdataNoBootstrap = true;</script>
    ```
-   `jquery.nanoscroller.min.js`, required for the scrollbar of the chart legends.

-   `bootstrap-toggle.min.js` and `bootstrap-toggle.min.css`, required for the settings toggle buttons.

-   `font-awesome.min.css`, for icons.

When `dashboard.js` loads, it scans the page for elements that define charts and immediately start refreshing them.

Keep in mind more javascript modules may be loaded (every chart library is a different javascript file, that is loaded on first use).

## Set the default Netdata server

`dashboard.js` will attempt to auto-detect the URL of the Netdata server it is loaded from, 
and set this server as the default Netdata server for all charts.

If you need to set any other URL as the default Netdata server for all charts that do not specify a Netdata server, 
add this before loading `dashboard.js`:

```js
<script type="text/javascript">var netdataServer = "http://your.netdata.server:19999";</script>
```

## Create a chart, set its duration and size

A chart is an individual, interactive, always-updating graphic displaying one or more collected/calculated metrics. 
Collectors generate charts.

Netdata displays a chart’s name in parentheses above the chart.

<img width="1482" alt="An Example of Netdata Chart" src="https://user-images.githubusercontent.com/12263278/65382643-ffedef80-dd01-11e9-845a-a11fc7d4ba78.png">

To add charts, you need to add a `div` for each of them. Each of these `div` elements accepts a few `data-` attributes:

### The chart unique ID

The unique ID of a chart is shown at the title of the chart of the default Netdata dashboard. 
You can find all the charts and their data available at your Netdata server with this URL: `http://SERVER_IP:19999/api/v1/charts`.

To specify the unique id, use this:

```html
<div data-netdata="unique.id"></div>
```

### The duration of the chart

The duration of the chart is how much time of data it will show. 

You can specify it using:

```html
<div data-netdata="unique.id"
 data-after="AFTER_SECONDS"
 data-before="BEFORE_SECONDS"
 ></div>
 ```
`AFTER_SECONDS` and `BEFORE_SECONDS` are numbers representing a time-frame in seconds.

These can be either:

-   **absolute** Unix timestamps (in javascript terms, they are `new Date().getTime() / 1000`. 
Using absolute timestamps, you can have a chart always showing the same time-frame.

-   **relative** number of seconds to now. To show the last 10 minutes of data, 
`AFTER_SECONDS` must be `-600` (relative to now), and `BEFORE_SECONDS` must be `0` (meaning: now).
If you want the chart to auto-refresh the current values, you need to specify `relative` values.

### Chart sizes

You can set the size of the chart using this:

```html
<div data-netdata="unique.id"
 data-width="WIDTH"
 data-height="HEIGHT"
 ></div>
```

`WIDTH` and `HEIGHT` can be anything CSS accepts for width and height (e.g. percentages, pixels, etc). 
Keep in mind that for certain chart libraries, dashboard.js may apply an aspect ratio to these.

If you want `dashboard.js` to permanently remember (browser local storage) the dimensions of the chart 
(the user may resize it), you can add `data-id="SETTINGS_ID"`, 
where `SETTINGS_ID` is anything that will be common for this chart across user sessions.

## Set dimensions for your custom chart

A dimension is a value that gets shown on a chart. 
The value can be raw data or calculated values, such as percentages, aggregates, and more.

Charts are capable of showing more than one dimension. 
Netdata shows these dimensions on the right side of the chart, beneath the date and time.

<img width="1482" alt="Chart Dimensions" src="https://user-images.githubusercontent.com/12263278/65382795-30368d80-dd04-11e9-899a-445f4fdbe11c.png">

By default, dashboard.js will show all the dimensions of the chart. You can select specific dimensions using this:

```html
<div data-netdata="unique.id"
 data-dimensions="dimension1,dimension2,dimension3,..."
 ></div>
 ```

Netdata supports coma (`,`) or pipe (`|`) separated [simple patterns](https://docs.netdata.cloud/libnetdata/simple_pattern/) for dimensions. 
By default, it searches for both dimension IDs and dimension NAMEs.
You can control the target of the match with: `data-append-options="match-ids"` or `data-append-options="match-names"`. 
Spaces in `data-dimensions=""` are matched in the dimension names and IDs.

## An example of a simple custom dashboard

Here is a simple example of a simple custom dashboard to show how all the sections of this guide come together.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
</head>
<body>
    <div data-netdata="system.processes"
        data-chart-library="dygraph"
        data-width="600"
        data-height="200"
        data-after="-600"
        ></div>
</body>
<script type="text/javascript" src="http://netdata.server:19999/dashboard.js"></script>
</html>
```
## What's Next

In this guide, you learned how to build your custom dashboard with any amount of charts you want and with any number of Netdata dashboards.

Next, you will learn how to store long-term historical metrics in Netdata!