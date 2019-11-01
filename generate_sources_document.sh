#!/bin/bash
find . -type f \( -name '*.js' -o -name '*.json' -o -name '*.html'  -o -name '.babelrc' \) -exec common/get_content.sh {} \; > sources.md
pandoc -s sources.md -t docx -o sources.docx
