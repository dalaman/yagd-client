# yagd-frontend

## Setup

1.  Install node lib by `yarn install`

2. Only for win
    1. Compile client .java file

    2. Make _bin_ dir at root

    3. Copy those .class into _bin_ dir

    4. Change `prepare-bin` script in _package.json_ as `echo a`


## うさげ

-   `yarn dev`

## Build

-   Win

    `yarn electron:build:win`

-   Linux

    `yarn electron:build:lin`

Get installer at *dist* dir
