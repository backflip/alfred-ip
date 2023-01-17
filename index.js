import os from "os";
import alfy from "alfy";

const networkInterfaces = os.networkInterfaces();
const ips = [];

// Based on https://stackoverflow.com/a/8440736
for (const [key, networkInterface] of Object.entries(networkInterfaces)) {
  for (const network of networkInterface) {
    // Ignore internal and non-IPv4 values
    if (network.internal || !["IPv4", 4].includes(network.family)) {
      continue;
    }

    ips.push({
      key,
      address: network.address,
    });
  }
}

const items = ips.map((element) => ({
  title: `${element.address} (${element.key})`,
  arg: element.address,
}));

alfy.output(items);
