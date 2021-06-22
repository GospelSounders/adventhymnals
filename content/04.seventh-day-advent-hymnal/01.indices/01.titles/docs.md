---
title: Titles and First Lines
metadata:
    description: Before you attempt to install and test csycms flat file content management system, please check to see that your system meets the following requirements. We have tested the system in linux. We cannot guarantee that it will work in Windows, but you can still give it a go, although you will have to create your own scripts. Ours run off bash scripts which are not portable to windows..
    keywords: csycms, file-based content management system, knowledge base, static site generator, nodejs
    author: Brian Onang'o
---

# Requirements

Before you attempt to install and test csycms flat file content management system, please check to see that your system meets the following requirements. We have tested the system in linux. We cannot guarantee that it will work in Windows, but you can still give it a go, although you will have to create your own scripts. Ours runs off bash scripts which are not portable to windows.

## Server

You will need a server to install and test or use csycms. Although you can use your local computer as this server, you will need a server hosted somewhere else for production. You can check out the cheap [upcloud servers with a month of free trial](https://upcloud.com/signup/?promo=6D7UU8) or any other that you know.

## Domain Name

Although this is optional, it is good if have a domain name of your own so you can use it instead of the IP of your server.

## Nodejs

You will need to install nodejs in your server. If you experience any problems with this, you can see [how to install nodejs](https://joshtronic.com/2018/05/07/how-to-install-the-latest-version-of-nodejs-8-on-ubuntu-1804-lts/).

Supported Node Versions:
- v10.x.x
- v8.x.x

## Nginx

You will also need to install a web server in your server such as Nginx, Apache, etc. We recommend using Nginx.

## pKill/killall

This is for features which have been deprecated. And you are not going to use old code, are you? But if you decide to install it, then you may also have to [fix killall-command-not-found](https://bytefreaks.net/gnulinux/bash/bash-killall-command-not-found-a-solution)

## ssh

You will also need to setup ssh with all the keys for accessing repos (if you use any ssh remote, or if any of the repos of your sites is private). An [installation script](https://github.com/csymapp/csycms/blob/master/Install/installCsycms.sh) is availed to help you with creating the keys. But if it fails to create the ssh keys for your git repo, you can [see how to create one](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html).