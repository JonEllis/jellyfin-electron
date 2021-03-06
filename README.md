# Jellyfin Electron

Jellyfin Electron is a thin wrapper around the Jellyfin web interface.  
Its main purpose is to enable better integration with the OS than being just a tab in a browser window.

It is based on an Emby Electron project that did the same thing to enable media key control of playback.  
Some information about that project can be found [here](https://www.jon-ellis.co.uk/blog/emby-electron) should anyone be
interested.  
It has been re-written (though liberal copy and paste from the original project) to restructure the code better since
I've worked on some other JS projects recently.

## Alternatives

I am aware of some official alternatives to this project.

### [Jellyfin Desktop](https://github.com/jellyfin/jellyfin-desktop)  

I found this to have some significant problems when I attempted to build and run it myself - on macOS, I've not tried it
on other platforms.

The main problems were the positioning and management of the main window.
It seemed to not want to stay still, and would place itself annoyingly off screen (bottom left) with about 1cm x 1cm of
the window accessible to grab the handles.
Then [dragging and moving the window](https://github.com/jellyfin/jellyfin-theater-electron/issues/28) is problematic.

The project had not been updated since August 2019 at the time of writing, but it seems to have picked up again since.

### [jellyfin-react-client](https://github.com/jellyfin/jellyfin-react-client)

This appears to be the replacement for the Jellyfin Theater application.
I expect that this application will be a better successor to this repository, but only has the functionality to login to
a Jellyfin server so far.
I would like to be able to control my media using media keys sooner than wait for this project to see completion.

## Installation

Currently installing requires you to download the source code and build the project yourself - see below.  
Hopefully I'll get some process set up to have some released binaries.

## Downloading

Download this repository by whatever means you desire and change into the code's root directory:

- Git clone it over SSH
  ``` shell
  git clone git@github.com:JonEllis/jellyfin-electron.git
  cd jellyfin-electron
  ```

- Git clone it over HTTPS
  ``` shell
  git clone https://github.com/JonEllis/jellyfin-electron.git
  cd jellyfin-electron
  ```

- Or download the zip archive file and extract it
  ``` shell
  wget https://github.com/JonEllis/jellyfin-electron/archive/master.zip -O jellyfin-electron.zip
  unzip jellyfin-electron.zip
  cd jellyfin-electron-master
  ```

## Dependencies

The main dependencies that the project won't fetch itself are `node`, `yarn` and `git`.

You will need node at least version 10, see the
[installation docs](https://github.com/nodesource/distributions/blob/master/README.md) for installing node 10.

See the [Yarn installation documentation](https://classic.yarnpkg.com/en/docs/install) for how to install Yarn.

``` shell
yarn install
```

## Run for development

Run this like a standard Electron app

``` shell
yarn start
```

## Building

Then the following command will attempt to build the Jellyfin Electron app for macOS, Windows and Linux.  
The built binaries will be placed in the `release-builds` directory.

``` shell
yarn run build-all
```

If you only want to build for a particular platform, then you can run the platform-specific build script on it's own:

``` shell
yarn run build-linux
yarn run build-macos
yarn run build-windows
```

## Notes

To make the Jellyfin header bar a dragable area to move the player window around with, add this snippet of CSS to the
"Custom CSS" field under "General" settings:

``` css
.skinHeader { -webkit-app-region: drag; }
.skinHeader button { -webkit-app-region: no-drag; }
```

The first line makes the header draggable, whilst the second makes buttons within the header not draggable.

## Contributing

Pull requests are welcome. For Major changes, please open an issue first to discuss what you would like to change.

## TODO

- Test on Windows and Linux
- Validate that the server URL is a Jellyfin server some how
- Bind/unbind global shortcuts based on preferences _when changed_
- Some sort of grown up testing (or, at this point, _any_ testing)
- Options for showing the titlebar so window chrome doesn't overlap player contents

## Screenshots

![image](screenshots/server.png)
![image](screenshots/player-login.png)
![image](screenshots/preferences.png)
![image](screenshots/about.png)
