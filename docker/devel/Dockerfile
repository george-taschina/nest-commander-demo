FROM node:20-alpine

USER root

RUN mkdir /app && chown node:node /app

WORKDIR /app

RUN npm install -g npm

USER node

ENV TZ='Europe/Rome'

USER root
RUN apk add --no-cache zsh git

USER node

ENV SHELL /bin/zsh

RUN mkdir -p /home/node/.oh-my-zsh/custom/plugins && \
    git clone https://github.com/zsh-users/zsh-autosuggestions /home/node/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting /home/node/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

ADD ./config/zshrc /home/node/.zshrc

USER root
RUN chown node:node /home/node/.zshrc

USER node

CMD ["zsh"]