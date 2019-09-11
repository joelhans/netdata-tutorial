# 09. Long-term metrics storage

Netdata stores metrics in your system’s RAM using a ridiculously efficient database. It only saves or loads historical metrics from disk when you restart it.
This enables Netdata to be both low-resource and exhaustive in its collection of real-time metrics.

This guide will show you other ways Netdata can store metrics.

## What you'll learn in this part

In this part of the Netdata guide, you'll learn how to:

- Enable the database engine
- Use the MongoDB backend
- Use the Prometheus backend (mostly a link to this guide)

Let's get started!

## Enable the database engine

The v1.15.0 release of Netdata came bundled with a new and powerful Database Engine. It gives you the option to store compressed metrics data for more extended periods than the RAM-only database option can offer.

It works like a traditional database by using a certain amount of RAM for data caching and indexing, while then sending the rest of the data to disk in a compressed format. Because the DB engine sends historical metrics data to disk, it can help you store a much larger dataset than the amount of RAM your system has.

Your default netdata.conf file looks like this:

```yaml
# memory mode = save
# page cache size = 32
# dbengine disk space = 256
```

You uncomment by removing the `#` and setting `memory mode` from `save` to `dbengine`, also remove the `#` from `page cache size` and `dbengine disk space` lines.

```yaml
memory mode = dbengine
page cache size = 32
dbengine disk space = 256
```

The above values you can see in the configuration file are the default
and minimum values for Page Cache size and DB engine disk space quota.
Both numbers are in MiB.

The `page cache size` option determines the amount of RAM in MiB that is dedicated to caching Netdata metric values themselves.

The `dbengine disk space` option determines the amount of disk space in MiB that is dedicated to storing Netdata metric values and all related metadata describing them.

After uncommenting the lines, restart the `netdata` service.

To confirm it is working, go to your Netdata dashboard, on your right, click **Netdata Monitoring**. You can find `dbengine` metrics after `queries`.

## Use the MongoDB backend

Netdata supports the use of backends for archiving the metrics.

The supported backends include Graphite, Opentsdb, Prometheus, AWS Kinesis Data Streams and MongoDB.

Since Netdata collects thousands of metrics per server per second, which would easily congest any backend server when several Netdata servers are sending data to it, Netdata allows sending metrics at a lower frequency, by resampling them.

So, although Netdata collects metrics every second, it can send to the backend servers averages or sums every X seconds (though, it can send them per second if you need it to).

It is assumed that you already installed MongoDB and it is running without issues. With that out of the way, you can proceed to install [`libmongoc` 1.7.0 or higher](http://mongoc.org/libmongoc/current/installing.html).

Next, Netdata should be re-installed from the source. The installer will detect that the required libraries are now available.

To enable data sending to the MongoDB backend set the default options in the `backend` section of `netdata.conf` from:

```yaml
[backend]
# host tags =
# enabled = no
# data source = average
# type = graphite
```

To:

```yaml
[backend]
enabled = yes
type = mongodb
```

In the Netdata directory, configure [MongoDB URI](https://docs.mongodb.com/manual/reference/connection-string/), database name and collection name by running :

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

Restart your `netdata` service.

You confirm MongoDB is saving your metrics using [mongotop](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop), run the following command:

```sh
mongotop --uri "mongodb://<hostname>/your_database_name"
```

## Use the Prometheus remote write backend

Another backend option other than the use of MongoDB is Prometheus remote write API.

To use this option with [storage providers](https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage), [protobuf](https://developers.google.com/protocol-buffers/) and [snappy](https://github.com/google/snappy), the libraries should be installed first. Next, Netdata should be re-installed from the source. The installer will detect that the required libraries and utilities are now available.

In the `[backend]` section of `netdata.conf` enable and add configuration for the remote write API:

```yaml
[backend]
    enabled = yes
    type = prometheus_remote_write
    remote write URL path = /receive
```

Restart the `netdata` service.

You can check out the following great resources on how to use Netdata and Prometheus:

- [Using Netdata with Prometheus](https://docs.netdata.cloud/backends/prometheus/)
- [Netdata, Prometheus, Grafana stack](https://docs.netdata.cloud/backends/walkthrough/)
