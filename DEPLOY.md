babel ./src/gengine/ --out-dir ./dist && npm pack && mv *.tgz ./out/

npm publish --access public
