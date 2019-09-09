# 06. Metrics collectors in Netdata

Netdata collects system metrics by itself. It has many internal plugins for collecting most of the metrics presented by default when it starts, collecting data from `/proc`, `/sys` and other Linux kernel sources.

To collect non-system metrics, Netdata supports a plugin architecture known as plugin orchestrator.

Plugin orchestrators are external plugins that do not collect any data by themeselves. Instead they support data collection modules written in the language of the orchestrator.

They also make it easier to develop plugins, and minimize the number of threads and processes running.

Currently Netdata provides plugin orchestrators BASH v4+ charts.d.plugin, node.js node.d.plugin, python v2+ (including v3) python.d.plugin and 2 more are actively being developed (go and java)

Netdata supports both **internal** and **external data collection** plugins

## Internal plugins

These plugins are written in C and run as threads inside the netdata daemon. Once this thread has started, the plugin may spawn additional threads according to its design.

An example of this is the `cgroups.plugin`, written in C which collects resource usage of Containers, libvirt VMs and systemd services, on Linux systems.

## External plugins

External plugins may be written in just about any programming language and are spawned as independent long-running processes by the netdata daemon.

They communicate with the netdata daemon via pipes (stdout communication).

A good example is `fping.plugin`, written in C which measures network latency, jitter and packet loss between the monitored node and any number of remote network end points.

## The difference between internal and external plugins?

A major difference between these two types of plugins is that external plugins depends on plugins.d - the Netdata internal plugin that collects metrics from external processes.

## Enable or disable internal plugins

You can enable or disable plugins in the [plugin] section of `netdata.conf`.

At this section there is a list of all the plugins with a boolean setting (`yes` or `no` options) to enable or disable them.

The exception is `statsd.plugin` that has its own [statsd] section.

Once a plugin is enabled, consult the page of each plugin for additional configuration options.

All external plugins are managed by plugins.d, which provides additional management options.

## Add a new external plugin to Netdata

Before you proceed to add a new external plugin to Netdata, you need to install the required libraries and packages from the package manager of your system.

To install `nfacct.plugin` for example, you need to

- install `libmnl-dev` and `libnetfilter_acct-dev` using the package manager of your system.

- re-install Netdata from source. The installer will detect that the required libraries are now available and will also build netdata.plugin

Some external plugins like `nfacct.plugin` require `root` access, so the plugins are `setuid` to `root`

`nfacct.plugin` is installed and activated once the build from source is completed.

You can disable NFACCT for Netdata by editting `/etc/netdata/netdata.conf` and adding this:

```conf
[plugins]
    nfacct = no
```

## Add an external module

You can not only use internal plugins and add external plugins but also add modules that can monitor services such as Apache, Nginx, MySQL, RabbitMQ and so on.
This is achieved through plugin orchestrators.

By default, `python.d.plugin`, a Netdata external plugin is an orchestrator for data collection modules written in Python.

Netdata is migrating all data collection modules from Python to Go, so to use the `go.d.plugin` orchestrator for `go` modules, you need to disable the default `python` and enable `go`. You can't have both orchestrators running data collection modules, this will result in unexpected behaviours.

### Using the default `python.d.plugin`

For this section of the tutorial, you will learn how to add the Nginx module written in Python to monitor one or more Nginx servers.

As with some services, this module has to meet some requirements.

- Nginx has to be configured with `ngx_http_stub_status_module`.

  You can confirm if the module is already enabled or not by using following command:

  ```sh
  nginx -V 2>&1 | grep -o with-http_stub_status_module
  ```

- The directive `stub_status` passed in the `location` block of your Nginx configuration file like this:

  ```conf
  location /stub_status {
      stub_status;
  }
  ```

Netdata autodetects that the module is active, you can see the metrics on your dashboard.

You can proceed to monitor as many services as you want by editing their service configuration file.

```sh
/etc/netdata/edit-config python.d/[service].conf
```

You can see the available modules for different services at the [official Netdata repository](https://github.com/netdata/netdata/tree/master/collectors/python.d.plugin).

To configure Netdata to monitor as many Nginx servers, you will edit the Nginx configuration file with the following command:

```sh
/etc/netdata/edit-config python.d/nginx.conf
```

Be sure to have the `ngx_http_stub_status_module` active on any servers you want to monitor.

You can proceed to monitor as many Nginx servers as you need by editing the `python.d/nginx.conf` file:

At the near bottom of the file you will see the below uncommented:

```yaml
localhost:
  name: "local"
  url: "http://localhost/stub_status"

localipv4:
  name: "local"
  url: "http://127.0.0.1/stub_status"

localipv6:
  name: "local"
  url: "http://[::1]/stub_status"
```

You can add more

```yaml
RemoteNginx:
  name: "Reverse_Proxy"
  url: "http://yourdomain.com/stub_status"
```

`RemoteNginx` will show up in Netdata logs. `Reverse Proxy` will show up in the menu in the nginx section.

This same procedure works when you want to view metrics of other services like Apache, Redis, Memcached and other services supported by the [`python.d` orchestrator](https://github.com/netdata/netdata/tree/master/collectors/python.d.plugin).

## Edit the per-plugin configuration