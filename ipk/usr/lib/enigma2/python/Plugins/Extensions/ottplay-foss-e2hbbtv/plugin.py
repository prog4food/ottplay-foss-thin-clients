# Embedded file name: /usr/lib/enigma2/python/Plugins/Extensions/ottplay-foss-e2hbbtv/plugin.py
# Compiled at: 2020-02-03 00:48:17
from Plugins.Plugin import PluginDescriptor
try:
    from Plugins.Extensions.HbbTV.hbbtv import HbbTVWindow
except:
    from Plugins.Extensions.WebkitHbbTV.hbbtv import HbbTVWindow

_name = 'OTT-play FOSS E2 HbbTV'
_description = 'OTT-play FOSS for enigma2 HbbTV'
_url = 'http://ott.prog4food.eu.org/f/e2/hbb/'

def start_ottplay(session, **kwargs):

    def cb():
        session.nav.stopService()
        session.nav.playService(_sr)

    _sr = session.nav.getCurrentlyPlayingServiceReference()
    session.nav.stopService()
    session.openWithCallback(cb, HbbTVWindow, _url, None)
    return


def menu_start_ottplay(menuid, **kwargs):
    if menuid == 'mainmenu':
        return [(_name, start_ottplay, _name, 46)]
    return []


def Plugins(**kwargs):
    l = []
    l.append(PluginDescriptor(name=_name, description=_description, where=PluginDescriptor.WHERE_PLUGINMENU, fnc=start_ottplay, icon='plugin.png'))
    l.append(PluginDescriptor(name=_name, description=_description, where=PluginDescriptor.WHERE_EXTENSIONSMENU, needsRestart=True, fnc=start_ottplay))
    l.append(PluginDescriptor(name=_name, description=_description, where=PluginDescriptor.WHERE_MENU, fnc=menu_start_ottplay, icon='plugin.png'))
    return l