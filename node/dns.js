const dns = require('dns');

dns.lookup('jd.com', (err, address, family) => {
  console.log('IP 地址: %j 地址族: IPv%s', address, family);
});
dns.resolve4('120.26.215.92', (err, addresses) => {
  if (err) throw err;

  console.log(`IP 地址: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`IP 地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
    });
  });
});