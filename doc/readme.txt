Deploy to Heroku:
=================
# heroku create (creates new heroku app)
Creating app... done, ⬢ tranquil-beach-17047
https://tranquil-beach-17047.herokuapp.com/ | https://git.heroku.com/tranquil-beach-17047.git
# git remote -v (check which heroku app is connected to git)
# heroku git:remote -a tranquil-beach-17047
# git push heroku master
...
# heroku open -a tranquil-beach-17047 (opens app in web browser)
# heroku logs (to view logs)
# heroku config:set -a tranquil-beach-17047 MONGO_ATLAS_DB=...
# heroku config:set -a tranquil-beach-17047 MONGO_ATLAS_USR=...
# heroku config:set -a tranquil-beach-17047 MONGO_ATLAS_PW=...
