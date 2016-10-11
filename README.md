greecejs website
======================================================
This repository contains the files needed for the
 GreeceJS website. https://greecejs.github.io/

Installing locally
------------------------------------------------------

1. Install hexo
`npm install hexo-cli -g`

2. Clone repo
`git clone git@github.com:greecejs/greecejs.github.io.git`

3. Switch to the **Hexo** branch:
`git checkout -b hexo origin/hexo`.
Please note this repo comes with two branches: (1) master (2) hexo. You are not to edit the master branch directly.

4. Install dependencies
`npm install`

Testing
------------------------------------------------------
Test with `hexo serve`. A local webserver will be setup
on http://localhost:4000.

Deploying
------------------------------------------------------
Deploy to github master repo with `hexo deploy`.