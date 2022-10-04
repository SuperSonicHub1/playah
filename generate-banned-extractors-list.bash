#!/bin/bash
# TODO: implement whitelist

yt-dlp --list-extractors > /tmp/all-extractors.txt
yt-dlp --list-extractors --age-limit 17 > /tmp/appropriate-extractors.txt
# https://serverfault.com/a/68786
comm -23 all-extractors.txt appropriate-extractors.txt > playah/banned-extractors.txt
