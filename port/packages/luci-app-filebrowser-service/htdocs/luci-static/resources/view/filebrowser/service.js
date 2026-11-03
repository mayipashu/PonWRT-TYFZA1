'use strict';
'require view';
'require form';
'require uci';
'require fs';

return view.extend({
	load: function () {
		return Promise.all([
			L.resolveDefault(fs.stat('/usr/bin/filebrowser'), null),
			uci.load('filebrowser')
		]);
	},

	render: function (stats) {
		var m, s, o;

		if (!stats[0] || stats[0].type !== 'file')
			return E('p', { 'class': 'cbi-message-warning' },
				_('The filebrowser binary is not installed. Install the filebrowser package first.'));

		m = new form.Map('filebrowser', _('FileBrowser'),
			_('Web based file manager served by the filebrowser daemon.'));

		s = m.section(form.NamedSection, 'config', 'filebrowser', _('Service'));
		s.anonymous = true;

		o = s.option(form.Flag, 'enabled', _('Enable'),
			_('Start the FileBrowser service and keep it running after boot.'));
		o.rmempty = false;
		o.default = '1';

		o = s.option(form.Value, 'listen_port', _('Port'),
			_('TCP port of the web interface.'));
		o.datatype = 'port';
		o.placeholder = '8989';
		o.default = '8989';
		o.depends('enabled', '1');

		o = s.option(form.Value, 'root_path', _('Root directory'),
			_('Directory exposed through the web interface.'));
		o.placeholder = '/';
		o.default = '/';
		o.depends('enabled', '1');

		o = s.option(form.Value, 'base_url', _('Base URL'),
			_('Only needed when FileBrowser is served behind a reverse proxy.'));
		o.placeholder = '/filebrowser';
		o.rmempty = true;
		o.depends('enabled', '1');

		o = s.option(form.Flag, 'disable_exec', _('Allow shell commands'),
			_('Permit command execution from the web interface. Leave disabled unless required.'));
		o.default = '1';
		o.rmempty = false;
		o.depends('enabled', '1');

		o = s.option(form.DummyValue, '_url', _('Web address'));
		o.rawhtml = true;
		o.cfgvalue = function () {
			var port = uci.get('filebrowser', 'config', 'listen_port') || '8989';
			var base = uci.get('filebrowser', 'config', 'base_url') || '';
			var url = 'http://' + location.hostname + ':' + port + base;
			return '<a href="' + url + '" target="_blank">' + url + '</a>';
		};
		o.depends('enabled', '1');

		return m.render();
	}
});
