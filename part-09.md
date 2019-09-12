# 09. Long-term metrics storage

Netdata by default stores metrics for a certain amount of time, using a ridiculously efficient round-robin database.
This enables Netdata to be both low-resource and exhaustive in its collection of real-time metrics.
However, if you want to store even more metrics for a longer period, you can make use of the database engine and/or a backend of choice.

This guide will show you how to store long term historical metrics in Netdata using the database engine and/or backend.

## What you'll learn in this part

In this part of the Netdata guide, you'll learn how to:

- Enable the database engine
- Use the MongoDB backend
- Use the Prometheus backend

Let's get started!

## Enable the database engine

New releases of Netdata come bundled with a new and powerful database engine which gives you the option to store compressed metrics data for more extended periods than the round-robin database option can offer.

It works like a traditional database by using a certain amount of RAM for data caching and indexing, while then sending the rest of the data to disk in a compressed format.
Because the database engine sends historical metrics data to disk, it can help you store a much larger dataset than the amount of RAM your system has.

Your default `netdata.conf` file looks like this:

```conf
[global]
# memory mode = save
# page cache size = 32
# dbengine disk space = 256
```

You uncomment by removing the `#` and setting `memory mode` from `save` to `dbengine`, also remove the `#` from `page cache size` and `dbengine disk space` lines.

```conf
[global]
memory mode = dbengine
page cache size = 32
dbengine disk space = 256
```

The `page cache size` option determines the amount of RAM in MiB that is dedicated to caching Netdata metric values themselves.

The `dbengine disk space` option determines the amount of disk space in MiB that is dedicated to storing Netdata metric values and all related metadata describing them.

After uncommenting the lines, [restart](https://docs.netdata.cloud/docs/gettingstarted/#starting-and-stopping-netdata) the `netdata` service.

To confirm the database engine is working, go to your Netdata dashboard and click on the **Netdata Monitoring** menu on the right-hand side. You can find `dbengine` metrics after `queries`.

<img width="1657" alt="database engine" src="https://user-images.githubusercontent.com/12263278/64781383-9c71fe00-d55a-11e9-962b-efd5558efbae.png">

## Use the MongoDB backend

Netdata supports the use of backends for archiving the metrics.

The supported backends include Graphite, Opentsdb, Prometheus, AWS Kinesis Data Streams, and MongoDB.

Since Netdata collects thousands of metrics per server per second, which would easily congest any backend server when several Netdata servers are sending data to it, Netdata allows sending metrics at a lower frequency, by resampling them.

So, although Netdata collects metrics every second, it can send to the backend servers averages or sums every X seconds (though, it can send them per second if you need it to).

With MongoDB installed and running, you can proceed to install a requirement for the backend, [`libmongoc` 1.7.0 or higher](http://mongoc.org/libmongoc/current/installing.html).

Next, Netdata should be re-installed from the source. The installer will detect that the required libraries are now available.

To enable archiving to the MongoDB backend set the default options in the `backend` section of `netdata.conf`.

It looks like this:

```conf
[backend]
# host tags =
# enabled = no
# data source = average
# type = graphite
```

Uncomment `enabled` and `type`, update them to the following:

```conf
[backend]
enabled = yes
type = mongodb
```

In the Netdata directory, configure the [MongoDB URI](https://docs.mongodb.com/manual/reference/connection-string/), database name, and collection name by running:

```sh
./edit-config mongodb.conf
```

You will proceed to fill up the mongodb connection details:

```yaml
# URI
uri = mongodb://<hostname>

# database name
database = your_database_name

# collection name
collection = your_collection_name
```

[Restart](https://docs.netdata.cloud/docs/gettingstarted/#starting-and-stopping-netdata) Netdata.

You can confirm MongoDB is saving your metrics using [mongotop](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop). Run the following command:

```sh
mongotop --uri "mongodb://<hostname>/your_database_name"
```

## Use the Prometheus remote write backend

If you don't want to use the MongoDB backend, you can try the Prometheus remote write API.

To use this option with [storage providers](https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage), [protobuf](https://developers.google.com/protocol-buffers/) and [snappy](https://github.com/google/snappy), install the libraries first. Next, Netdata should be re-installed from the source. The installer will detect that the required libraries and utilities are now available.

In the `[backend]` section of `netdata.conf` enable and add configuration for the remote write API:

```conf
[backend]
    enabled = yes
    type = prometheus_remote_write
    remote write URL path = /receive
```

[Restart](https://docs.netdata.cloud/docs/gettingstarted/#starting-and-stopping-netdata) Netdata. It will now be archiving historical metrics to your Prometheus backend!

You can check out the following great resources on how to use Netdata and Prometheus:

- [Using Netdata with Prometheus](https://docs.netdata.cloud/backends/prometheus/)
- [Netdata, Prometheus, Grafana stack](https://docs.netdata.cloud/backends/walkthrough/)
