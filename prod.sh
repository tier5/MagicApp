# This script build the production
echo '-------------------Installing api packages----------------------------'
sudo npm install
echo '-------------------Moving to frontend---------------------------------'
cd public/frontend/
echo '-------------------Installing Frontend npm packages ------------------'
npm install
echo '-------------Building the frontend------------------------------------'
npm run build
echo '-------------Removing the old magic script----------------------------'
sudo rm -r ./dist/mscript
echo '-------------Installing and building the magicscript------------------'
cd ../script/
npm install 
npm run build
mv -v ./dist ../frontend/dist/mscript