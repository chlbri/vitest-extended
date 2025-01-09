import sh from 'shelljs';

sh.cp('./package.pack.json', './lib/package.json');
sh.cd('./lib');

sh.exec('pnpm pack --pack-destination ../.pack');
sh.rm('./package.json');
sh.cd('..');
sh.exec('pnpm run rm && pnpm run config:off');
