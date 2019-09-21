# Build your first custom dashboard

You have learned how several sections of Netdata dashboard worked. 

This part of the tutorial shows you how to easily create custom pages and set up your custom dashboard to fit your custom needs.

This feature of Netdata allows you create your own dashboard using simple HTML (for basic dashboards you may not have need for Javascript).

You can make use of any available chart libraries on the same custom dashboard.

You can also use data from one or any number of Netdata servers on the same dashboard as well as host your dashboard HTML page on any web server.

You can also add Netdata charts to existing web pages.

## Create a custom-dashboard.html file

You should also look at the custom dashboard template, which contains samples of all supported charts. The code is here.

All of the mentioned examples are available on your local Netdata installation (e.g. http://myhost:19999/dashboard.html). The default web root directory with the HTML and JS code is /usr/share/netdata/web. The main dashboard is also in that directory and called index.html.\ Note: index.html has a different syntax. Don’t use it as a template for simple custom dashboards.

Example empty dashboard¶
If you need to create a new dashboard on an empty page, we suggest the following header:

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

  <!-- here we will add dashboard.js -->

</head>
<body>

<!-- here we will add charts -->

</body>
</html>
```

## Add dashboard.js

To add Netdata charts to any web page (dedicated to Netdata or not), you need to include the /dashboard.js file of a Netdata server.

For example, if your Netdata server listens at http://box:19999/, you will need to add the following to the head section of your web page:

```js
<script type="text/javascript" src="http://box:19999/dashboard.js"></script>
```

What does dashboard.js do?

  dashboard.js will automatically load the following:

-   dashboard.css, required for the Netdata charts

-   jquery.min.js, (only if jQuery is not already loaded for this web page)

-   bootstrap.min.js (only if Bootstrap is not already loaded) and bootstrap.min.css.

    You can disable this by adding the following before loading dashboard.js:

    ```js
    <script>var netdataNoBootstrap = true;</script>
    ```
-   jquery.nanoscroller.min.js, required for the scrollbar of the chart legends.

-   bootstrap-toggle.min.js and bootstrap-toggle.min.css, required for the settings toggle buttons.

-   font-awesome.min.css, for icons.


When dashboard.js loads will scan the page for elements that define charts (see below) and immediately start refreshing them. Keep in mind more javascript modules may be loaded (every chart library is a different javascript file, that is loaded on first use).

## Set the default Netdata server

`dashboard.js` will attempt to auto-detect the URL of the Netdata server it is loaded from, and set this server as the default Netdata server for all charts.

If you need to set any other URL as the default Netdata server for all charts that do not specify a Netdata server, add this before loading `dashboard.js`:

```js
<script type="text/javascript">var netdataServer = "http://your.netdata.server:19999";</script>
```

## Create a chart, set its duration and size

To add charts, you need to add a div for each of them. Each of these div elements accept a few data- attributes:

### The chart unique ID

The unique ID of a chart is shown at the title of the chart of the default Netdata dashboard. You can also find all the charts available at your Netdata server with this URL: http://your.netdata.server:19999/api/v1/charts (example).

To specify the unique id, use this:

```html
<div data-netdata="unique.id"></div>
```

The above is enough for adding a chart. It most probably have the wrong visual settings though. Keep reading…

The duration of the chart¶
You can specify the duration of the chart (how much time of data it will show) using:

```html
<div data-netdata="unique.id"
 data-after="AFTER_SECONDS"
 data-before="BEFORE_SECONDS"
 ></div>
 ```
AFTER_SECONDS and BEFORE_SECONDS are numbers representing a time-frame in seconds.

The can be either:

absolute unix timestamps (in javascript terms, they are new Date().getTime() / 1000. Using absolute timestamps you can have a chart showing always the same time-frame.

relative number of seconds to now. To show the last 10 minutes of data, AFTER_SECONDS must be -600 (relative to now) and BEFORE_SECONDS must be 0 (meaning: now). If you want the chart to auto-refresh the current values, you need to specify relative values.

### Chart sizes

You can set the size of the chart using this:

```html
<div data-netdata="unique.id"
 data-width="WIDTH"
 data-height="HEIGHT"
 ></div>
```

WIDTH and HEIGHT can be anything CSS accepts for width and height (e.g. percentages, pixels, etc). Keep in mind that for certain chart libraries, dashboard.js may apply an aspect ratio to these.

If you want dashboard.js to permanently remember (browser local storage) the dimensions of the chart (the user may resize it), you can add: data-id=" SETTINGS_ID", where SETTINGS_ID is anything that will be common for this chart across user sessions.


## Set dimensions for your custom chart

By default, dashboard.js will show all the dimensions of the chart. You can select specific dimensions using this:

```html
<div data-netdata="unique.id"
 data-dimensions="dimension1,dimension2,dimension3,..."
 ></div>
 ```

Netdata supports coma (`,`) or pipe (`|`) separated simple patterns for dimensions. 
By default it searches for both dimension IDs and dimension NAMEs. 
You can control the target of the match with: data-append-options="match-ids" or data-append-options="match-names". 
Spaces in data-dimensions="" are matched in the dimension names and IDs.

## Example custom dashboards to learn from
