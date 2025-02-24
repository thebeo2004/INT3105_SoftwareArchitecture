FROM ubuntu:22.04

ENV VNC_PASSWORD=password \
    USER=root

RUN apt-get update && apt-get install -y \
    # Intall xfce4 & xfce4-goodies
    xfce4 \
    xfce4-goodies \
    # Install xorg, which is needed for graphical interfaces
    xorg \
    # Install dbus-x11 -> inter-process communication system
    dbus-x11 \
    x11-xserver-utils \
    # Install VNC server
    tightvncserver \
    # Enabl SSH access to the container
    openssh-server \
    # Allow to perform tasks as root
    sudo \
    wget \
    && apt-get clean

#Configure SSH
RUN mkdir /var/run/sshd && \
    # Set root password
    echo 'root:password' | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Configure VNC: Set password
RUN mkdir /root/.vnc && \
    echo $VNC_PASSWORD | vncpasswd -f > /root/.vnc/passwd && \
    chmod 600 /root/.vnc/passwd

# Copy the startup script
COPY scripts/startup.sh /startup.sh
RUN chmod +x /startup.sh

#Expose VNC & SSH ports
EXPOSE 22 5901


CMD ["/startup.sh"]