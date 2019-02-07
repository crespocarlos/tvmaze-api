#
# MongoDB Dockerfile
#
# https://github.com/dockerfile/mongodb
#

# Pull base image.
FROM library/ubuntu

RUN apt-get update
RUN apt-get -y install gnupg2 

# Install MongoDB.
RUN \
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4 && \
  echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/4.0 main" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list && \
  apt-get update && \
  apt-get install -y mongodb-org && \
  rm -rf /var/lib/apt/lists/*

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data`

# Define default command.
CMD ["mongod"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017