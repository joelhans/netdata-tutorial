# 09. Long-term metrics storage

<!-- Goal: 	While it’s an advanced-level feature, we should let beginners know that metrics archiving is available to them. By starting with enabling the database engine (if they don’t have it enabled already from part 3),  -->

Netdata stores metrics in your system’s RAM using a ridiculously efficient database. It only saves or loads historical metrics from disk when you restart it. With this system, Netdata can be both low-resource and exhaustive in its collection of real-time metrics.

If you collect 1,000 metrics every second, and only need an hour’s worth of historical data, your instance of Netdata will use 14.4MB of RAM. If you want to collect a day’s worth data on 1,000 metrics, you’ll need 345MB of RAM. Or, you can push Netdata to its limits and collect 100,000 metrics for an hour and use a mere 1.7GB of RAM.

Enter our new database engine.

Sleek, smart, and even more efficient
The new DB engine gives Netdata users the option to store compressed metrics data for more extended periods than the RAM-only database can offer. We released the first version on May 22, 2019, with the v1.15.0 release of Netdata.

It works like a traditional database by using a certain amount of RAM for data caching and indexing, while then sending the rest of the data to disk in a compressed format. Because the DB engine sends historical metrics data to disk, it can help you store a much larger dataset than the amount of RAM your system has.

`from documentation`

The Database Engine works like a traditional database. There is some amount of RAM dedicated to data caching and indexing and the rest of the data reside compressed on disk. The number of history entries is not fixed in this case, but depends on the configured disk space and the effective compression ratio of the data stored. This is the only mode that supports changing the data collection update frequency (update_every) without losing the previously stored metrics.

## Enable the database engine

Your default netdata.conf file content

```conf
# memory mode = save
# page cache size = 32
# dbengine disk space = 256
```

You uncomment by removing the `#` and setting `memory mode` from `save` to `dbengine`.

```conf
memory mode = dbengine
# page cache size = 32
# dbengine disk space = 256
```

## Use the MongoDB backend

## Use the Prometheus backend (mostly a link to this guide)
