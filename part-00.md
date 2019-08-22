# The comprehensive Netdata tutorial

Welcome to Netdata! We're glad you've decided to use our health monitoring and
performance troubleshooting system.

This tutorial is designed to help beginners understand what Netdata is, what
it's capable of, and how it'll help you learn more about your systems and
applications. If you're new to Netdata, or have never tried health
monitoring/performance troubleshooting systems before, this tutorial is perfect
for you.

> If you have monitoring experience, or simply would rather get straight into
> configuring Netdata to your needs, you can also jump straight into code and
> configurations with the [getting started guide](../GettingStarted.md).

This tutorial is very much an in-progress effort, so stay tuned for more. If
you'd like to contribute, visit our [information about
contributing](../../CONTRIBUTING.md) to Netdata.

## Netdata fundamentals

<a class="button--guide" href="../../packaging/installer/"><b>Part 00: Install
Netdata</b></a>

Before we get started, make sure you have Netdata installed on your system (if
you don't already)!

<a class="button--guide" href="part-01.md"><b>Part 01: Get to know Netdata's
dashboard</b></a>

In the first part of this tutorial, you'll visit the dashboard, explore and
manipulate charts, learn more about what everything means, and check out alarms.

<div class="button--guide" href="part-02.md">Part 02: Monitoring multiple nodes</div>

Because Netdata is a distributed monitoring system, you can keep
tabs on as many systems as you'd like. You'll use Netdata's registry to put all
your system's health and performance metrics in one place.

<div class="button--guide"><strike>Part 03: Netdata configuration basics</strike></div>

_Coming soon!_ While Netdata can monitor thousands of metrics in real-time
without any configuration, you may to tweak some settings based on your system's
resources.

## Intermediate tutorials

<div class="button--guide"><strike>Part 04: Health monitoring alarms and notifications</strike></div>

_Coming soon!_ In this part, you'll learn how to tune and customize alarms,
enable email or Slack notifications, and more.

<div class="button--guide"><strike>Part 05: Performance troubleshooting fundamentals</strike></div> 

_Coming soon!_ Next, you'll understand how to discover anomalies in the
real-time metrics you're collecting, use Netdata's visualizations to
troubleshoot the root cause, and improve the performance of your system or
applications.

<div class="button--guide"><strike>Part 06: Metrics collectors in Netdata</strike></div>

_Coming soon!_ Learn how to enable/disable collection plugins, configure a
collection plugin job, and add more charts to your Netdata dashboard.

<div class="button--guide"><strike>Part 07: Netdata's dashboard in depth</strike></div>

_Coming soon!_ Now that your Netdata monitoring agent is configured to your
exact needs, you'll dive back into metrics snapshots, updates, and the
dashboard's settings.

## Advanced tutorials

<div class="button--guide"><strike>Part 08: Building your first custom dashboard</strike></div>

_Coming soon!_ Build a dashboard that shows the metrics that matter to you the
most, or allow you to monitor many systems from a single page.
  
<div class="button--guide"><strike>Part 09: Stream and replicate your metrics</strike></div>

_Coming soon!_ Want to centralize your real-time metrics from many systems onto
one? Set up a master/slave relationship to see slave data from the master's
dashboard.

<div class="button--guide"><strike>Part 10: Long-term metrics storage</strike></div>

_Coming soon!_ Netdata isn't just about real-time metrics—learn how to use our
new DB engine to store days, months, or years of historical data. Or, connect
Netdata to Prometheus' time-series database.

<a class="button--guide" href="../running-behind-nginx/"><b>Part 11: Set up a
proxy</b></a>

Use our existing guide on running Netdata behing an Nginx proxy to improve
performance, enable TLS and user authentication, and more.
