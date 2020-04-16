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

### [Jellyfin Theater](https://github.com/jellyfin/jellyfin-theater-electron)  

I found this to have some significant problems when I attempted to build and run it myself - on macOS, I've not tried it
on other platforms.

The main problems were the positioning and management of the main window.
It seemed to not want to stay still, and would place itself annoyingly off screen (bottom left) with about 1cm x 1cm of
the window accessible to grab the handles.
Then [dragging and moving the window](https://github.com/jellyfin/jellyfin-theater-electron/issues/28) is problematic.

The project has not been updated since August 2019, which in itself is not a problem if the project itself seemed to
work well.

### [jellyfin-react-client](https://github.com/jellyfin/jellyfin-react-client)

This appears to be the replacement for the Jellyfin Theater application.
I expect that this application will be a better successor to this repository, but only has the functionality to login to a
Jellyfin server so far.
I would like to be able to control my media using media keys sooner than wait for this project to see completion.

## Installation

Currently installing requires you to download the source code and build the project yourself - see below.  
Hopefully I'll get some process set up to have some released binaries.

## Downloading

Download this repository by whatever means you desire and change into the code's root directory:

- Git clone it over SSH
  ```
  git clone git@github.com:JonEllis/jellyfin-electron.git
  cd jellyfin-electron
  ```

- Git clone it over HTTPS
  ```
  git clone https://github.com/JonEllis/jellyfin-electron.git
  cd jellyfin-electron
  ```

- Or download the zip archive file and extract it
  ```
  wget https://github.com/JonEllis/jellyfin-electron/archive/master.zip -O jellyfin-electron.zip
  unzip jellyfin-electron.zip
  cd jellyfin-electron
  ```

## Run for development

Install dependencies

```
npm install
```

Run this like a standard Electron app

```
npm start
```

## Building

The following command will attempt to build the Jellyfin Electron app for macOS, Windows and Linux.  
The built binaries will be placed in the `release-builds` directory.

```
npm run build
```

## Contributing

Pull requests are welcome. For Major changes, please open an issue first to discuss what you would like to change.

## TODO

- Test on Windows and Linux
- Some sort of grown up testing (or, at this point, _any_ testing)
