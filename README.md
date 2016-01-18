# Pi Weather

Weather display for Raspberry Pi 3.2" TFT display.

## Install Chromium

`sudo apt-get install chromium x11-xserver-utils unclutter`

## Edit Config

Enter `sudo nano /etc/xdg/lxsession/LXDE-pi/autostart` (or `sudo nano /etc/xdg/lxsession/LXDE/autostart`).

Disable the screensaver by commenting out this line:

```
#@xscreensaver -no-splash
```

Then add the following lines:

```
@xset s off
@xset -dpms
@xset s noblank

@sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' ~/.config/chromium/Default/Preferences

@chromium --noerrdialogs --kiosk http://www.example.com --incognito
```

Replace `http://www.example.com` with the URL to your page.

Save and reboot.

(Adapted from https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/)