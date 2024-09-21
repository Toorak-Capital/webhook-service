FROM us-central1-docker.pkg.dev/dev-ops-396910/toorak-repo/node_golden_image:lts

RUN npm i -g npm@10

# set working directory
WORKDIR /usr/src/app

# connect to artifact registry
COPY .npmrc .npmrc
RUN cat .npmrc
RUN npx -y google-artifactregistry-auth --repo-config=.npmrc --credential-config=.npmrc || cat /root/.npm/_logs/*.log
RUN cat .npmrc

# copy package files
COPY *.json ./

# install dependencies
RUN npm ci --engine-strict=false

# copy src files
COPY . ./

# build prod version
RUN rm -rf ./node_modules
RUN npm prune --omit=dev

RUN apt-get update && \
    apt-get install -y curl gnupg2 lsb-release

# Install the Google Cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
RUN apt-get update && apt-get install -y google-cloud-sdk

# cleanup
RUN rm -rf ./package-lock.json ./coverage *.log /root/.ssh/
RUN apt-get remove -y git && apt-get autoremove -y

EXPOSE 3000
CMD node server.js