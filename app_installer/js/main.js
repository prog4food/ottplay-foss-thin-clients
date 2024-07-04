var Log_area, Log_string = '',
  Name = 'ottplay-foss.orsay',
  zipDir, oFile, widgetAPI, tvKey;

function _logFormat(s) {
  return s.replace(/<span_([^>]+)>/g, '<span class=\'\$1\'>');
}

function _logNoFlush(s, no_format) {
  Log_string += (no_format ? s : _logFormat(s)) + '<br />';
}

try {
  widgetAPI = new Common.API.Widget();
  tvKey = new Common.API.TVKeyValue();
} catch (e) {
  _logNoFlush('<span_red>Cannot use device API</span>', false)
  _logNoFlush('<pre>' + e + '</pre>', true)
}

function OnLoad() {
  Log_area = document.getElementById('Log_area');
  document.getElementById('anchor').focus();

  if (typeof widgetAPI === 'undefined') {
    Log_area.innerHTML = Log_string;
  }

  widgetAPI.sendReadyEvent();
  Log('<h2>Start!</h2>');
  setTimeout('Install()', 2000);
}

function Install() {
  oFile = document.getElementById('pluginObjectFile');
  var oStorage = document.getElementById('pluginStorage'),
    c = oStorage.GetUSBListSize(), n, id;
  Log('Found <span_gray>' + c + '</span> USB Device');
  for (var i = 0; i < c; i++) {
    id = Number(oStorage.GetUSBDeviceID(i));
    Log('Vendor: <span_gray>' + oStorage.GetUSBVendorName(id) + '</span>, Model: <span_gray>' + oStorage.GetUSBModelName(id) + '</span><br />');
    n = oStorage.GetUSBPartitionNum(id);
    for (var j = 0; j < n; j++) {
      zipDir = '/dtv/usb/' + oStorage.GetUSBMountPath(id, j) + '/' + Name + '.installer/data/';
      if (oFile.IsExistedPath(zipDir)) {
        Log('USBMountPath: <span_gray>' + zipDir + '</span><br />');
        return setTimeout('F1()', 1000);
      }
    }
  }

  Log('The installation files not found on USB.<br />Press any key for EXIT.');
}

function F1() {
  if (oFile.IsExistedPath(zipDir + Name + '.zip')) {
    Log('Installation... &nbsp; &nbsp; Please wait 20-30 sec...');
    return setTimeout('F2()', 100);
  }

  Log('The installation files not found on USB.<br />Press any key for EXIT.');
}

function F2() {
  var widgetsDir = '/mtd_down/widgets/user/';
  if (!oFile.IsExistedPath(widgetsDir)) {
    _logNoFlush('<span_orange>Warning:</span> Widgets dir <span_gray>' + widgetsDir + '</span> <span_red>is not found!</span>', false);
    Log('<span_orange>If the installation fails, try using the <span_gray>usb-app</span> version.</span>');
  }
  var r = oFile.Unzip(zipDir + Name + '.zip', widgetsDir);
  _logNoFlush('Installation <span_gray>' + Name + '.zip</span>: <span_' + (r == 1 ? 'green>+++ OK!' : 'red>--- Error! ' + r.toString()) + '</span><br />', false);
  Log('Press any key for EXIT !');
}

function OnUnload() {}

function KeyDown() {
  if (event) {
    event.preventDefault();
  }
  widgetAPI.sendExitEvent();
}

function Log(s) {
  _logNoFlush(s, false)
  widgetAPI.putInnerHTML(Log_area, Log_string);
}
