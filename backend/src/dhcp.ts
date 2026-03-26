import { Injectable, OnModuleInit } from "@nestjs/common";
const dhcp = require("dhcp");

dhcp.addOption(114, {
  config: "testConfig",
  type: "ASCII",
  name: "Test Option",
});

@Injectable()
class DHCPService implements OnModuleInit {
  private server: any;

  onModuleInit() {
    this.server = dhcp.createServer({
      range: ["192.168.137.100", "192.168.137.150"],
      randomIP: true,
      netmask: "255.255.255.0",
      forceOption: ["hostname"],
      router: ["192.168.137.1"],
      dns: ["8.8.8.8"],
      // broadcast: "255.255.255.255",
      server: "192.168.137.1",
      ttl: 86400,
    });

    this.server.on("bound", (data: any) => {
      console.log(data);
      console.log("Bounded");
    });

    this.server.on("message", (data: any) => {
      console.log(data);
    });

    this.server.on("listening", function (sock) {
      var address = sock.address();
      console.info("Server Listening: " + address.address + ":" + address.port);
    });

    this.server.listen();
  }
}

export default DHCPService;
