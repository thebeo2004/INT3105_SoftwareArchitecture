#!/bin/bash
service ssh start
vncserver -geometry 1280x800 -depth 24
tail -F /root/.vnc/*.log