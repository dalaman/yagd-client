#!/bin/bash

ps xao pid,comm | grep java | grep -o '[0-9]*'