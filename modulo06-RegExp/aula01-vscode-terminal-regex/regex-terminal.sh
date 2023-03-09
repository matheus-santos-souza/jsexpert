find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

#npm i -g ipt
#find . -name '*.js' -not -path '*node_modules**' | ipt
cp -r ./../../modulo02-testing/aula05-TDD-project/ .



# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT
# \n\n -> para quebrar uma linha
CONTENT="'use strict';" \
find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "1s/^/$CONTENT\n\n/g" {file} 