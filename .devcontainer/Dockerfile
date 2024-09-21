FROM node:17

# Install Needed Applications
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends sudo

# Create dev user
RUN groupadd --gid 1001 dev
RUN useradd --uid 1001 --gid dev --shell /bin/bash --create-home dev
RUN adduser dev sudo && echo "dev ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN chown dev:dev -R /usr/local 
USER dev
RUN echo "export PATH=/home/dev/.npm/bin:$PATH" >> /home/dev/.bash_profile

# Setu Dev Tools
RUN mkdir -p ~/.npm
RUN npm config set prefix ~/.npm
RUN npm install -g npm@latest n

USER root
