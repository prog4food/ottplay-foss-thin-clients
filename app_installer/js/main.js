var Log_area, Log_string = '',
  Name = 'ottplay-foss.orsay',
  zipDir, oFile, widgetAPI, tvKey;

function _logFormat(s) {
  return s.replace(/<span_([^>]+)>/g, '<span class=\'\$1\'>');
}

try {
  widgetAPI = new Common.API.Widget();
  tvKey = new Common.API.TVKeyValue();
} catch (e) {
  Log_string += _logFormat('<span_red>Cannot use device API</span><br /><pre>') + e + '</pre><br />';
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
  var wDir = '/mtd_down/widgets/user/';
  if (oFile.IsExistedPath(wDir)) {
    var r = oFile.Unzip(zipDir + Name + '.zip', wDir);
    Log('Installation <span_gray>' + Name + '.zip</span>: <span_' + (r == 1 ? 'green>+++ OK!' : 'red>--- Error! ' + r.toString()) + '</span><br />');
  } else {
    Log('Widgets dir <span_gray>' + wDir + '</span> <span_red>is not found!</span>');
    Log('Try to use <span_gray>usb-app</span> version');
  }
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
  Log_string += _logFormat(s) + '<br />';
  widgetAPI.putInnerHTML(Log_area, Log_string);
}
